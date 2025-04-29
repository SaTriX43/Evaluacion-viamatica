import express from 'express';
import cors from 'cors'; 
import peliculaRoutes from './routes/pelicula.routes.mjs'
import salaCineRoutes from './routes/salaCine.routes.mjs';
import dashboardRoutes from './routes/dashboard.routes.mjs';
import asignacionRoutes from './routes/asignacion.routes.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/peliculas', peliculaRoutes)
app.use('/api/salas', salaCineRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/asignaciones', asignacionRoutes)

// Middleware para manejar rutas no encontradas (404) - Colócalo al final de todas tus rutas
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada');
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
  console.error('Error del servidor:', err.stack);
  res.status(500).send('Algo salió mal en el servidor!');
});

app.listen(port, () => {
  console.log(`Backend API corriendo en http://localhost:${port}`);
});