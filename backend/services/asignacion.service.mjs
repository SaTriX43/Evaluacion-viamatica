// backend/services/asignacion.service.mjs
import * as asignacionRepository from '../repository/asignacion.repository.mjs';

export async function createAsignacion(asignacionData) {
  try {
    if (!asignacionData.id_pelicula || !asignacionData.id_sala_cine || !asignacionData.fecha_publicacion || !asignacionData.fecha_fin) {
        throw new Error('Faltan datos requeridos para la asignacion.');
    }

    if (new Date(asignacionData.fecha_fin) < new Date(asignacionData.fecha_publicacion)) {
         throw new Error('La fecha fin no puede ser anterior a la fecha de publicacion.');
    }

    const nuevaAsignacionId = await asignacionRepository.createAsignacion(
      asignacionData.id_pelicula,
      asignacionData.id_sala_cine,
      asignacionData.fecha_publicacion,
      asignacionData.fecha_fin
    );
    return { id_pelicula_sala: nuevaAsignacionId };
  } catch (error) {
    console.error('Error en asignacion.service.createAsignacion:', error);
    throw error;
  }
}