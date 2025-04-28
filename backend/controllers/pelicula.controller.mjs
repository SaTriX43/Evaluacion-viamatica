// backend/controllers/pelicula.controller.mjs
// Importa el servicio de peliculas aqui cuando lo tengas:
// import * as peliculaService from '../services/pelicula.service.mjs';

export async function getAllPeliculas(req, res) {
  try {
    // Aqui iría la llamada al servicio para obtener datos reales de la DB:
    // const peliculas = await peliculaService.getAllPeliculas();

    // Datos de prueba temporales:
    const peliculasDePrueba = [
        { id_pelicula: 1, nombre: 'Pelicula A', duracion: 90 },
        { id_pelicula: 2, nombre: 'Pelicula B', duracion: 110 },
    ];

    res.status(200).json(peliculasDePrueba); // Envia los datos de prueba

  } catch (error) {
    // console.error('Error al obtener peliculas:', error); // Puedes descomentar para depurar errores
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// Agrega otras funciones controladoras (getById, create, update, delete) aqui:
// export async function getPeliculaById(req, res) { ... }
// export async function createPelicula(req, res) { ... }
// ...