const token = localStorage.getItem("jwt");
const data = {
  username: "LChapatin",
  password: "30937484",
};

/*fetch("http://localhost:3000/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("jwt", data.token);
  })
  .catch((error) => {
    console.error(error);
  });

fetch("http://localhost:3000/home", {
  headers: {
    Authorization: token,
  },
})
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });*/
