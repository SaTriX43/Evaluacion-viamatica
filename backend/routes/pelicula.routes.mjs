// backend/routes/pelicula.routes.mjs
import { Router } from 'express';
import { createPelicula, getAllPeliculas, getPeliculaById, logicalDeletePelicula, searchPeliculasByName, searchPeliculasByPublicationDate, updatePelicula } from '../controllers/pelicula.controller.mjs'; 

const router = Router();

router.get('/buscarPorNombre', searchPeliculasByName)
router.get('/publicadasEnFecha', searchPeliculasByPublicationDate);
router.get('/:id', getPeliculaById);
router.get('/', getAllPeliculas)
router.post('/', createPelicula)
router.put('/:id', updatePelicula)
router.delete('/:id', logicalDeletePelicula);

export default router;