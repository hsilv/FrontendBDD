import "../node_modules/bootstrap/dist/js/bootstrap.js";
const ip = "http://127.0.0.1:3000/";
const medicTitle = document.getElementById("medicalName");
const tableBody = document.getElementById("table-body");

console.log(localStorage.getItem("medUser"));

const user = {
  id: localStorage.getItem("medUser"),
};

console.log(await getMedicalCenter());
getStock((await getMedicalCenter()));

async function getMedicalCenter() {
  return fetch(ip + "getMedicalCenter", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("jwt"),
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      medicTitle.innerHTML = data[0].center_name;
      return data[0].id_center;
    })
    .catch((err) => console.log(err));
}

async function getStock(ID) {
    const id = {
        id: ID,
    }
  await fetch(ip + "getStock", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("jwt"),
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(id),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach(function (item, index, array){
        const tr = document.createElement('tr');
        const ID = document.createElement('td');
        ID.classList.add('align-middle');
        ID.innerHTML = item.id_medicine;
        tr.appendChild(ID);
        const NAME = document.createElement('td');
        NAME.classList.add('align-middle');
        NAME.innerHTML = item.medicine_name;
        tr.appendChild(NAME);
        const STOCK = document.createElement('td');
        STOCK.classList.add('align-middle');
        STOCK.innerHTML = item.stock;
        tr.appendChild(STOCK);
        const DUE = document.createElement('td');
        DUE.classList.add('align-middle');
        DUE.innerHTML = item.due_date.substr(0, 10);
        const EDIT = document.createElement('td');
        const BUTTON = document.createElement('button');
        const imgBUTTON = document.createElement('img');
        imgBUTTON.alt = "View Icon";
        imgBUTTON.src = "../resource/img/edit.png";
        BUTTON.appendChild(imgBUTTON);
        BUTTON.type = "button";
        BUTTON.classList.add('btn');
        BUTTON.classList.add('btn-light');
        BUTTON.id = 'edit-'+item.id_medicine;
        EDIT.appendChild(BUTTON);
        EDIT.classList.add('align-middle');
        tr.appendChild(DUE);
        tr.appendChild(EDIT);
        tableBody.appendChild(tr);
      })
    })
    .catch((err) => console.log(err));
}
