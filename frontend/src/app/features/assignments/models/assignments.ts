// frontend/src/app/features/assignments/models/assignments.ts
export interface AsignacionPayload {
    id_pelicula: number;
    id_sala_cine: number;
    fecha_publicacion: string; 
    fecha_fin: string; 
}
  
export interface Asignacion {
    id_asignacion: number;
    id_pelicula: number;
    id_sala_cine: number;
    fecha_publicacion: string;
    fecha_fin: string;
}