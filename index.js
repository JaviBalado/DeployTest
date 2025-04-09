const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const tasksRouter = require('./routes/tasks');

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/tasks', tasksRouter);

// Vista principal
app.get('/', (req, res) => {
    res.render('index');
});

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});