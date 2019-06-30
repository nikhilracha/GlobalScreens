export function testPost(pid, sid) {
  //let BaseURL = "http://localhost/Api/api/";
  //let BaseURL = "http://localhost/Api/api/deploy.php";
  let BaseURL = "http://diagnostic.nikhilracha.5gbfree.com/Api/api/deploy.php";
  var formData = new FormData();
  formData.append("pid", sid);
  formData.append("sid", pid);
  console.log("userData in postData", formData);

  return new Promise((resolve, reject) => {
    fetch(BaseURL, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
