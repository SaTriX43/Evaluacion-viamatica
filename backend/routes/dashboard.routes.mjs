// backend/routes/dashboard.routes.mjs
import { Router } from 'express';
import { getDashboardIndicators } from '../controllers/dashboard.controller.mjs';

const router = Router();

router.get('/indicadores', getDashboardIndicators);

export default router;