const express = require('express');
const router = express.Router();

// Array para almacenar las tareas (en una aplicación real usaríamos una base de datos)
let tasks = [];

// Obtener todas las tareas
router.get('/', (req, res) => {
    res.json(tasks);
});

// Crear una nueva tarea
router.post('/', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(task);
    res.status(201).json(task);
});

// Actualizar una tarea
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...req.body,
        id: id
    };

    res.json(tasks[taskIndex]);
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    tasks = tasks.filter(task => task.id !== id);
    res.status(204).send();
});

module.exports = router;