async function init() {
    await getAllTasks(tasksKey);
    await getContacts(contactKey);
    getUser(sessionKey);
    renderComponents(activeUser);
    navActive(2);
    updateBoard();
}


function updateBoard(searchArr) {
    const fliterArr = searchArr || allTasks;
    taskFilter(fliterArr, "To-Do", todoArr);
    taskFilter(fliterArr, "In-Progress", progressArr)
    taskFilter(fliterArr, "Await-Feedback", awaitArr);
    taskFilter(fliterArr, "Done", doneArr);
    checkDragArea();
    hideBar();
    renderTodoIcons()
}

function taskFilter(arr, string) {
    let statusArr = arr.filter(e => e.status == string);
    document.getElementById(string).innerHTML = '';
    for (let i = 0; i < statusArr.length; i++) {
        const element = statusArr[i];
        document.getElementById(string).innerHTML += generateTodoHTML(element)
    }
    return parentArr = statusArr
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(status) {
    const draggedTask = allTasks.find(task => task.id === currentDraggedElement);

    if (draggedTask) {
        setTimeout(() => {
            draggedTask.status = status;
            draggedTask.id = Date.now();
            sortArray();
            setAllTasks(tasksKey, allTasks);
            updateBoard();
            hideBar();
        }, 50);
    }
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}



function sortArray() {
    return allTasks.sort((a, b) => a.id - b.id)
}

function convertCategory(element) {
    let categories = element.category.split(' ');
    let capitalizedCategories = categories.map((category) => {
        return category.charAt(0).toLowerCase() + category.slice(1);
    });
    let category = capitalizedCategories.join('-');
    return category;
}


function hideBar() {
    for (let i = 0; i < allTasks.length; i++) {
        let element = allTasks[i];
        if (element.subTask.length === 0) {
            let bar = document.getElementById(`sub${element.id}`);
            if (bar) {
                bar.classList.add('d-none')
            }
        }
    }
}


function closePopUp() {
    let popup = document.getElementById('add-pop-up');
    let container = document.getElementById('pop-up-container');
    container.style.animation = "slide-out 0.15s ease-in-out forwards"
    setTimeout(() => {
        popup.classList.add('d-none')
        container.style.animation = "";
    }, 150);
}

function closeSingleTodo(id) {
    // function setTaskCounter(id){
    //     let task = allTasks.find(task => task.id === id);
    //     task.counter = counter
    // }
    let popup = document.getElementById('add-pop-up');
    let container = document.getElementById('pop-up-container');
    container.style.animation = "slide-out 0.15s ease-in-out forwards"
    setTimeout(() => {
        popup.classList.add('d-none')
        container.style.animation = "";
    }, 150);
}

function openPopUp() {
    renderPopUpAddTask()
    let popup = document.getElementById('add-pop-up');
    popup.classList.remove('d-none')
}

function openTodoPopup(id) {
    renderSingleTodo(id);
    let popup = document.getElementById('add-pop-up');
    popup.classList.remove('d-none')

}

function animatePopUp() {

}

async function deleteTask(id) {
    let object = allTasks.find((task) => task.id == id);
    
    if (object) {
      let index = allTasks.indexOf(object);
      allTasks.splice(index, 1);
    }
    await setAllTasks(tasksKey, allTasks);
    closePopUp();
    updateBoard();
  }


function openEditTaskPopUp() {
    renderEditTaskPopUp();
    let popup = document.getElementById('pop-up-container');
    popup.classList.remove('d-none')
}

function changeStatus(string) {
    let btn = document.getElementById('createTaskButton')
    btn.setAttribute('onclick', `addTask('${string}')`)
}

function checkDragArea() {
    let dragArea = document.getElementsByClassName('drag-area')
    for (let i = 0; i < dragArea.length; i++) {
        if (dragArea[i].innerHTML.includes('Technical Task') || dragArea[i].innerHTML.includes('User Story')) {
            if (dragArea[i].firstElementChild) {
                dragArea[i].style = 'justify-content: flex-start';
                dragArea[i].style = 'border:none;background-color: transparent;border-radius:3rem;justify-content: flex-start'
            }
        } else {
            dragArea[i].style = '';
            dragArea[i].innerText = 'No tasks to do';
        }
    }
}


function addAssignees() {
    let idArr = [];
    for (let i = 0; i < assignees.length; i++) {
        idArr.push(allTasks[assignees[i]].id)
    }
    return idArr
}


function addSearchBarHandler() {
    let input = document.getElementById("find-task");
    function search() {
        let searchTerm = input.value.toLowerCase();
        let filteredTasks = allTasks.filter(task => {
            let title = task.title.toLowerCase();
            let description = task.description.toLowerCase();
            return title.includes(searchTerm) || description.includes(searchTerm);
        });
        updateBoard(filteredTasks);
    }
    input.oninput = search;
}


function focusInput() {
    let input = document.getElementById("find-task");
    input.focus();
}

function generateVarObj(obj) {
    let todoObject = {
        text : obj.description.split('\n').join('<br/>'),
        date : obj.date.split('-').reverse().join('/'),
        priority : obj.prio.slice(0, 1).toUpperCase() + obj.prio.slice(1),
        category : convertCategory(obj)
    }
    return todoObject,editTaskObj=todoObject
}


function startEdit() {
    editCurrentTodo(editTask),
    writeDescription(editTask)
}

function writeDescription(task) {
    let description = document.getElementById("description");
    let value = task.description;
    description.innerHTML = value;
  }

  function editOk(status,index,prio){
    console.log(status)
    editTodoInAllTasks(status,index,prio);
    closePopUp();
    updateBoard();
}

// function taskResolved(){

// }

function subBoxClick(i) {
    let checkbox = document.getElementById(`check${i}`);
    let img = document.getElementById(`img-box${i}`);
    let finishedTask = document.getElementById(`img-box${i}`)
    subCheckBox(checkbox, img,finishedTask);
    }
  
  
  function subCheckBox(box, img,finishedTask){
    console.log(finishedTask)
    if (box.checked) {
      box.checked = false;
      img.src = '/assets/img/checkbox.png';
      img.style = "";
      img.setAttribute('data-conter','0');
      finishedTask.setAttribute('data-counter','0');
    } else if (!box.checked) {
      box.checked = true;
      img.src = '/assets/img/checked-box.png';
      img.style = 'width: 0.9rem;height: .9rem';
      img.setAttribute('data-conter','1');
      finishedTask.setAttribute('data-counter','1');
    }
  }


//   function checkForFinishedTasks(){
//     let subTasks = document.getElementsByClassName('sub-checkbox')
//     for (let i = 0; i < subTasks.length; i++) {
//       let check = subTasks[i];
//       if(check.getAttribute('data-counter') === '1'){
//         subBoxClick(check.id)
//       }
//     }
//   }