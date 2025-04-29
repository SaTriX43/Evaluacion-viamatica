// backend/repository/salaCine.repository.mjs
import pool from '../config/db.config.mjs';

// CREATE
export async function createSalaCine(nombre, estado) {
  const query = `
    INSERT INTO sala_cine (nombre, estado)
    VALUES ($1, $2)
    RETURNING id_sala;
  `;
  try {
    const res = await pool.query(query, [nombre, estado]);
    return res.rows[0].id_sala;
  } catch (err) {
    console.error('Error en salaCine.repository.createSalaCine:', err);
    throw err;
  }
}

// get
export async function getAllSalasCine() {
  const query = 'SELECT id_sala, nombre, estado FROM sala_cine WHERE is_deleted = FALSE;';
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error('Error en salaCine.repository.getAllSalasCine:', err);
    throw err;
  }
}

// READ BY ID
export async function getSalaCineById(id) {
  const query = 'SELECT id_sala, nombre, estado FROM sala_cine WHERE id_sala = $1 AND is_deleted = FALSE;';
  try {
    const res = await pool.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    console.error('Error en salaCine.repository.getSalaCineById:', err);
    throw err;
  }
}


// UPDATE
export async function updateSalaCine(id_sala, nombre, estado) {
  const query = `
    UPDATE sala_cine
    SET nombre = $1, estado = $2
    WHERE id_sala = $3
    RETURNING id_sala, nombre, estado;
  `;
  try {
    const res = await pool.query(query, [nombre, estado, id_sala]);
     if (res.rowCount === 0) {
        return null;
    }
    return res.rows[0];
  } catch (err) {
    console.error('Error en salaCine.repository.updateSalaCine:', err);
    throw err;
  }
}


// SEARCH BY NAME
export async function searchSalasCineByName(nombre) {
  const query = `
    SELECT id_sala, nombre, estado
    FROM sala_cine
    WHERE nombre ILIKE $1 AND is_deleted = FALSE;
  `;
  try {
    const searchTerm = `%${nombre}%`;
    const res = await pool.query(query, [searchTerm]);
    return res.rows;
  } catch (err) {
    console.error('Error en salaCine.repository.searchSalasCineByName:', err);
    throw err;
  }
}

// GET STATUS (Requires joining with pelicula_salacine)
export async function getSalaCineStatus(id_sala) {
    const query = `
        SELECT
            sc.id_sala,
            sc.nombre,
            sc.estado,
            COUNT(ps.id_pelicula) AS assigned_movies_count -- Cuenta cuantas asignaciones tiene
        FROM sala_cine sc
        LEFT JOIN pelicula_salacine ps ON sc.id_sala = ps.id_sala_cine
        WHERE sc.id_sala = $1 AND sc.is_deleted = FALSE
          -- Opcional: Filtrar asignaciones activas por fecha actual si el estado debe ser en tiempo real
          -- AND CURRENT_DATE BETWEEN ps.fecha_publicacion AND ps.fecha_fin
        GROUP BY sc.id_sala, sc.nombre, sc.estado; -- Agrupamos por sala para contar sus asignaciones
    `; // $1 es el id_sala

    try {
        const res = await pool.query(query, [id_sala]);
        return res.rows[0]; // Retorna la sala con el contador o undefined/null si no existe
    } catch (err) {
        console.error('Error en salaCine.repository.getSalaCineStatus:', err);
        throw err;
    }
}