// frontend/src/app/features/rooms/models/rooms.ts
export interface SalaCine {
    id_sala: number;
    nombre: string;
    estado: string; 
    is_deleted?: boolean; 
  }
  
  // Interfaz para el estado calculado (si la obtienes desde el backend)
  export interface SalaCineStatus {
      id_sala: number;
      nombre: string;
      estado_db: string;
      peliculas_asignadas_count: number;
      estado_calculado: string; 
  }