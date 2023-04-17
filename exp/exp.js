import "../node_modules/bootstrap/dist/js/bootstrap.js";
const params = new URLSearchParams(window.location.search);
const ID = params.get("ID");
const ip = "http://50.16.178.129:3000/";
const patientID = document.getElementById("patientID");
const patientName = document.getElementById("patientName");
const patientAge = document.getElementById("patientAge");
const patientGenre = document.getElementById("patientGenre");
const patientHeight = document.getElementById("patientHeight");
const patientWeight = document.getElementById("patientWeight");
const patientBody = document.getElementById("patientBody");
const patientAddress = document.getElementById("patientAddress");
const patientPhone = document.getElementById("patientPhone");
const expName = document.getElementById("expName");
const tableAddic = document.getElementById("table-addic");
const tableDis = document.getElementById("table-dis");

console.log(ID);
const req = {
  id: ID,
};

fetch(ip + "getPatient", {
  method: "POST",
  headers: {
    Authorization: localStorage.getItem("jwt"),
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify(req),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    patientID.innerHTML = data[0].id_patient;
    patientName.innerHTML = data[0].patient_name;
    expName.innerHTML = "Expediente de " + data[0].patient_name + ":";
    patientAge.innerHTML = data[0].age;
    if (data[0].genre) {
      patientGenre.innerHTML = "Masculino";
    } else {
      patientGenre.innerHTML = "Femenino";
    }
    patientHeight.innerHTML = data[0].height + " m";
    patientWeight.innerHTML = data[0].weight + " kg";
    patientBody.innerHTML =
      parseFloat(data[0].body_mass_index).toFixed(2) + " kg/m2";
    patientAddress.innerHTML = data[0].direction;
    patientPhone.innerHTML = "+502 " + data[0].phone_number;
  })
  .catch((err) => console.log(err));

fetch(ip + "getAddictions", {
  method: "POST",
  headers: {
    Authorization: localStorage.getItem("jwt"),
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify(req),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.length == 0) {
      const row = document.createElement("tr");
      const tdata = document.createElement("td");
      tdata.setAttribute("colspan", "2");
      tdata.innerHTML = "No tiene adicciones";
      row.appendChild(tdata);
      tableAddic.appendChild(row);
    } else {
      data.forEach(function (item, index, array) {
        const row = document.createElement("tr");
        const NAME = document.createElement("td");
        NAME.classList.add("align-middle");
        NAME.innerHTML = item.addiction_name;
        row.appendChild(NAME);
        const DESC = document.createElement("td");
        DESC.classList.add("align-middle");
        DESC.classList.add("text-wrap");
        DESC.innerHTML = item.description;
        row.appendChild(DESC);
        tableAddic.appendChild(row);
      });
    }
  })
  .catch((err) => console.log(err));

fetch(ip + "getDiseases", {
  method: "POST",
  headers: {
    Authorization: localStorage.getItem("jwt"),
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify(req),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.length == 0) {
      const row = document.createElement("tr");
      const tdata = document.createElement("td");
      tdata.setAttribute("colspan", "3");
      tdata.innerHTML = "No tiene enfermedades";
      row.appendChild(tdata);
      tableDis.appendChild(row);
    } else {
      data.forEach(function (item, index, array) {
        const row = document.createElement("tr");
        const NAME = document.createElement("td");
        NAME.classList.add("align-middle");
        NAME.innerHTML = item.disease_name;
        row.appendChild(NAME);
        const DESC = document.createElement("td");
        DESC.classList.add("align-middle");
        DESC.classList.add("text-wrap");
        DESC.innerHTML = item.description;
        row.appendChild(DESC);
        const HEREDITARY = document.createElement("td");
        HEREDITARY.classList.add("align-middle");
        if (item.hereditary) {
          HEREDITARY.innerHTML = "SI";
        } else {
          HEREDITARY.innerHTML = "NO";
        }
        row.appendChild(HEREDITARY);
        tableDis.appendChild(row);
      });
    }
  })
  .catch((err) => console.log(err));
