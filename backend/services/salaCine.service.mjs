// backend/services/salaCine.service.mjs
import * as salaCineRepository from '../repository/salaCine.repository.mjs';

// CREATE
export async function createSalaCine(salaCineData) {
  try {
    const nuevaSalaId = await salaCineRepository.createSalaCine(
      salaCineData.nombre,
      salaCineData.estado
    );
    return { id_sala: nuevaSalaId };
  } catch (error) {
    console.error('Error en salaCine.service.createSalaCine:', error);
    throw error;
  }
}

// READ ALL
export async function getAllSalasCine() {
  try {
    const salas = await salaCineRepository.getAllSalasCine();
    return salas;
  } catch (error) {
    console.error('Error en salaCine.service.getAllSalasCine:', error);
    throw error;
  }
}

// READ BY ID
export async function getSalaCineById(id) {
  try {
    const sala = await salaCineRepository.getSalaCineById(id);
    return sala;
  } catch (error) {
    console.error('Error en salaCine.service.getSalaCineById:', error);
    throw error;
  }
}

// UPDATE
export async function updateSalaCine(id_sala, salaCineData) {
  try {
    const updatedSalaCine = await salaCineRepository.updateSalaCine(
      id_sala,
      salaCineData.nombre,
      salaCineData.estado
    );
    return updatedSalaCine;
  } catch (error) {
    console.error('Error en salaCine.service.updateSalaCine:', error);
    throw error;
  }
}



// SEARCH BY NAME
export async function searchSalasCineByName(nombre) {
  try {
     if (!nombre || nombre.trim() === '') {
        return [];
    }
    const salas = await salaCineRepository.searchSalasCineByName(nombre);
    return salas;
  } catch (error) {
    console.error('Error en salaCine.service.searchSalasCineByName:', error);
    throw error;
  }
}

// GET STATUS 
export async function getSalaCineStatus(id_sala) {
    try {
        const salaWithCount = await salaCineRepository.getSalaCineStatus(id_sala);

        if (!salaWithCount) {
            return null; 
        }

        const count = parseInt(salaWithCount.assigned_movies_count) || 0; 

        let statusMessage;
        if (count < 3) {
            statusMessage = 'Sala disponible'; // REQUERIDO
        } else if (count >= 3 && count <= 5) {
            statusMessage = `Sala con ${count} películas asignadas`; // REQUERIDO
        } else { // count > 5
            statusMessage = 'Sala no disponible'; // REQUERIDO
        }

        // Retornamos la sala con su estado calculado y el contador (opcional)
        return {
            id_sala: salaWithCount.id_sala,
            nombre: salaWithCount.nombre,
            estado_db: salaWithCount.estado, // El estado que pueda venir de la DB
            peliculas_asignadas_count: count,
            estado_calculado: statusMessage // El mensaje de estado segun el enunciado
        };

    } catch (error) {
        console.error('Error en salaCine.service.getSalaCineStatus:', error);
        throw error;
    }
}