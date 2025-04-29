// frontend/src/app/features/rooms/components/room-list/room-list.component.ts
import { Component, OnInit, inject, signal, WritableSignal, Output, EventEmitter } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { SalaCine } from '../../../models/rooms';
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

  @Output() editRoomEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.loadSalas();
  }

  public loadSalas(): void {
      this.loading.set(true);
      this.error.set(null);

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

  onEditClick(id: number): void {
      this.editRoomEvent.emit(id);
  }

}