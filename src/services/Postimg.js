export function Postimg(userData, userid) {
  let BaseURL = "http://localhost/Api/api/proces.php";

  //let BaseURL = "http://localhost/filepond-master/public/api/submit.php";
  console.log("userData in postData", userData[0]);

  let fd = new FormData();
  for (let i = 0; i < userData.length; i++) {
    fd.append("filepond[]", userData[i]);
  }
  fd.append("userid", userid);

  return new Promise((resolve, reject) => {
    fetch(BaseURL, {
      method: "POST",
      body: fd
    }).then(response => {
      console.log(response);
    });
  });
}
