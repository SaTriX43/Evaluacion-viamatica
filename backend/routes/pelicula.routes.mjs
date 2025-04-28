// backend/routes/pelicula.routes.mjs
import { Router } from 'express';
import { getAllPeliculas } from '../controllers/pelicula.controller.mjs'; // Importa la funcion controladora

const router = Router();

router.get('/', getAllPeliculas); 

export default router;