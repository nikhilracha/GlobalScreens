<?php

namespace FilePond;

require_once('./Helper/Transfer.class.php');
require_once('./Helper/Post.class.php');
require_once('./Helper/ServerExceptions.php');

function fetch($url) {
    try {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $content = curl_exec($ch);
        if ($content === FALSE) {
            throw new \Exception(curl_error($ch), curl_errno($ch));
        }

        $type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        $length = curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close ($ch);

        $success = $code >= 200 && $code < 300;

        return array(
            'code' => $code,
            'content' => $content,
            'type' => $type,
            'length' => $length,
            'success' => $success
        );
        
    }
    catch(Exception $e) {
        return null;
    }
}

function sanitize_filename($filename) {
    $info = pathinfo($filename);
    return sanitize_filename_part($info['filename']) . '.' . sanitize_filename_part($info['extension']);
}

function sanitize_filename_part($str) {
    return preg_replace("/[^a-zA-Z0-9\_\s]/", "", $str);
}

function remove_directory($path) {
    if (!is_dir($path)) {return;}
    $files = glob($path . DIRECTORY_SEPARATOR . '{.,}*', GLOB_BRACE);
    @array_map('unlink', $files);
    @rmdir($path);
}

function remove_transfer_directory($path, $id) {

    // don't remove anything if the transfer id is not valid (just a security precaution)
    if (!is_valid_transfer_id($id)) return;

    remove_directory($path . DIRECTORY_SEPARATOR . $id . DIRECTORY_SEPARATOR . VARIANTS_DIR);
    remove_directory($path . DIRECTORY_SEPARATOR . $id);
}

function create_directory($path) {
    if (!is_dir($path)) {
        mkdir($path, 0755, true);
        return true;
    }
    return false;
}

function secure_directory($path) {

    $content = '# Don\'t list directory contents
IndexIgnore *
# Disable script execution
AddHandler cgi-script .php .pl .jsp .asp .sh .cgi
Options -ExecCGI -Indexes';
    file_put_contents($path . DIRECTORY_SEPARATOR . '.htaccess', $content);
}

function create_secure_directory($path) {
    $created = create_directory($path);
    if ($created) {
        secure_directory($path);
    }
}

function write_file($path, $data, $filename) {
    $handle = fopen($path . DIRECTORY_SEPARATOR . $filename, 'w');
    fwrite($handle, $data);
}

function is_url($str) {
    return filter_var($str, FILTER_VALIDATE_URL);
}

function echo_file($file) {
    // Allow to read Content Disposition (so we can read the file name on the client side)
    header('Access-Control-Expose-Headers: Content-Disposition');
    header('Content-Type: ' . $file['type']);
    header('Content-Length: ' . $file['length']);
    header('Content-Disposition: inline; filename="' . $file['name'] . '"');
    echo $file['content'];
}

function read_file_contents($filename) {
    $file = read_file($filename);
    if (!$file) return false;
    return $file['content'];
}

function read_file($filename) {
    $handle = fopen($filename, 'r');
    if (!$handle) return false;
    $content = fread($handle, filesize($filename));
    fclose($handle);
    if (!$content) return false;
    return array(
        'tmp_name' => $filename,
        'name' => basename($filename),
        'content' => $content,
        'type' => mime_content_type($filename),
        'length' => filesize($filename),
        'error' => 0
    );
}

function move_temp_file($file, $path) {
    move_uploaded_file($file['tmp_name'], $path . DIRECTORY_SEPARATOR . sanitize_filename($file['name']));
}

function move_file($file, $path) {
    if (is_uploaded_file($file['tmp_name'])) {
        return move_temp_file($file, $path);
    }
    return rename($file['tmp_name'], $path . DIRECTORY_SEPARATOR . sanitize_filename($file['name']));
}

function store_transfer($path, $transfer) {

    // create transfer directory
    $path = $path . DIRECTORY_SEPARATOR . $transfer->getId();
    create_secure_directory($path);

    // store metadata
    if ($transfer->getMetadata()) {
        write_file($path, @json_encode($transfer->getMetadata()), METADATA_FILENAME);
    }

    // store main file
    $files = $transfer->getFiles();
    $file = $files[0];
    move_file($file, $path);

    // store variants
    if (count($transfer->getFiles()) > 1) {

        $files = array_slice($files, 1);
        $variants = $path . DIRECTORY_SEPARATOR . VARIANTS_DIR;
        create_secure_directory($variants);
        
        foreach($files as $file) {
            move_file($file, $variants);
        }
    }
}

function get_files($path, $pattern) {
    $results = [];
    $files = glob($path . DIRECTORY_SEPARATOR . $pattern);
    foreach($files as $file) {
        array_push($results, create_file_object($file));
    }
    return $results;
}

function get_file($path, $pattern) {
    $result = get_files($path, $pattern);
    if (count($result) > 0) {
        return $result[0];
    }
    return;
}

function create_file_object($filename) {
    return array(
        'tmp_name' => $filename,
        'name' => basename($filename),
        'type' => mime_content_type($filename),
        'length' => filesize($filename),
        'error' => 0
    );
}

function is_valid_transfer_id($id) {
    return preg_match('/^[0-9a-fA-F]{32}$/', $id);
}

function get_transfer($path, $id) {

    if (!is_valid_transfer_id($id)) { return false; }

    $transfer = new Transfer($id);

    $path = $path . DIRECTORY_SEPARATOR . $id;

    $file = get_file($path, '*.*');
    
    $metadata = get_file($path, METADATA_FILENAME);

    $variants = get_files($path . DIRECTORY_SEPARATOR . VARIANTS_DIR, '*.*');

    $transfer->restore($file, $variants, $metadata);

    return $transfer;
}

function get_post($entry) {
    return isset($_FILES[$entry]) || isset($_POST[$entry]) ? new Post($entry) : false;
}

function route_form_post($entry, $routes) {
    $post = get_post($entry);
    if (!$post) { return; }
    if (!isset($routes[$post->getFormat()])) { return; }
    call_user_func($routes[$post->getFormat()], $post->getValues());
} 

function route_api_request($entry, $routes) {

    $request_method = $_SERVER['REQUEST_METHOD'];

    // post new files
    if ($request_method === 'POST') {
        $post = get_post($entry);
        if (!$post) { return; }
        $transfer = new Transfer();
        $transfer->populate($entry);
        return call_user_func($routes['FILE_TRANSFER'], $transfer);
    }

    // revert existing transfer
    if ($request_method === 'DELETE') {
        return call_user_func($routes['REVERT_FILE_TRANSFER'], file_get_contents('php://input'));
    }

    // fetch, load, restore
    if ($request_method === 'GET') {
        $handlers = array(
            'fetch' => 'FETCH_REMOTE_FILE',
            'restore' => 'RESTORE_FILE_TRANSFER',
            'load' => 'LOAD_LOCAL_FILE'
        );
        foreach ($handlers as $param => $handler) {
            if (isset($_GET[$param])) {
                return call_user_func($routes[$handler], $_GET[$param]);
            }
        }
    }
}