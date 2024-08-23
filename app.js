// tareas de prueba
let tasks = [
  {
    id: 0,
    owner: "Pelado Cáceres",
    name: "Wash the car",
    description: "Wash the car before crash it 💥🚗",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSynqaOG2CBeapwLA8A7W3C8kmHhNnNraWl7c2rz1eykm_dY_cjB9erHZawnIFOIo3MbcAts4L7N8W7otPrEPvFmzg9UJo7LONUpVhyPpz1gjDfbMOcetAy52k0YdDDoNaZSQ&usqp=CAc",
  },
  {
    id: 1,
    owner: "Developer #432",
    name: "Take humans out of Earth",
    description: "Looking for a new planet to destroy 🌎",
    imgUrl:
      "https://c4.wallpaperflare.com/wallpaper/1020/1/213/world-of-warcraft-battle-for-azeroth-video-games-warcraft-alliance-wallpaper-thumb.jpg",
  },
  {
    id: 2,
    owner: "Another big fish",
    name: "Testing in Production",
    description: `We don't worry about testing, we test in production 🤪`,
    imgUrl:
      "https://c4.wallpaperflare.com/wallpaper/246/739/689/digital-digital-art-artwork-illustration-abstract-hd-wallpaper-preview.jpg",
  },
  {
    id: 3,
    owner: "The return of the Pug",
    name: "Thinking about all the mankind problems",
    description: "Eat, Sleep and wear a jedi robe in order to solve it 🐶",
    imgUrl:
      "https://w0.peakpx.com/wallpaper/381/236/HD-wallpaper-pug-dog-pet-funny-sad.jpg",
  },
  {
    id: 4,
    owner: "Mark Zuckerberg",
    name: "Destroy the entire planet earth",
    description: "Encourage people to live in a metaverse🌈",
    imgUrl: "https://pbs.twimg.com/media/Ew2_PGEWgAE3V5-.jpg",
  },
];

let currentIdNumber = tasks.length;

// variables para los events

loadTasks(); // para cargar las tasks de prueba

const addTask = document.getElementsByClassName("submit-button")[0]; // botón que agrega elemento
addTask.addEventListener("click", addTaskHandler);

const clearAll = document.getElementsByClassName("clear-button")[0]; // botón que borra todos los elementos
clearAll.addEventListener("click", deleteAllTaskHandler);


// 0 - Bajar repo, todos los ejercicios seran parte
// del mismo proyecto js-dom-manipulation-essentials
// Hacer una funcion que cree dinamicamente las task
function createTaskComponent(task) {
  let template = `
    <li id="${task.id}" class="task">
      <img src="${task.imgUrl}" />
      <div class="task-information">
        <h3>Task Owner</h3>
        <p>${task.owner}</p>
        <h3>Task Name</h3>
        <p>${task.name}</p>
        <h3>Task Description</h3>
        <p>${task.description}</p>
      </div>
    </li>`;

  let lista = document.getElementsByTagName("ul")[0];
  lista.insertAdjacentHTML("beforeend", template);

  let listItem = document.getElementById(task.id);

  // creo el evento de eliminación al hacer clic
  listItem.addEventListener("click", () => deleteTaskHandler(listItem));
}

//otra forma de hacerlo (no sigue el formato)
function createTaskComponent1(task) {
  let list = document.getElementsByTagName("ul")[0];
  let element = document.createElement("li");
  for (let key in task) {
    if (key !== "id" && key !== "imgUrl") {
      let p = document.createElement("p");
      p.textContent = `${key}: ${task[key]}`;
      element.appendChild(p);
    } else if (key == "id") {
      element.setAttribute("id", task[key]);
    } else if ((key = "imgUrl")) {
      let img = document.createElement("img");
      img.setAttribute("src", task[key]);
      element.appendChild(img);
    }
  }
  list.appendChild(element);
  let listItem = document.getElementById(task.id);

  // creo el evento de eliminación al hacer clic
  listItem.addEventListener("click", () => deleteTaskHandler(listItem));
}

function loadTasks() {
  let list = document.getElementsByTagName("ul")[0];
  list.innerHTML = ""; // con esto la vacío en el DOM
  tasks.forEach((task) => createTaskComponent(task));
}

// 1 - Funcion: Mostrar en un mensaje de alerta los valores del form
function addTaskAlert(newTask) {
  const message = `NEW TASK ADDED
    -> Name: ${newTask.name}
    -> Owner: ${newTask.owner}
    -> Description: ${newTask.description}
    -> imgUrl: ${newTask.imgUrl}
  `;
  window.alert(message);
}

// 2 - Funcion: Agregar elemento en la lista al llenar el formulario
function addTaskHandler(event) {

  // evita que la pagina se recargue
  event.preventDefault(); 

  const nameInput = document.getElementById("nameInput").value.trim();
  const ownerInput = document.getElementById("ownerInput").value.trim();
  const descriptionInput = document .getElementById("descriptionInput").value.trim();
  const imgUrlInput = document.getElementById("imgUrlInput").value.trim();

  if ( nameInput == "" || ownerInput == "" ||
    descriptionInput == "" || imgUrlInput == "") {
        window.alert("Asegúrate de haber rellenado todos los campos.");
        return;
  }

  let idNum = tasks.length + 1; // buscar otra forma de obtener el id (por mientras funciona)

  const newTask = {
    id: idNum,
    owner: ownerInput,
    name: nameInput,
    description: descriptionInput,
    imgUrl: imgUrlInput,
  };

  // agrego la nueva tarea al arreglo
  tasks.push(newTask);

  createTaskComponent(tasks[tasks.length - 1]); // lo agrego al task board
  addTaskAlert(newTask);
}

// 3 - Funcion: Eliminar elemento en la lista al hacer click sobre el elemento

function deleteTaskHandler(taskElement) {
  // elimino el elemento del arreglo
  const taskId = parseInt(taskElement.id);
  tasks = tasks.filter((task) => task.id !== taskId);

  // Recargar la lista de tareas así se elimina de la pantalla
  loadTasks();

  // en caso de que se haya eliminado la última tarea se abre Youtube
  if (tasks.length === 0) {
    redirectWhenNoTask();
  }
}

// 4 - Funcion: Crear un boton para vaciar/eliminar todas las tareas

function deleteAllTaskHandler() {
  const lista = document.getElementsByTagName("ul")[0];

  // Vacía la lista en el DOM
  lista.innerHTML = ""; 

  // Vacía el array de tareas
  tasks.length = 0;

  redirectWhenNoTask();
}

// 5 - Funcion: Si ya no quedan tareas navegar programaticamente a www.youtube.com

function redirectWhenNoTask() {
  // abro otra pestaña con youtube
  window.open("https://www.youtube.com", "_blank");
}
