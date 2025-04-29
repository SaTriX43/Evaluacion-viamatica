// frontend/src/app/features/movies/components/movie-list/movie-list.component.ts
import { Component, OnInit, inject, signal, WritableSignal, Output, EventEmitter } from '@angular/core'; // Importa Output y EventEmitter
import { MovieService } from '../../../services/movie.service';
import { Pelicula } from '../../../models/movies';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'movie-list-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent implements OnInit {
  private movieService = inject(MovieService);

  movies: WritableSignal<Pelicula[]> = signal([]);
  loading = signal(true);
  error = signal<any>(null);

  @Output() editMovieEvent = new EventEmitter<number>(); 
  @Output() deleteMovieEvent = new EventEmitter<number>(); 

  constructor() { }

  ngOnInit(): void {
    this.loadMovies();
  }

  public loadMovies(): void {
      this.loading.set(true);
      this.error.set(null);

      this.movieService.getAllPeliculas()
      .subscribe({
        next: (data) => {
          this.movies.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar la lista de peliculas:', err);
          this.error.set(err);
          this.loading.set(false);
        }
      });
  }

  onEditClick(id: number): void {
    this.editMovieEvent.emit(id); 
  }

  onDeleteClick(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
        this.deleteMovieEvent.emit(id); 
    }
  }
}