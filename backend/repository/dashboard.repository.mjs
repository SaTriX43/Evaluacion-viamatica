// backend/repository/dashboard.repository.mjs
import pool from '../config/db.config.mjs';

export async function getTotalMoviesCount() {
  const query = 'SELECT COUNT(*) FROM pelicula WHERE is_deleted = FALSE;';
  try {
    const res = await pool.query(query);
    return parseInt(res.rows[0].count);
  } catch (err) {
    console.error('Error en dashboard.repository.getTotalMoviesCount:', err);
    throw err;
  }
}

export async function getTotalRoomsCount() {
  const query = 'SELECT COUNT(*) FROM sala_cine WHERE is_deleted = FALSE;';
  try {
    const res = await pool.query(query);
    return parseInt(res.rows[0].count);
  } catch (err) {
    console.error('Error en dashboard.repository.getTotalRoomsCount:', err);
    throw err;
  }
}

export async function getAvailableRoomsCount() {
    const query = `
        SELECT COUNT(sc.id_sala) AS available_rooms_count
        FROM sala_cine sc
        LEFT JOIN (
            SELECT ps.id_sala_cine, COUNT(ps.id_pelicula) AS assigned_count
            FROM pelicula_salacine ps
            GROUP BY ps.id_sala_cine
        ) as assignments ON sc.id_sala = assignments.id_sala_cine
        WHERE sc.is_deleted = FALSE AND COALESCE(assignments.assigned_count, 0) < 3;
    `;
    try {
        const res = await pool.query(query);
        return parseInt(res.rows[0].available_rooms_count);
    } catch (err) {
        console.error('Error en dashboard.repository.getAvailableRoomsCount:', err);
        throw err;
    }
}