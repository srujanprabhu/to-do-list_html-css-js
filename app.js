document.addEventListener("DOMContentLoaded", ()=> {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if(storedTasks) {
        storedTasks.forEach((task)=> tasks.push(task))
        updateTaskList();
        updateStats();
        
    }
});


let tasks = [];

const saveTasks = ()=> {
    localStorage.setItem('tasks',JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Clear input field
        updateTaskList();
        updateStats();
        saveTasks();
}};


const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList()
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const compelteTasks = tasks.filter(task=> task.completed).length;
    const totalTasks = tasks.length ;
    const progress = (compelteTasks/totalTasks)*100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`; 
    document.getElementById('numbers').innerText = `${compelteTasks} / ${totalTasks}`;

    const areAllTasksCompleted = totalTasks > 0 && compelteTasks === totalTasks;

    // Blast confetti only if all tasks are completed and it wasn't already true
    if (areAllTasksCompleted && !allTasksCompleted) {
        blastConfetti();
    }

    allTasksCompleted = areAllTasksCompleted;
    
}


const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    if (!taskList) {
        console.error('Element with id "task-list" not found!');
        return; // If taskList is not found, stop execution
    }

    taskList.innerHTML = ''; // Clear the existing task list

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./edit-svgrepo-com.svg" alt="edit" class="image-delete" onClick="editTask(${index})">
                <img src="./delete-svgrepo-com.svg" alt="hi" class="image-delete" onClick="deleteTask(${index})">
            </div>
        </div>
        `;

        listItem.addEventListener('change', () => toggleTaskComplete(index));

        taskList.appendChild(listItem); // Append the list item to the task list
    });
};

document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();
    addTask();
});


const blastConfetti = ()=> {
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
};

