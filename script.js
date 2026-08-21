// ==========================================
// TASK DATA
// ==========================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// ==========================================
// DOM ELEMENTS
// ==========================================

const taskInput = document.getElementById("taskInput");

const priorityInput = document.getElementById("priorityInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const clearCompleted = document.getElementById("clearCompleted");

const filters = document.querySelectorAll(".filter");


// ==========================================
// ADD TASK
// ==========================================

function addTask() {

    const text = taskInput.value.trim();

    // Prevent empty tasks
    if (text === "") {

        alert("Please enter a task.");

        return;
    }


    // Create new task
    const task = {

        id: Date.now(),

        text: text,

        completed: false,

        priority: priorityInput.value

    };


    // Add task to array
    tasks.push(task);


    // Save tasks
    saveTasks();


    // Clear input
    taskInput.value = "";


    // Reset priority to Medium
    priorityInput.value = "medium";


    // Display tasks
    displayTasks();
}


// ==========================================
// DISPLAY TASKS
// ==========================================

function displayTasks() {

    // Clear current list
    taskList.innerHTML = "";


    let filteredTasks = tasks;


    // Show active tasks
    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function(task) {

            return !task.completed;

        });
    }


    // Show completed tasks
    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function(task) {

            return task.completed;

        });
    }


    // Create each task
    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");


        li.className = "task";


        // Add completed class
        if (task.completed) {

            li.classList.add("completed");
        }


        // Old tasks may not have priority
        const priority = task.priority || "medium";


        li.innerHTML = `

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})"
            >


            <span class="task-text">
                ${task.text}
            </span>


            <select
                class="priority-select priority-${priority}"
                onchange="changePriority(${task.id}, this.value)"
            >

                <option
                    value="low"
                    ${priority === "low" ? "selected" : ""}
                >
                    Low
                </option>


                <option
                    value="medium"
                    ${priority === "medium" ? "selected" : ""}
                >
                    Medium
                </option>


                <option
                    value="high"
                    ${priority === "high" ? "selected" : ""}
                >
                    High
                </option>

            </select>


            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                ×
            </button>

        `;


        taskList.appendChild(li);

    });


    // Update task counter
    updateTaskCount();
}


// ==========================================
// TOGGLE TASK
// ==========================================

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;
        }


        return task;

    });


    saveTasks();

    displayTasks();
}


// ==========================================
// CHANGE PRIORITY
// ==========================================

function changePriority(id, priority) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.priority = priority;
        }


        return task;

    });


    saveTasks();

    displayTasks();
}


// ==========================================
// DELETE TASK
// ==========================================

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();
}


// ==========================================
// CLEAR COMPLETED TASKS
// ==========================================

clearCompleted.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });


    saveTasks();

    displayTasks();

});


// ==========================================
// CHANGE FILTER
// ==========================================

filters.forEach(function(button) {

    button.addEventListener("click", function() {


        // Remove active class
        filters.forEach(function(btn) {

            btn.classList.remove("active");

        });


        // Add active class
        button.classList.add("active");


        // Get selected filter
        currentFilter = button.dataset.filter;


        // Display filtered tasks
        displayTasks();

    });

});


// ==========================================
// ADD TASK BUTTON
// ==========================================

addTaskBtn.addEventListener("click", addTask);


// ==========================================
// ENTER KEY
// ==========================================

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// ==========================================
// SAVE TASKS
// ==========================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ==========================================
// UPDATE TASK COUNT
// ==========================================

function updateTaskCount() {

    const remainingTasks = tasks.filter(function(task) {

        return !task.completed;

    }).length;


    taskCount.textContent =
        `${remainingTasks} task${remainingTasks !== 1 ? "s" : ""} remaining`;

}


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayTasks();