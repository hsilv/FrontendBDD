import "../node_modules/bootstrap/dist/js/bootstrap.js";
const ip = "http://127.0.0.1:3000/";
const medicTitle = document.getElementById("medicalName");
const tableBody = document.getElementById("table-body");
const alert = document.getElementById("alert");
console.log(localStorage.getItem("medUser"));
const all = 350;
const limit = new Date('2023-05-05');

fadeAlert();

const user = {
  id: localStorage.getItem("medUser"),
};

console.log(await getMedicalCenter());
await getStock(await getMedicalCenter());

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
  };
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
      var text = "Se sugiere que se adquieran los siguientes productos: <br><br>";
      var perc = (15 / 100) * all;
      console.log(data);
      data.forEach(function (item, index, array) {
        const tr = document.createElement("tr");
        const ID = document.createElement("td");
        ID.classList.add("align-middle");
        ID.innerHTML = item.id_medicine;
        tr.appendChild(ID);
        const NAME = document.createElement("td");
        NAME.classList.add("align-middle");
        NAME.innerHTML = item.medicine_name;
        tr.appendChild(NAME);
        const STOCK = document.createElement("td");
        STOCK.classList.add("align-middle");
        STOCK.innerHTML = item.stock;
        tr.appendChild(STOCK);
        if (item.stock < perc) {
          text = text + `- ${item.medicine_name} (Por cantidad),<br>`;
        }
        const DUE = document.createElement("td");
        DUE.classList.add("align-middle");
        DUE.innerHTML = item.due_date.substr(0, 10);
        if (new Date(item.due_date.substr(0, 10)) < limit) {
          console.log(item.medicine_name);
          text = text + `- ${item.medicine_name} (Por fecha de vencimiento),<br>`;
          console.log(text);
        }
        const EDIT = document.createElement("td");
        const BUTTON = document.createElement("button");
        const imgBUTTON = document.createElement("img");
        imgBUTTON.alt = "View Icon";
        imgBUTTON.src = "../resource/img/edit.png";
        BUTTON.appendChild(imgBUTTON);
        BUTTON.type = "button";
        BUTTON.classList.add("btn");
        BUTTON.classList.add("btn-light");
        BUTTON.id = "edit-" + item.id_medicine;
        EDIT.appendChild(BUTTON);
        EDIT.classList.add("align-middle");
        tr.appendChild(DUE);
        tr.appendChild(EDIT);
        tableBody.appendChild(tr);
      });
      if (text === "Se sugiere que se adquieran los siguientes productos: ") {
        fadeAlert();
      } else {
        showAlert(text);
      }
    })
    .catch((err) => console.log(err));
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
