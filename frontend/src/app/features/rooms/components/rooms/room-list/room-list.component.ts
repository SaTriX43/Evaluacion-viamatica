// frontend/src/app/features/rooms/components/room-list/room-list.component.ts
import { Component, OnInit, inject, signal, WritableSignal, Output, EventEmitter } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { SalaCine, SalaCineStatus } from '../../../models/rooms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'room-list-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './room-list.component.html',
})
export class RoomListComponent implements OnInit {
  private roomService = inject(RoomService);

  salas: WritableSignal<SalaCine[]> = signal([]);
  loading = signal(true);
  error = signal<any>(null);

  searchTerm = signal('');

  @Output() editRoomEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.loadSalas();
  }

  public loadSalas(): void {
    this.loading.set(true);
    this.error.set(null);

    if (this.searchTerm()) {
      this.roomService.searchSalasCineByName(this.searchTerm()).subscribe({
        next: (data) => {
          this.salas.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error al buscar salas por nombre:', err);
          this.error.set(err);
          this.loading.set(false);
        }
      });
    } else {
      this.roomService.getAllSalasCine()
      .subscribe({
        next: (data) => {
          this.salas.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar la lista de salas:', err);
          this.error.set(err);
          this.loading.set(false);
        }
      });
    }
  }

  onSearchInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  onSearchClick(): void {
    this.loadSalas();
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.loadSalas();
  }

  onEditClick(id: number): void {
    this.editRoomEvent.emit(id);
  }

  onViewStatusClick(id: number): void {
    console.log('Obteniendo estado para sala con ID:', id);
    this.roomService.getSalaCineStatus(id).subscribe({
      next: (statusData) => {
        console.log('Estado Calculado:', statusData.estado_calculado);
        alert(`Estado Calculado para Sala ${statusData.nombre}: ${statusData.estado_calculado}`);
      },
      error: (err) => {
        console.error('Error al obtener estado de la sala:', err);
      }
    });
  }
}