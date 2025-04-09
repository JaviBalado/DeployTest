const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({ message: '¡Servidor funcionando correctamente!' });
});

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ message: 'Ruta de prueba' });
});

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});