//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".add-task__input");//Add a new task.
var addButton=document.querySelector(".add-task__button");//first button
var incompleteTaskHolder=document.querySelector(".current-task__list");//ul of .current-task__list
var completedTasksHolder=document.querySelector(".completed-task__list");//completed-task__list
var addTaskTitle = document.querySelector(".add-task__title");


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add("task");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //.button-edit
    var editButton=document.createElement("button");//edit button

    //.button-delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image


    label.innerText=taskString;
    label.className='task__label task_content';

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className = "task__completed";

    editInput.type="text";
    editInput.className="task__input task_content";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="task__button button-edit";

    deleteButton.className="task__button button-delete";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.alt = 'remove';
    deleteButtonImg.className="delete-img";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the .new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.task__input.task_content');
    var label=listItem.querySelector(".task__label");
    var editBtn=listItem.querySelector(".button-edit");
    var containsClass=listItem.classList.contains("task_edit");
    //If class of the parent is .task_edit
    if(containsClass){

        //switch to .task_edit
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .task_edit on the parent.
    listItem.classList.toggle("task_edit");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-task__list
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the .current-task__list.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.

var focusInput = function() {
    document.querySelector(".add-task__input").focus();
};

//Set the click handler to the addTask function.
addTaskTitle.addEventListener('click', focusInput);
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log('taskListItem: ', taskListItem);
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".task__completed");
    var editButton=taskListItem.querySelector(".button-edit");
    var deleteButton=taskListItem.querySelector(".button-delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.