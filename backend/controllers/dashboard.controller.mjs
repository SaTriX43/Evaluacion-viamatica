// backend/controllers/dashboard.controller.mjs
import * as dashboardService from '../services/dashboard.service.mjs';

export async function getDashboardIndicators(req, res) {
  try {
    const indicators = await dashboardService.getDashboardIndicators();
    res.status(200).json(indicators);
  } catch (error) {
    console.error('Error en el controlador getDashboardIndicators:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener indicadores del dashboard' });
  }
}