import "../node_modules/bootstrap/dist/js/bootstrap.js";
const params = new URLSearchParams(window.location.search);
const ID = params.get("ID");
const ip = "http://127.0.0.1:3000/";
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
const tableDocs = document.getElementById("table-med-team");
const tableExams = document.getElementById("table-exams");
const tableSurg = document.getElementById("table-surgery");
const tablePrescs = document.getElementById("table-prescs");

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

fetch(ip + "getDoctors", {
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
      tdata.setAttribute("colspan", "4");
      tdata.innerHTML = "No posee médicos tratantes";
      row.appendChild(tdata);
      tableDocs.appendChild(row);
    } else {
      data.forEach(function (item, index, array) {
        console.log(item);
        const row = document.createElement("tr");
        const NAME = document.createElement("td");
        NAME.classList.add("align-middle");
        NAME.innerHTML = item.doctor_name;
        row.appendChild(NAME);
        const COLEG = document.createElement("td");
        COLEG.classList.add("align-middle");
        COLEG.innerHTML = item.collegiate_number;
        row.appendChild(COLEG);
        const SPECIAL = document.createElement("td");
        SPECIAL.classList.add("align-middle");
        SPECIAL.innerHTML = item.specialty_name;
        row.appendChild(SPECIAL);
        const MEDICAL = document.createElement("td");
        MEDICAL.classList.add("align-middle");
        MEDICAL.innerHTML = item.center_name;
        row.appendChild(MEDICAL);
        tableDocs.appendChild(row);
      });
    }
  })
  .catch((err) => console.log(err));

fetch(ip + "getExams", {
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
      tdata.setAttribute("colspan", "5");
      tdata.innerHTML = "Aún no se le han realizado exámenes a este paciente";
      row.appendChild(tdata);
      tableExams.appendChild(row);
    } else {
      data.forEach(function (item, index, array) {
        const row = document.createElement("tr");
        const ID = document.createElement("td");
        ID.classList.add("align-middle");
        ID.innerHTML = item.id_exam;
        row.appendChild(ID);
        const TYPE = document.createElement("td");
        TYPE.classList.add("align-middle");
        TYPE.innerHTML = item.exam_name;
        row.appendChild(TYPE);
        const MEDIC = document.createElement("td");
        MEDIC.classList.add("align-middle");
        MEDIC.innerHTML = item.doctor_name;
        row.appendChild(MEDIC);
        const DATE = document.createElement("td");
        DATE.classList.add("align-middle");
        DATE.innerHTML = item.date_performed.substr(0, 10);
        row.appendChild(DATE);
        const CENTER = document.createElement("td");
        CENTER.classList.add("align-middle");
        CENTER.innerHTML = item.center_name;
        row.appendChild(CENTER);
        tableExams.appendChild(row);
      });
    }
  })
  .catch((err) => console.log(err));

fetch(ip + "getSurgeries", {
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
      tdata.setAttribute("colspan", "7");
      tdata.innerHTML = "Aún no se le han realizado cirugías a este paciente";
      row.appendChild(tdata);
      tableSurg.appendChild(row);
    } else {
      data.forEach(function (item, index, array) {
        const row = document.createElement("tr");
        const ID = document.createElement("td");
        ID.classList.add("align-middle");
        ID.innerHTML = item.id_surgery;
        row.appendChild(ID);
        const TYPE = document.createElement("td");
        TYPE.classList.add("align-middle");
        TYPE.innerHTML = item.surgery_name;
        row.appendChild(TYPE);
        const MEDIC = document.createElement("td");
        MEDIC.classList.add("align-middle");
        MEDIC.innerHTML = item.doctor_name;
        row.appendChild(MEDIC);
        const DATE = document.createElement("td");
        DATE.classList.add("align-middle");
        DATE.innerHTML = item.date_performed.substr(0, 10);
        row.appendChild(DATE);

        const EVOL = document.createElement("td");
        EVOL.classList.add("align-middle");
        EVOL.innerHTML = item.patient_status;
        row.appendChild(EVOL);

        const STATE = document.createElement("td");
        STATE.classList.add("align-middle");
        if (item.patient_alive) {
          STATE.innerHTML = "Alive";
        } else {
          STATE.innerHTML = "Dead";
        }
        row.appendChild(STATE);

        const CENTER = document.createElement("td");
        CENTER.classList.add("align-middle");
        CENTER.innerHTML = item.center_name;
        row.appendChild(CENTER);
        tableSurg.appendChild(row);
      });
    }
  })
  .catch((err) => console.log(err));

fetch(ip + "getPrescs", {
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
    if(data.length == 0){
      const row = document.createElement("tr");
      const tdata = document.createElement("td");
      tdata.setAttribute("colspan", "8");
      tdata.innerHTML = "Aún no se le ha recetado medicina a este paciente";
      row.appendChild(tdata);
      tablePrescs.appendChild(row);
    }else{
    data.forEach(function (item, index, array) {
      const row = document.createElement("tr");
      const ID = document.createElement("td");
      ID.classList.add("align-middle");
      ID.innerHTML = item.id_prescription;
      row.appendChild(ID);
      const TYPE = document.createElement("td");
      TYPE.classList.add("align-middle");
      TYPE.innerHTML = item.medicine_name;
      row.appendChild(TYPE);
      const AMMOUNT = document.createElement("td");
      AMMOUNT.classList.add("align-middle");
      AMMOUNT.innerHTML = item.amount;
      row.appendChild(AMMOUNT);

      const EVOL = document.createElement("td");
      EVOL.classList.add("align-middle");
      EVOL.innerHTML = item.patient_status;
      row.appendChild(EVOL);

      const STATE = document.createElement("td");
      STATE.classList.add("align-middle");
      if (item.patient_alive) {
        STATE.innerHTML = "Alive";
      } else {
        STATE.innerHTML = "Dead";
      }
      row.appendChild(STATE);

      const DATE = document.createElement("td");
      DATE.classList.add("align-middle");
      DATE.innerHTML = item.date_given.substr(0, 10);
      row.appendChild(DATE);
      const MEDIC = document.createElement("td");
      MEDIC.classList.add("align-middle");
      MEDIC.innerHTML = item.doctor_name;
      row.appendChild(MEDIC);
      const CENTER = document.createElement("td");
      CENTER.classList.add("align-middle");
      CENTER.innerHTML = item.center_name;
      row.appendChild(CENTER);
      tablePrescs.appendChild(row);
    });}
  })
  .catch((err) => console.log(err));
