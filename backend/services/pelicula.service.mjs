// backend/services/pelicula.service.mjs
import * as peliculaRepository from '../repository/pelicula.repository.mjs'; 

// get 
export async function getAllPeliculas() {
  try {
    const peliculas = await peliculaRepository.getAllPeliculas();
    return peliculas; 
  } catch (error) {
    console.error('Error en pelicula.service.getAllPeliculas:', error);
    throw error; 
  }
}


// get por nombre 
export async function searchPeliculasByName(nombre) {
  try {
    if (!nombre || nombre.trim() === '') {
      return []; 
    }

    const peliculas = await peliculaRepository.searchPeliculasByName(nombre);
    return peliculas; 
  } catch (error) {
    console.error('Error en pelicula.service.searchPeliculasByName:', error);
    throw error;
  }
}

// get por fecha 
export async function searchPeliculasByPublicationDate(fecha) {
  try {
    const peliculas = await peliculaRepository.searchPeliculasByPublicationDate(fecha);
    return peliculas; 
  } catch (error) {
    console.error('Error en pelicula.service.searchPeliculasByPublicationDate:', error);
    throw error;
  }
}


// post 
export async function createPelicula(peliculaData) {
  try {
    const nuevaPeliculaId = await peliculaRepository.createPelicula(
      peliculaData.nombre,
      peliculaData.duracion
    );
    return { id_pelicula: nuevaPeliculaId }; 
  } catch (error) {
    console.error('Error en pelicula.service.createPelicula:', error);
    throw error;
  }
}


// put 
export async function updatePelicula(id_pelicula, peliculaData) {
  try {

    const updatedPelicula = await peliculaRepository.updatePelicula(
      id_pelicula,
      peliculaData.nombre,
      peliculaData.duracion 
    );
    return updatedPelicula; 
  } catch (error) {
    console.error('Error en pelicula.service.updatePelicula:', error);
    throw error;
  }
}


// delete 
export async function logicalDeletePelicula(id_pelicula) {
  try {
    const success = await peliculaRepository.logicalDeletePelicula(id_pelicula);
    return success; 
  } catch (error) {
    console.error('Error en pelicula.service.logicalDeletePelicula:', error);
    throw error;
  }
}