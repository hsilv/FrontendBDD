import "../node_modules/bootstrap/dist/js/bootstrap.js";
const password = document.getElementById("inputPassword");
const email = document.getElementById("inputEmail");
const button = document.getElementById("submitButton");
const alert = document.getElementById("alert");
const token = localStorage.getItem("jwt");

fadeAlert();

const ip = "http://50.16.178.129:3000/";

if ((await checkLogin()) == "0") {
  window.location.href = "../home/home.html";
} else {
  fadeAlert();
  showAlert("Tu sesión expiró, por favor, inicia sesión de nuevo");
}

button.addEventListener("click", () => {
  fadeAlert();
  const data = {
    username: email.value,
    password: password.value,
  };
  if (email.value == "" || password.value == "") {
    showAlert("Por favor, agrega un usuario o contraseña ");
  } else {
    fetch(ip + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code == 0) {
          console.log("Autenticación válida");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("medUser", email.value);
          window.location.href = "../home/home.html";
        } else {
          showAlert("Usuario o Contraseña incorrectos");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

function showAlert(text) {
  if (alert.style.display === "none") {
    alert.innerHTML = text;
    alert.style.display = "block";
  }
}

function fadeAlert() {
  alert.style.display = "none";
}

export async function checkLogin() {
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

