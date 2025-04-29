// backend/repository/asignacion.repository.mjs
import pool from '../config/db.config.mjs';

export async function createAsignacion(id_pelicula, id_sala_cine, fecha_publicacion, fecha_fin) {
  const query = `
    INSERT INTO pelicula_salacine (id_pelicula, id_sala_cine, fecha_publicacion, fecha_fin)
    VALUES ($1, $2, $3, $4)
    RETURNING id_pelicula_sala;
  `;

  try {
    const res = await pool.query(query, [id_pelicula, id_sala_cine, fecha_publicacion, fecha_fin]);
    return res.rows[0].id_pelicula_sala;
  } catch (err) {
    console.error('Error en asignacion.repository.createAsignacion:', err);
    throw err;
  }
}