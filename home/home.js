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
  await fetch(ip+"getName", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("jwt"),
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if(data[0].genre){
        welcome.innerHTML = `Bienvenida, ${data[0].doctor_name}!`;
        pic.setAttribute("src", "../resource/img/doctor_f.png");
        cardPic.setAttribute("src", "../resource/img/doctor_f.png");
      }else{
        welcome.innerHTML = `Bienvenido, ${data[0].doctor_name}!`;
        pic.setAttribute("src", "../resource/img/doctor.png");
        cardPic.setAttribute("src", "../resource/img/doctor.png");
      }
      doctorName.innerHTML = data[0].doctor_name;
      id_specialty.id_specialty =  data[0].id_specialty;
      address.innerHTML = data[0].direction;
      phone.innerHTML = '+502 '+data[0].phone_number;
      colegiate.innerHTML = data[0].collegiate_number;
    })
    .catch((err) => console.log(err));

  await fetch(ip+"getSpecialty", {
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


    await fetch(ip+"getPatients", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("jwt"),
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach(function (item, index, array){
          const tr = document.createElement('tr');
          const ID = document.createElement('td');
          ID.innerHTML = item.id_patient;
          tr.appendChild(ID);
          const NAME = document.createElement('td');
          NAME.innerHTML = item.patient_name;
          tr.appendChild(NAME);
          const EVOL = document.createElement('td');
          EVOL.innerHTML = item.patient_evolution;
          tr.appendChild(EVOL);
          const STATE = document.createElement('td');
          if(item.patient_alive){
            STATE.innerHTML = 'Vivo';
          }else{
            STATE.innerHTML = 'Fallecido';
          }
          tr.appendChild(STATE);
          const GENRE = document.createElement('td');
          if(item.genre){
            GENRE.innerHTML = 'Masculino';
          }else{
            GENRE.innerHTML = 'Femenino';
          }
          tr.appendChild(GENRE);
          const AGE = document.createElement('td');
          AGE.innerHTML = item.age;
          tr.appendChild(AGE);
          tabla.appendChild(tr);
        })
      })
      .catch((err) => console.log(err));
}
