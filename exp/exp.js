import "../node_modules/bootstrap/dist/js/bootstrap.js";
const params = new URLSearchParams(window.location.search);
const ID = params.get("ID");
const ip = "http://127.0.0.1:3000/";
const patientID = document.getElementById('patientID');
const patientName = document.getElementById('patientName');
const patientAge = document.getElementById('patientAge');
const patientGenre = document.getElementById('patientGenre');
const patientHeight = document.getElementById('patientHeight');
const patientWeight = document.getElementById('patientWeight');
const patientBody = document.getElementById('patientBody');
const patientAddress = document.getElementById('patientAddress');
const patientPhone = document.getElementById('patientPhone');

console.log(ID);
const req = {
  id: ID,
};

await fetch(ip + "getPatient", {
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
    patientAge.innerHTML = data[0].age;
    if(data[0].genre){
        patientGenre.innerHTML = 'Masculino';
    }else{
        patientGenre.innerHTML = 'Femenino';
    }
    patientHeight.innerHTML = data[0].height+' m';
    patientWeight.innerHTML = data[0].weight+' kg';
    patientBody.innerHTML = parseFloat(data[0].body_mass_index).toFixed(2) +' kg/m2'
    patientAddress.innerHTML = data[0].direction;
    patientPhone.innerHTML = "+502 "+data[0].phone_number;
  })
  .catch((err) => console.log(err));
