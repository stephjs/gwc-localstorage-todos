let currentTodoCount = 0;
const todoArray = [];
const todoList = document.getElementById('list');


document.getElementById('add').onclick = function(e){
    let newtask = document.getElementById('todo').value;
    todoArray.push(newtask);
    addItemToList(newtask);
}

function deleteStuff(e) {
	const currentelement = this.id;
	const taskitem = document.getElementById("todo-"+currentelement);
    const index = todoArray.indexOf(taskitem.innerHTML);
    if (index > -1) {
        todoArray.splice(index, 1);
    }
	taskitem.remove();
	this.remove();
    setLocalStorage();
}

function renderArray() {
    for (let i=0; i<todoArray.length; i++) {
        addItemToList(todoArray[i])
    }
}

function addItemToList(theitem) {
    let todoItem = document.createElement("p");
    todoItem.id = "todo-"+currentTodoCount;
    todoItem.innerHTML += theitem;

    const deleteButton = document.createElement("button");
    deleteButton.id = currentTodoCount;
    deleteButton.className = "delete btn btn-danger";
    deleteButton.innerHTML += "X";
    deleteButton.addEventListener("click", deleteStuff)
    

    let listholder = document.createElement("div");
    listholder.className = "listholder";
    listholder.appendChild(deleteButton);
    listholder.appendChild(todoItem);
    todoList.appendChild(listholder);
    
    currentTodoCount++;
    setLocalStorage();
}

function setLocalStorage() {
    localStorage.clear();
    localStorage.setItem('todoObject', JSON.stringify(todoArray));
}

//local storage
if (typeof(Storage) !== "undefined") {
    const retrievedObject = JSON.parse(localStorage.getItem("todoObject"));
    for (let i=0; i<retrievedObject.length; i++) {
        todoArray.push(retrievedObject[i]);
    }
    renderArray();
}