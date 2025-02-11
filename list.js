// Selecting necessary DOM elements
let taskInput = document.getElementById("new-task"); 

// First button
let addButton = document.getElementsByTagName("button")[0]; 

// ul of #incomplete-tasks
let incompleteTaskHolder = document.getElementById("incomplete-tasks"); 

// Completed-tasks
let completedTasksHolder = document.getElementById("completed-tasks"); 

/*---- Part 1 ----*/
// Function to create new task item
let createNewTaskElement = function (taskString) {
    let listItem = document.createElement("li");

    // Input (checkbox)
    let checkBox = document.createElement("input"); // Checkbox
    // Label
    let label = document.createElement("label"); // Label
    // Button.edit
    let editButton = document.createElement("button"); // Edit button
    // Button.delete
    let deleteButton = document.createElement("button"); // Delete button

    label.innerText = taskString;

    // Set attributes for elements
    checkBox.type = "checkbox";
    editButton.innerText = "Edit";     
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    // Append items to the list item
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

/*---- Part 2 ----*/
// Function to add a new task
let addTask = function () {
    console.log("Add Task...");

    let listItem = createNewTaskElement(taskInput.value);

    if (taskInput.value.trim() === "") {
        return;
    }

    // Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    // Clear the input field after adding the task
    taskInput.value = "";
};

/*---- Part 3 ----*/
// Function to edit a task
let editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    let listItem = this.parentNode;

    let label = listItem.querySelector("label");
    let editButton = this;

    // If in edit mode, save changes
    if (listItem.classList.contains("editMode")) {
        label.contentEditable = "false";
        editButton.innerText = "Edit";
    } else {
        label.contentEditable = "true";
        label.focus();
        editButton.innerText = "Save";
    }

    // Toggle edit mode
    listItem.classList.toggle("editMode");
};

/*---- Part 4 ----*/
// Function to delete a task
let deleteTask = function () {
    console.log("Delete Task...");

    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
};

/*---- Part 5 ----*/
// Function to mark a task as complete
let taskCompleted = function () {
    console.log("Complete Task...");

    // Append the task list item to the #completed-tasks
    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

/*---- Part 6 ----*/
// Function to mark a task as incomplete
let taskIncomplete = function () {
    console.log("Incomplete Task...");

    // Append the task list item to the #incomplete-tasks
    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

/*---- Part 7 ----*/
// Add event listener to the add button
addButton.addEventListener("click", addTask);

// Function to bind events to task items
let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");

    // Select ListItems children
    let checkBox = taskListItem.querySelector("input[type=checkbox]");
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");

    // Bind editTask to edit button
    editButton.onclick = editTask;
    // Bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    // Bind taskCompleted to checkBoxEventHandler
    checkBox.onchange = checkBoxEventHandler;
};

/*---- Part 8 ----*/
// Cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    // Bind events to list items children(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    // Bind events to list items children(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
