// frontend/src/app/features/movies/services/movie.service.ts
import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiService = inject(ApiService);

  getAllPeliculas(): Observable<Pelicula[]> {
    return this.apiService.get<Pelicula[]>('/peliculas');
  }

  createPelicula(pelicula: { nombre: string; duracion: number }): Observable<any> {
    return this.apiService.post('/peliculas', pelicula);
  }

  getPeliculaById(id: number): Observable<Pelicula> {
    return this.apiService.get<Pelicula>(`/peliculas/${id}`);
  }

  updatePelicula(id: number, pelicula: { nombre: string; duracion: number }): Observable<any> {
    return this.apiService.put(`/peliculas/${id}`, pelicula);
  }

  logicalDeletePelicula(id: number): Observable<any> {
    return this.apiService.delete(`/peliculas/${id}`);
  }

  searchPeliculasByName(name: string): Observable<Pelicula[]> {
    return this.apiService.get<Pelicula[]>(`/peliculas/buscarPorNombre?nombre=${encodeURIComponent(name)}`);
  }

  searchPeliculasByPublicationDate(date: string): Observable<Pelicula[]> {
    return this.apiService.get<Pelicula[]>(`/peliculas/publicadasEnFecha?fecha=${encodeURIComponent(date)}`);
  }
}