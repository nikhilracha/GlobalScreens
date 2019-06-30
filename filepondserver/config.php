<?php

// where to get files from
const ENTRY_FIELD = 'filepond';

// where to write files to
const TRANSFER_DIR = '/Library/WebServer/Documents/filepondserver/temp';
const UPLOAD_DIR = '/Library/WebServer/Documents/filepondserver/uploads';
const VARIANTS_DIR = 'variants';

// name to use for the file metadata object
const METADATA_FILENAME = '.metadata';

// this automatically creates the upload and transfer directories, if they're not there already
if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755);
if (!is_dir(TRANSFER_DIR)) mkdir(TRANSFER_DIR, 0755);

// this is optional and only needed if you're going to do server image transforms
require_once('config_doka.php');