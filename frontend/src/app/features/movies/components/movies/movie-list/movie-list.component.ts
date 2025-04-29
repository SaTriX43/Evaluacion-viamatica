// frontend/src/app/features/movies/components/movie-list/movie-list.component.ts
import {
  Component,
  OnInit,
  inject,
  signal,
  WritableSignal,
  Output,
  EventEmitter,
} from '@angular/core';
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

  searchTerm = signal('');
  publicationDateTerm = signal('');

  @Output() editMovieEvent = new EventEmitter<number>();
  @Output() deleteMovieEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    this.loadMovies();
  }

  public loadMovies(): void {
    this.loading.set(true);
    this.error.set(null);

    if (this.publicationDateTerm()) {
      this.movieService
        .searchPeliculasByPublicationDate(this.publicationDateTerm())
        .subscribe({
          next: (data) => {
            this.movies.set(data);
            this.loading.set(false);
          },
          error: (err) => {
            console.error('Error al buscar peliculas por fecha:', err);
            this.error.set(err);
            this.loading.set(false);
          },
        });
    } else if (this.searchTerm()) {
      this.movieService.searchPeliculasByName(this.searchTerm()).subscribe({
        next: (data) => {
          this.movies.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error al buscar peliculas por nombre:', err);
          this.error.set(err);
          this.loading.set(false);
        },
      });
    } else {
      this.movieService.getAllPeliculas().subscribe({
        next: (data) => {
          this.movies.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar la lista de peliculas:', err);
          this.error.set(err);
          this.loading.set(false);
        },
      });
    }
  }

  onSearchInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
    if (this.publicationDateTerm()) {
      this.publicationDateTerm.set('');
    }
  }

  onSearchClick(): void {
    this.loadMovies();
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.loadMovies();
  }

  onPublicationDateInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.publicationDateTerm.set(inputElement.value);
    if (this.searchTerm()) {
      this.searchTerm.set('');
    }
  }

  onSearchDateClick(): void {
    this.loadMovies();
  }

  clearDateSearch(): void {
    this.publicationDateTerm.set('');
    this.loadMovies();
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
