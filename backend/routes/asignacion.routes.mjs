// backend/routes/asignacion.routes.mjs
import { Router } from 'express';
import { createAsignacion } from '../controllers/asignacion.controller.mjs';

const router = Router();

router.post('/', createAsignacion);

export default router;