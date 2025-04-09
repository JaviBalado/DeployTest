document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupEventListeners();
});

function setupEventListeners() {
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', handleNewTask);
}

async function loadTasks() {
    try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error cargando tareas:', error);
    }
}

async function handleNewTask(e) {
    e.preventDefault();
    const input = document.getElementById('taskInput');
    const title = input.value.trim();

    if (!title) return;

    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });

        const task = await response.json();
        renderTask(task);
        input.value = '';
    } catch (error) {
        console.error('Error creando tarea:', error);
    }
}

async function toggleTaskStatus(id, completed) {
    try {
        await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });
    } catch (error) {
        console.error('Error actualizando tarea:', error);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });
        const taskElement = document.querySelector(`[data-task-id="${id}"]`);
        taskElement.remove();
    } catch (error) {
        console.error('Error eliminando tarea:', error);
    }
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(renderTask);
}

function renderTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'list-group-item task-item';
    li.dataset.taskId = task.id;

    const date = new Date(task.createdAt).toLocaleDateString();
    
    li.innerHTML = `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" ${task.completed ? 'checked' : ''}
                onchange="toggleTaskStatus(${task.id}, this.checked)">
        </div>
        <span class="task-title ${task.completed ? 'task-completed' : ''}">${task.title}</span>
        <span class="task-date">${date}</span>
        <button class="btn btn-danger btn-sm delete-btn" onclick="deleteTask(${task.id})">
            Eliminar
        </button>
    `;

    taskList.appendChild(li);
}