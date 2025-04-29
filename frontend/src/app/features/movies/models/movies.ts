// frontend/src/app/features/movies/models/movies.ts
export interface Pelicula {
    id_pelicula: number;
    nombre: string;
    duracion: number;
    is_deleted?: boolean; 
}