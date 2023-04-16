import "../node_modules/bootstrap/dist/js/bootstrap.js";
const ip = "http://50.16.178.129:3000/";

const logOut = document.getElementById("submitButton");
var code = parseInt(await checkLogin());
const welcome = document.getElementById("welcomeUser");
const doctorName = document.getElementById("doctorName");
const specialty = document.getElementById("specialty");
const address = document.getElementById("address");
const colegiate = document.getElementById("colegiate");
const phone = document.getElementById("phone");

var user = localStorage.getItem("medUser");

if (code != 0) {
  window.location.href = "../login/login.html";
} else {
  initUI();
}

logOut.addEventListener("click", () => {
  localStorage.setItem("jwt", undefined);
  window.location.href = "../login/login.html";
});

async function checkLogin() {
  return fetch(ip + "checkLog", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("jwt"),
    },
  })
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}

async function initUI() {
  const data = {
    username: user,
  };
  var id_specialty = {
    id_specialty: "",
  };
  await fetch("http://127.0.0.1:3000/getName", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("jwt"),
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      welcome.innerHTML = `Bienvenido, ${data[0].doctor_name}!`;
      doctorName.innerHTML = data[0].doctor_name;
      id_specialty.id_specialty =  data[0].id_specialty;
      address.innerHTML = data[0].direction;
      phone.innerHTML = '+502 '+data[0].phone_number;
      colegiate.innerHTML = data[0].collegiate_number;
    })
    .catch((err) => console.log(err));

  await fetch("http://127.0.0.1:3000/getSpecialty", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(id_specialty),
  })
    .then((response) => response.json())
    .then((data) => {
      specialty.innerHTML = data[0].specialty_name;
    })
    .catch((err) => console.log(err));
}
