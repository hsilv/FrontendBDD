import "../node_modules/bootstrap/dist/js/bootstrap.js";

const alert = document.getElementById("alert");
const userInput = document.getElementById("inputUsername");
const button = document.getElementById("submitButton");
const nameInput = document.getElementById("nameInput");
const addressInput = document.getElementById("addressInput");
const phoneInput = document.getElementById("phoneInput");
const specialtyInput = document.getElementById("specialtyInput");
const colegiateInput = document.getElementById("inputColegiate");
const passwordInput = document.getElementById("inputPassword");
const passwordInputRe = document.getElementById("inputPasswordRe");
const genreInput = document.getElementById("genreInput");

var isUser = false;
const ip = "http://50.16.178.129:3000/"

fadeAlert();
button.addEventListener("click", async () => {
  if ((await checkCredentials()) && checkPasswords()) {
    fadeAlert();
    await registerUser();
    window.location.href = '../login/login.html';
  }
});

addSpecialties();

function addSpecialties() {
  fetch(ip+"specialties", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, index, array) => {
        const opt = document.createElement("option");
        opt.value = item.id_specialty;
        opt.innerHTML = item.specialty_name;
        specialtyInput.appendChild(opt);
      });
    })
    .catch((error) => console.log(error));
}

async function iterUsers() {
  return fetch(ip+"users", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === userInput.value) {
          fadeAlert();
          showAlert(
            "El usuario que elegiste ya está utilizado, prueba con uno nuevo"
          );
          return true;
        }
      }
      return false;
    })
    .catch((error) => console.log(error));
}

async function registerUser() {
  const data = {
    name: nameInput.value,
    direction: addressInput.value,
    phone: phoneInput.value,
    collegiate: colegiateInput.value,
    speciality: specialtyInput.value,
    username: userInput.value,
    password: passwordInput.value,
    genre: genreInput.value,
  };
  fetch(ip+"register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((data) => {
      fadeAlert();
      showAlert(data);
      return true;
    })
    .catch((error) => {console.log(error); return false;});
}

function showAlert(text) {
  if (alert.style.display === "none") {
    alert.innerHTML = text;
    alert.style.display = "block";
  }
}

function fadeAlert() {
  alert.style.display = "none";
}

function checkSpecialty() {
  if (specialtyInput.value === "Elige tu especialidad") {
    fadeAlert();
    showAlert("Por favor, elige una especialidad");
    return false;
  } else {
    return true;
  }
}

function checkGenre() {
  if (genreInput.value === "Elige tu género") {
    fadeAlert();
    showAlert("Por favor, elige un género");
    return false;
  } else {
    return true;
  }
}

function checkAttr(attr, name) {
  if (attr.value == undefined || attr.value == null || attr.value == "") {
    fadeAlert();
    showAlert(`Por favor, ingresa un valor en el campo ${name}`);
    return false;
  } else {
    return true;
  }
}



function checkPasswords() {
  if (passwordInput.value === passwordInputRe.value) {
    return true;
  } else {
    fadeAlert();
    showAlert("Las contraseñas no coinciden!");
    return false;
  }
}

async function checkCredentials() {
  var cant = 0;
  if (!checkSpecialty()) {
    cant++;
  }
  if (!checkGenre()) {
    cant++;
  }
  if (!checkAttr(phoneInput, "Número de teléfono")) {
    cant++;
  }
  if (!checkAttr(addressInput, "Dirección")) {
    cant++;
  }
  if (!checkAttr(colegiateInput, "Número de colegiado")) {
    cant++;
  }
  if (!checkAttr(userInput, "Username")) {
    cant++;
  } else {
    if (await iterUsers()) {
      cant++;
    }
  }
  if (!checkAttr(passwordInput, "Contraseña")) {
    cant++;
  }
  if (!checkAttr(passwordInputRe, "Repite tu contraseña")) {
    cant++;
  }
  if (!checkAttr(nameInput, "Nombre")) {
    cant++;
  }
  if (cant > 1) {
    fadeAlert();
    showAlert("Vaya! faltan varios campos por llenar");
    return false;
  }
  if (cant == 0) {
    return true;
  } else if (cant == 1) {
    return false;
  }
}
