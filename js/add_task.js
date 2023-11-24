let allTasks = [];
const STORAGE_TOKEN = "QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let prioArray = [];
let key = 'allTasks';

async function addTask() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = prioArray;
  let category = document.getElementById("category").value;
  let subTask = document.getElementById("subTask").value;
  let task = {
    title: title,
    description: description,
    date: date,
    prio: prio,
    category: category,
    subTask: subTask,
  };
  console.log(task);
  allTasks.push(task);

  let allTasksAsString = JSON.stringify(allTasks); 
  localStorage.setItem("allTasks", allTasksAsString);

  setItem(key, allTasks);
}

function loadAllTasks() {
  let allTasksAsString = localStorage.getItem("allTasks");
  allTasks = JSON.parse(allTasksAsString) || [];
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then((res) => res.json());
}

function checkBoxClicked(priority) {
  let checkbox = document.getElementById(priority);
  let image = checkbox.closest(".prio").querySelector(".prioImgs");

  if (checkbox.checked) {
    deactivateOtherCheckboxes(priority);
    checkbox.parentNode.parentNode.style.backgroundColor = getColor(priority);
    changeImageSrc(priority, image);
  } else {
    checkbox.parentNode.parentNode.style.backgroundColor = "";
    image.src = "/assets/img/" + priority.toLowerCase() + "-priority.png";
  }
}

function deactivateOtherCheckboxes(currentPriority) {
  const priorities = ["urgent", "medium", "low"];
  for (const priority of priorities) {
    if (priority !== currentPriority) {
      document.getElementById(priority).checked = false;
      document.getElementById(
        priority
      ).parentNode.parentNode.style.backgroundColor = "";
      document
        .getElementById(priority)
        .closest(".prio")
        .querySelector(".prioImgs").src =
        "/assets/img/" + priority.toLowerCase() + "-priority.png";
    }
  }
  pushCurrentPriority(currentPriority);
}

function pushCurrentPriority(currentPriority) {
  if (prioArray.length > 0) {
    prioArray[0] = currentPriority;
  } else {
    prioArray.push(currentPriority);
  }
}

function getColor(priority) {
  switch (priority) {
    case "urgent":
      return "#FF3D00";
    case "medium":
      return "#FFA800";
    case "low":
      return "#7AE229";
    default:
      return "";
  }
}

function changeImageSrc(priority, image) {
  let basePath = "/assets/img/";
  let activeFileName = priority.toLowerCase() + "-active.png";
  let newSrc = basePath + activeFileName;

  checkImageExists(newSrc, function (exists) {
    if (exists) {
      if (image instanceof HTMLImageElement) {
        image.onload = function () {};

        image.onerror = function () {};

        image.src = newSrc;
      } else {
      }
    } else {
    }
  });
}

function checkImageExists(url, callback) {
  let img = new Image();
  img.onload = function () {
    callback(true);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = url;
}
