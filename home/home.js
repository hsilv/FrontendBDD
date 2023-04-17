import "../node_modules/bootstrap/dist/js/bootstrap.js";
const ip = "http://127.0.0.1:3000/";

const logOut = document.getElementById("submitButton");
var code = parseInt(await checkLogin());
const welcome = document.getElementById("welcomeUser");
const doctorName = document.getElementById("doctorName");
const specialty = document.getElementById("specialty");
const address = document.getElementById("address");
const colegiate = document.getElementById("colegiate");
const phone = document.getElementById("phone");
const tabla = document.getElementById("table-body");
const pic = document.getElementById("profile-pic");
const cardPic = document.getElementById("card-prof-pic");
const medicalItem = document.getElementById('medical-center');
const repoItem = document.getElementById('medical-repo');

var user = localStorage.getItem("medUser");

if (code != 0) {
  window.location.href = "../login/login.html";
} else {
  initUI();
}

if(!(await isAdmin())){
  fadeItem(medicalItem);
  fadeItem(repoItem);
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
  await fetch(ip + "getName", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("jwt"),
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data[0].genre) {
        welcome.innerHTML = `Bienvenida, ${data[0].doctor_name}!`;
        pic.setAttribute("src", "../resource/img/doctor_f.png");
        cardPic.setAttribute("src", "../resource/img/doctor_f.png");
      } else {
        welcome.innerHTML = `Bienvenido, ${data[0].doctor_name}!`;
        pic.setAttribute("src", "../resource/img/doctor.png");
        cardPic.setAttribute("src", "../resource/img/doctor.png");
      }
      doctorName.innerHTML = data[0].doctor_name;
      id_specialty.id_specialty = data[0].id_specialty;
      address.innerHTML = data[0].direction;
      phone.innerHTML = "+502 " + data[0].phone_number;
      colegiate.innerHTML = data[0].collegiate_number;
    })
    .catch((err) => console.log(err));

  fetch(ip + "getSpecialty", {
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

  fetch(ip + "getPatients", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("jwt"),
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach(function (item, index, array) {
        const tr = document.createElement("tr");
        const ID = document.createElement("td");
        ID.classList.add("align-middle");
        ID.innerHTML = item.id_patient;
        tr.appendChild(ID);
        const NAME = document.createElement("td");
        NAME.classList.add("align-middle");
        NAME.innerHTML = item.patient_name;
        tr.appendChild(NAME);
        const EVOL = document.createElement("td");
        EVOL.classList.add("align-middle");
        EVOL.innerHTML = item.patient_status;
        tr.appendChild(EVOL);
        const STATE = document.createElement("td");
        STATE.classList.add("align-middle");
        if (item.patient_alive) {
          STATE.innerHTML = "Vivo";
        } else {
          STATE.innerHTML = "Fallecido";
        }
        tr.appendChild(STATE);
        const GENRE = document.createElement("td");
        GENRE.classList.add("align-middle");
        if (item.genre) {
          GENRE.innerHTML = "Masculino";
        } else {
          GENRE.innerHTML = "Femenino";
        }
        tr.appendChild(GENRE);
        const AGE = document.createElement("td");
        AGE.classList.add("align-middle");
        AGE.innerHTML = item.age;
        tr.appendChild(AGE);
        const buttCont = document.createElement("td");
        const BUTTON = document.createElement("button");
        const imgBUTTON = document.createElement("img");
        imgBUTTON.alt = "View Icon";
        imgBUTTON.src = "../resource/img/search.png";
        BUTTON.appendChild(imgBUTTON);
        BUTTON.type = "button";
        BUTTON.classList.add("btn");
        BUTTON.classList.add("btn-light");
        BUTTON.id = "exp-" + item.id_patient;
        buttCont.appendChild(BUTTON);
        buttCont.classList.add("align-middle");
        addListener(BUTTON, item.id_patient);
        tr.appendChild(buttCont);
        tabla.appendChild(tr);
      });
    })
    .catch((err) => console.log(err));
}

function addListener(item, ID) {
  item.addEventListener("click", () => {
    console.log("botón clickeado con ID " + ID);
    window.location.href = `../exp/exp.html?ID=${ID}`;
  });
}

async function isAdmin() {
  const data = {
    username: user,
  };
  return fetch(ip + "isAdmin", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("jwt"),
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data[0].admin) {
        console.log("Soy admin");
        return true;
      } else {
        console.log("No soy admin");
        return false;
      }
    })
    .catch((err) => console.log(err));
}


function fadeItem(item) {
  item.style.display = "none";
}