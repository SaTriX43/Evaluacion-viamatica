// backend/repositories/pelicula.repository.mjs
import pool from '../config/db.config.mjs'; 

// get 
export async function getAllPeliculas() {
  const query = 'SELECT id_pelicula, nombre, duracion FROM pelicula WHERE is_deleted = FALSE';
  try {
    const res = await pool.query(query);
    return res.rows; 
  } catch (err) {
    console.error('Error en pelicula.repository.getAllPeliculas:', err);
    throw err; 
  }
}

// get por id 
export async function getPeliculaById(id_pelicula) {
  const query = `
    SELECT id_pelicula, nombre, duracion
    FROM pelicula
    WHERE id_pelicula = $1 AND is_deleted = FALSE; 
  `; 

  try {
    const res = await pool.query(query, [id_pelicula]);
    return res.rows[0];
  } catch (err) {
    console.error('Error en pelicula.repository.getPeliculaById:', err);
    throw err;
  }
}


// get por nombre 
export async function searchPeliculasByName(nombre) {
  const query = `
    SELECT id_pelicula, nombre, duracion
    FROM pelicula
    WHERE nombre ILIKE $1 AND is_deleted = FALSE;
  `;

  try {
    const searchTerm = `%${nombre}%`;
    const res = await pool.query(query, [searchTerm]);

    return res.rows; 
  } catch (err) {
    console.error('Error en pelicula.repository.searchPeliculasByName:', err);
    throw err;
  }
}

// get por fecha 

export async function searchPeliculasByPublicationDate(fecha) {
  const query = `
    SELECT DISTINCT p.id_pelicula, p.nombre, p.duracion 
    FROM pelicula p
    JOIN pelicula_salacine ps ON p.id_pelicula = ps.id_pelicula 
    WHERE $1 BETWEEN ps.fecha_publicacion AND ps.fecha_fin 
      AND p.is_deleted = FALSE; 
  `; 

  try {
    const res = await pool.query(query, [fecha]); 
    return res.rows; 
  } catch (err) {
    console.error('Error en pelicula.repository.searchPeliculasByPublicationDate:', err);
    throw err;
  }
}


// post 
export async function createPelicula(nombre, duracion) {
  const query = `
    INSERT INTO pelicula (nombre, duracion)
    VALUES ($1, $2)
    RETURNING id_pelicula;
  `; 

  try {
    const res = await pool.query(query, [nombre, duracion]); 
    return res.rows[0].id_pelicula; 
  } catch (err) {
    console.error('Error en pelicula.repository.createPelicula:', err);
    throw err;
  }
}

// put 

export async function updatePelicula(id_pelicula, nombre, duracion) {
  const query = `
    UPDATE pelicula
    SET nombre = $1, duracion = $2
    WHERE id_pelicula = $3
    RETURNING id_pelicula, nombre, duracion;
  `; 

  try {
    const res = await pool.query(query, [nombre, duracion, id_pelicula]);

    if (res.rowCount === 0) {
        return null; 
    }

    return res.rows[0]; 

  } catch (err) {
    console.error('Error en pelicula.repository.updatePelicula:', err);
    throw err;
  }
}

// delete 
export async function logicalDeletePelicula(id_pelicula) {
  const query = `
    UPDATE pelicula
    SET is_deleted = TRUE
    WHERE id_pelicula = $1;
  `; 

  try {
    const res = await pool.query(query, [id_pelicula]);
    return res.rowCount > 0; 

  } catch (err) {
    console.error('Error en pelicula.repository.logicalDeletePelicula:', err);
    throw err;
  }
}