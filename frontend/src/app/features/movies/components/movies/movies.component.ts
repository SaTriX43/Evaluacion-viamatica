// frontend/src/app/features/movies/components/movies/movies.component.ts
import { Component, ChangeDetectionStrategy, inject, signal, ViewChild } from '@angular/core'; // Importa ViewChild
import { MovieListComponent } from "../../components/movies/movie-list/movie-list.component";
import { MovieFormComponent } from "../../components/movies/movie-form/movie-form.component"; 
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service'; // Importa el MovieService

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieListComponent, MovieFormComponent, CommonModule],
  templateUrl: './movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent {
  private movieService = inject(MovieService); 
  editingMovieId = signal<number | null>(null);

  @ViewChild(MovieListComponent) movieListComponent!: MovieListComponent;


  openCreateForm(): void {
    this.editingMovieId.set(null); 
  }

  
  openEditForm(id: number): void {
    this.editingMovieId.set(id); 
  }

  handleDeleteMovie(id: number): void {
    this.movieService.logicalDeletePelicula(id).subscribe({
      next: () => {
        console.log('Pelicula eliminada logicamente:', id);
        this.movieListComponent?.loadMovies();
      },
      error: (err) => {
        console.error('Error al eliminar pelicula logicamente:', err);
      }
    });
  }


  handleFormClosed(): void {
    this.editingMovieId.set(null); // Oculta el formulario (establece el ID a null)
    this.movieListComponent?.loadMovies(); // Llama al metodo publico del componente hijo para recargar la lista
  }
}





