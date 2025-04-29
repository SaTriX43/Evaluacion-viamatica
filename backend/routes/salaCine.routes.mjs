// backend/routes/salaCine.routes.mjs
import { Router } from 'express';
import {
    createSalaCine,
    getAllSalasCine,
    getSalaCineById,
    updateSalaCine,
    searchSalasCineByName,
    getSalaCineStatus
} from '../controllers/salaCine.controller.mjs';

const router = Router();

// CREATE
router.post('/', createSalaCine);

// READ (All, By ID, Search)
router.get('/buscarPorNombre', searchSalasCineByName); // Buscar por nombre
router.get('/status/:id', getSalaCineStatus); // Obtener estado por ID
router.get('/:id', getSalaCineById); // Obtener por ID (PONLA DESPUES DE /status/:id)
router.get('/', getAllSalasCine); // Obtener todas (PONLA AL FINAL)

// UPDATE
router.put('/:id', updateSalaCine);
;


export default router;