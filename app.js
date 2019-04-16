$("#add").click(add);

$("#new-task").keypress(newtaskEnter)

function newtaskEnter(key) {
    if(key.keyCode === 13 && !(key.altKey)) {
        add();
    }
}

var taskNumber = 0;
var todoArray = [];


if(localStorage.getItem("tasks") !== "undefined" && localStorage.getItem("tasks") !== null) {
    todoArray = JSON.parse(localStorage.getItem("tasks"));
}

for(i = 0; i < todoArray.length; i++) {
    newtask(todoArray[i]);
}


$(document).on("click", ".close", close);

// The add function, which creates the divs
function add() {
    if($("#new-task").val().trim() === "") {
        $("#heading").text("You cannot add a blank task.")
    }
    else{
        var taskdetail = $("#new-task").val().trim()
        newtask(taskdetail);
        updateTaskArray(taskdetail);

    }

    // local store the value of any open tasks
    // And then also store the value of the taskNumber;
    // 
}

function newtask(taskdetail) {
    $("#heading").text("What do you need to accomplish today?")
    // console.log($("#new-task").val());
    // Create a shell div
    shellDiv = $("<div>");
        // set the id of the div
        shellDiv.attr("id", "task" + taskNumber);
        // set the classes of the div
        shellDiv.addClass("btn btn-light shelldiv") 

    // create a text div (for cleanliness)
        textDiv = $("<div>");
        // insert the text into the div
        textDiv.html(taskdetail);
        // create a class for the text
        textDiv.addClass("textdiv");
        // Make the text editable
        textDiv.attr("contenteditable", true);
        
    // create a close div
        closeDiv = $("<div>");
        // insert the X for the div
        closeDiv.text("x");
        closeDiv.attr("value", taskNumber);
        closeDiv.attr("taskdetail", taskdetail);
        // add a class for the closediv
        closeDiv.addClass("close");
    
    // append the divs into the shellDiv
    shellDiv.append(textDiv, closeDiv);

    // append this div into the the #tasks div
    $("#tasks").append(shellDiv);
    // Clear the text in the new-task area
    $("#new-task").val("")
    taskNumber++;
}

function updateTaskArray(taskdetail) {
        // Add the value of the text into the todoArray for localStorage
        todoArray.push(taskdetail);
        localStorage.setItem("tasks", JSON.stringify(todoArray));
}

function close() {
    // console.log($(this).attr("value"));
    $("#task"+$(this).attr("value")).remove();
    todoArray.splice(todoArray.indexOf($(this).attr("taskdetail")), 1);
    
    // Update the todoArray in local storage
    localStorage.setItem("tasks", JSON.stringify(todoArray));
}

// When editing a task, if you click enter, it blurs/deselects the task
$(document).on("keypress", ".textdiv", editEnter);

function editEnter(key) {
    if(key.keyCode === 13) {
        $(this).blur();
    }
}

