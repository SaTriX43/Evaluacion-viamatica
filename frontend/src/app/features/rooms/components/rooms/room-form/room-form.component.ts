// frontend/src/app/features/rooms/components/room-form/room-form.component.ts
import { Component, EventEmitter, Output, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../../services/room.service';
import { SalaCine } from '../../../models/rooms';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './room-form.component.html',
})
export class RoomFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private roomService = inject(RoomService);

  @Input() roomId: number | null = null;

  @Output() formClosed = new EventEmitter<void>();

  roomForm: FormGroup;

  constructor() {
    this.roomForm = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['', Validators.required] // Campo estado
    });
  }

  ngOnInit(): void {
    if (this.roomId !== null) {
      this.roomService.getSalaCineById(this.roomId).subscribe({
        next: (sala) => {
          this.roomForm.patchValue({
            nombre: sala.nombre,
            estado: sala.estado
          });
        },
        error: (err) => {
          console.error('Error al cargar datos de la sala para edicion:', err);
          this.onCancel();
        }
      });
    }
  }


  onSubmit(): void {
    if (this.roomForm.valid) {
      const roomData = this.roomForm.value;

      if (this.roomId === null) {
        // Modo Creacion
        this.roomService.createSalaCine(roomData).subscribe({
          next: (response) => {
            console.log('Sala creada con exito:', response);
            this.formClosed.emit();
          },
          error: (error) => {
            console.error('Error al crear sala:', error);
          }
        });
      } else {
        // Modo Edicion
        this.roomService.updateSalaCine(this.roomId, roomData).subscribe({
           next: (response) => {
            console.log('Sala actualizada con exito:', response);
            this.formClosed.emit();
          },
          error: (error) => {
            console.error('Error al actualizar sala:', error);
          }
        });
      }

    } else {
      this.roomForm.markAllAsTouched();
      console.log('Formulario invalido. No se puede guardar.');
    }
  }

  onCancel(): void {
    this.formClosed.emit();
  }
}