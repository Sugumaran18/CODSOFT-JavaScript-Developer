// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <div class="task-actions">
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to add a new task
    function addTask() {
        const task = taskInput.value.trim();
        if (task !== '') {
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    }

    // Function to edit a task
    window.editTask = function(index) {
        const newTask = prompt('Edit task:', tasks[index]);
        if (newTask !== null && newTask.trim() !== '') {
            tasks[index] = newTask.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    // Function to delete a task
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Event listener for adding a task
    addTaskBtn.addEventListener('click', addTask);

    // Render the tasks on page load
    renderTasks();
});
