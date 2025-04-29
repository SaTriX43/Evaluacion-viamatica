// backend/controllers/asignacion.controller.mjs
import * as asignacionService from '../services/asignacion.service.mjs';

export async function createAsignacion(req, res) {
  try {
    const asignacionData = req.body;

    if (!asignacionData.id_pelicula || !asignacionData.id_sala_cine || !asignacionData.fecha_publicacion || !asignacionData.fecha_fin) {
        return res.status(400).json({ message: 'Faltan datos requeridos (id_pelicula, id_sala_cine, fecha_publicacion, fecha_fin)' });
    }
     if (isNaN(parseInt(asignacionData.id_pelicula)) || isNaN(parseInt(asignacionData.id_sala_cine))) {
         return res.status(400).json({ message: 'IDs de pelicula o sala invalidos' });
     }

    const nuevaAsignacion = await asignacionService.createAsignacion(asignacionData);

    res.status(201).json({
        message: 'Asignacion creada con éxito!',
        asignacion: nuevaAsignacion
    });

  } catch (error) {
    console.error('Error en el controlador createAsignacion:', error);
     if (error.message && error.message.includes('Faltan datos requeridos') || error.message.includes('fecha fin') || error.message.includes('IDs invalidos')) {
         return res.status(400).json({ message: error.message }); // Errores de validacion del servicio
     }
    res.status(500).json({ message: 'Error interno del servidor al crear asignacion' });
  }
}