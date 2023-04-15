import "../node_modules/bootstrap/dist/js/bootstrap.js";
const ip = "http://50.16.178.129:3000/";

const logOut = document.getElementById('submitButton');
var code = parseInt((await checkLogin()));


if(code != 0){
    window.location.href = '../login/login.html';
}else{
    console.log("Todo ok, seguís logeado");
    console.log(localStorage.getItem("medUser"));
}


logOut.addEventListener('click', () => {
    console.log('clickeado');
    localStorage.setItem("jwt", undefined);
    console.log(localStorage.getItem("medUser"));
    window.location.href = "../login/login.html";
})

async function checkLogin() {
    return fetch(ip + "checkLog", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => console.log(err));
  }
