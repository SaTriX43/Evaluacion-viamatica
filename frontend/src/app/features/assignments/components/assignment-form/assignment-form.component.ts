// frontend/src/app/features/assignments/components/assignment-form/assignment-form.component.ts
import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AssignmentService } from '../../services/assignment.service';
import { MovieService } from '../../../../features/movies/services/movie.service';
import { RoomService } from '../../../../features/rooms/services/room.service'; 

import { AsignacionPayload } from '../../models/assignments';
import { Pelicula } from '../../../../features/movies/models/movies';
import { SalaCine } from '../../../../features/rooms/models/rooms'; 

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-assignment-form', 
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './assignment-form.component.html',
})
export class AssignmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private assignmentService = inject(AssignmentService);
  private movieService = inject(MovieService); 
  private roomService = inject(RoomService); 

  assignmentForm: FormGroup;

  movies = signal<Pelicula[]>([]);
  rooms = signal<SalaCine[]>([]);

  loadingLists = signal(true);
  loadingError = signal<any>(null); 
  submitting = signal(false);
  submitError = signal<any>(null); 
  submitSuccess = signal(false); 


  constructor() {
    this.assignmentForm = this.fb.group({
      id_pelicula: [null, Validators.required], 
      id_sala_cine: [null, Validators.required], 
      fecha_publicacion: ['', Validators.required], 
      fecha_fin: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadMoviesAndRooms();
  }

  loadMoviesAndRooms(): void {
      this.loadingLists.set(true);
      this.loadingError.set(null);

      forkJoin({
          movies: this.movieService.getAllPeliculas(),
          rooms: this.roomService.getAllSalasCine()
      }).subscribe({
          next: (results) => {
              this.movies.set(results.movies); 
              this.rooms.set(results.rooms); 
              this.loadingLists.set(false); 
          },
          error: (err) => {
              console.error('Error al cargar listas de peliculas/salas:', err);
              this.loadingError.set(err); 
              this.loadingLists.set(false); 
          }
      });
  }



  onSubmit(): void {
    if (this.assignmentForm.valid) {
      this.submitting.set(true); // Inicia estado de envio
      this.submitError.set(null); // Resetea estado de error
      this.submitSuccess.set(false); // Resetea estado de exito

      const assignmentData: AsignacionPayload = this.assignmentForm.value; 


      this.assignmentService.createAssignment(assignmentData).subscribe({
        next: (response) => {
          console.log('Asignacion creada con exito:', response);
          this.submitting.set(false); // Finaliza estado de envio
          this.submitSuccess.set(true); // Establece estado de exito
          this.assignmentForm.reset(); // Opcional: Resetea el formulario despues de guardar
        },
        error: (error) => {
          console.error('Error al crear asignacion:', error);
          this.submitting.set(false); // Finaliza estado de envio
          this.submitError.set(error); // Guarda el error
        }
      });
    } else {
      this.assignmentForm.markAllAsTouched();
      console.log('Formulario invalido. No se puede guardar.');
    }
  }
}