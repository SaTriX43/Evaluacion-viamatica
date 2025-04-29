// frontend/src/app/features/movies/components/movie-form/movie-form.component.ts
import { Component, EventEmitter, Output, inject, Input, OnInit } from '@angular/core'; // Importa Input y OnInit
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../services/movie.service';
import { Pelicula } from '../../../models/movies'; // Importa la interfaz Pelicula

@Component({
  selector: 'movie-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './movie-form.component.html',
})


export class MovieFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);

  @Input() movieId: number | null = null;
  @Output() formClosed = new EventEmitter<void>();

  movieForm: FormGroup;

  constructor() {
    this.movieForm = this.fb.group({
      nombre: ['', Validators.required],
      duracion: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    if (this.movieId !== null) {
      this.movieService.getPeliculaById(this.movieId).subscribe({
        next: (pelicula) => {
          this.movieForm.patchValue({
            nombre: pelicula.nombre,
            duracion: pelicula.duracion
          });
        },
        error: (err) => {
          console.error('Error al cargar datos de la pelicula para edicion:', err);
          this.onCancel();
        }
      });
    }
  }


  onSubmit(): void {
    if (this.movieForm.valid) {
      const movieData = this.movieForm.value;

      if (this.movieId === null) {
        this.movieService.createPelicula(movieData).subscribe({
          next: (response) => {
            console.log('Pelicula creada con exito:', response);
            this.formClosed.emit();
          },
          error: (error) => {
            console.error('Error al crear pelicula:', error);
          }
        });
      } else {
        this.movieService.updatePelicula(this.movieId, movieData).subscribe({
           next: (response) => {
            console.log('Pelicula actualizada con exito:', response);
            this.formClosed.emit(); 
          },
          error: (error) => {
            console.error('Error al actualizar pelicula:', error);
          }
        });
      }

    } else {
      this.movieForm.markAllAsTouched();
      console.log('Formulario invalido. No se puede guardar.');
    }
  }

  onCancel(): void {
    this.formClosed.emit(); 
  }
}