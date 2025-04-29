import * as peliculaService from '../services/pelicula.service.mjs'; 

// funcion auxiliar 
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  // Verifica si el objeto Date es valido y si las partes coinciden (para evitar fechas invalidas como 2023-02-30)
  return date.toISOString().slice(0, 10) === dateString;
}


// get 
export async function getAllPeliculas(req, res) {
  try {
    const peliculas = await peliculaService.getAllPeliculas();

    res.status(200).json(peliculas);

  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor al obtener peliculas' });
  }
}

// get por nombre 
export async function searchPeliculasByName(req, res) {
  try {
    const nombreBusqueda = req.query.nombre;

    if (!nombreBusqueda) {
        return res.status(400).json({ message: 'Falta el parametro de busqueda "nombre"' });
    }

    const peliculasEncontradas = await peliculaService.searchPeliculasByName(nombreBusqueda);

    res.status(200).json(peliculasEncontradas);

  } catch (error) {
    console.error('Error en el controlador searchPeliculasByName:', error);
    res.status(500).json({ message: 'Error interno del servidor al buscar peliculas por nombre' });
  }
}

// get por fecha 
export async function searchPeliculasByPublicationDate(req, res) {
  try {
    const fechaBusqueda = req.query.fecha; 

    if (!fechaBusqueda) {
        return res.status(400).json({ message: 'Falta el parametro de busqueda "fecha"' });
    }
    if (!isValidDate(fechaBusqueda)) {
        return res.status(400).json({ message: 'Formato de fecha invalido. Use YYYY-MM-DD' });
    }

    const peliculasEncontradas = await peliculaService.searchPeliculasByPublicationDate(fechaBusqueda);

    res.status(200).json(peliculasEncontradas); 

  } catch (error) {
    console.error('Error en el controlador searchPeliculasByPublicationDate:', error);
    res.status(500).json({ message: 'Error interno del servidor al buscar peliculas por fecha de publicacion' });
  }
}


// post 
export async function createPelicula(req, res) {
  try {
    const peliculaData = req.body; 

    if (!peliculaData || !peliculaData.nombre || peliculaData.duracion === undefined) {
        return res.status(400).json({ message: 'Faltan datos para crear la pelicula (nombre o duracion)' });
    }

    const nuevaPelicula = await peliculaService.createPelicula(peliculaData);

    res.status(201).json({
        message: 'Pelicula creada con éxito!',
        pelicula: nuevaPelicula 
    });

  } catch (error) {
    console.error('Error en el controlador createPelicula:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear pelicula' });
  }
}

// put 

export async function updatePelicula(req, res) {
  try {
    const id_pelicula = parseInt(req.params.id); 

    if (isNaN(id_pelicula)) {
        return res.status(400).json({ message: 'ID de pelicula invalido' });
    }

    const peliculaData = req.body; 

    if (!peliculaData || !peliculaData.nombre || peliculaData.duracion === undefined) {
        return res.status(400).json({ message: 'Faltan datos para actualizar la pelicula (nombre o duracion)' });
    }

    const updatedPelicula = await peliculaService.updatePelicula(id_pelicula, peliculaData);

    if (updatePelicula) {
      res.status(200).json({
        message: 'Pelicula actualizada con exito!',
        pelicula: updatedPelicula
      }); 
    } else {
      res.status(404).json({ message: 'Pelicula no encontrada' });
    }

  } catch (error) {
    console.error('Error en el controlador updatePelicula:', error);
    res.status(500).json({ message: 'Error interno del servidor al actualizar pelicula' });
  }
}


// delete 
export async function logicalDeletePelicula(req, res) {
  try {
    const id_pelicula = parseInt(req.params.id);
    if (isNaN(id_pelicula)) {
        return res.status(400).json({ message: 'ID de pelicula invalido' });
    }

    const success = await peliculaService.logicalDeletePelicula(id_pelicula);

    if (success) {
      res.status(200).json({ message: 'Pelicula eliminada logicamente con éxito!' }); 
    } else {
      res.status(404).json({ message: 'Pelicula no encontrada' });
    }

  } catch (error) {
    console.error('Error en el controlador logicalDeletePelicula:', error);
    res.status(500).json({ message: 'Error interno del servidor al eliminar pelicula logicamente' });
  }
}