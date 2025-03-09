document.addEventListener('DOMContentLoaded', () => {
    const taskDescription = document.getElementById('task-description');
    const taskDate = document.getElementById('task-date');
    const addTaskButton = document.getElementById('add-task');
    const tasksList = document.getElementById('tasks');

    let tasks = [];  // Arreglo para almacenar las tareas

    // Cargar tareas guardadas al abrir la página
    loadTasks();

    // Añadir una nueva tarea al hacer clic en el botón
    addTaskButton.addEventListener('click', () => {
        const description = taskDescription.value.trim();
        const date = taskDate.value;

        // Validar que ambos campos estén completos
        if (!description || !date) {
            alert('Por favor, ingrese tanto la descripción como la fecha de la tarea.');
            return;
        }

        const newTask = {
            description,
            date,
            completed: false
        };

        tasks.push(newTask);
        renderTasks();  // Renderizar la lista ordenada
        taskDescription.value = '';  // Limpiar el campo de descripción
        taskDate.value = '';  // Limpiar el campo de fecha
        saveTasks();  // Guardar las tareas
    });

    // Manejar eventos de cambio en las casillas de verificación y botones de eliminar
    tasksList.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            const index = event.target.dataset.index;
            tasks[index].completed = event.target.checked;
            saveTasks();
        }
    });

    tasksList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-task')) {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);  // Eliminar la tarea del arreglo
            renderTasks();  // Renderizar la lista actualizada
            saveTasks();  // Guardar las tareas
        }
    });

    // Función para renderizar la lista de tareas ordenadas por fecha
    function renderTasks() {
        // Ordenar las tareas por fecha
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Limpiar la lista actual
        tasksList.innerHTML = '';

        // Renderizar cada tarea
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <input type="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
                <span>${task.description} - ${task.date}</span>
                <button class="delete-task" data-index="${index}">Eliminar</button>
            `;
            tasksList.appendChild(taskItem);
        });
    }

    // Función para guardar las tareas en localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para cargar las tareas desde localStorage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            renderTasks();  // Renderizar la lista ordenada
        }
    }
});