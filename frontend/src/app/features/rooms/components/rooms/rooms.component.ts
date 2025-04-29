// frontend/src/app/features/rooms/components/rooms/rooms.component.ts
import { Component, ChangeDetectionStrategy, inject, signal, ViewChild } from '@angular/core';
import { RoomListComponent } from '../../components/rooms/room-list/room-list.component';
import { RoomFormComponent } from '../../components/rooms/room-form/room-form.component';
import { CommonModule } from '@angular/common';

type RoomScreenMode = 'list' | 'create' | 'edit';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RoomListComponent, RoomFormComponent, CommonModule],
  templateUrl: './rooms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
  mode = signal<RoomScreenMode>('list'); 
  editingRoomId = signal<number | null>(null);

  @ViewChild(RoomListComponent) roomListComponent!: RoomListComponent;
  openCreateForm(): void {
    this.editingRoomId.set(null); 
    this.mode.set('create');
  }

  openEditForm(id: number): void {
    this.editingRoomId.set(id); 
    this.mode.set('edit'); 
  }


  handleFormClosed(): void {
    this.editingRoomId.set(null);
    this.mode.set('list')

    this.roomListComponent?.loadSalas(); 
  }

}

 