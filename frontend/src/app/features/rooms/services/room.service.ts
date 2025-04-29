// frontend/src/app/features/rooms/services/room.service.ts
import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { SalaCine, SalaCineStatus } from '../models/rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiService = inject(ApiService);

  getAllSalasCine(): Observable<SalaCine[]> {
    return this.apiService.get<SalaCine[]>('/salas');
  }

  getSalaCineById(id: number): Observable<SalaCine> {
    return this.apiService.get<SalaCine>(`/salas/${id}`);
  }

  createSalaCine(sala: { nombre: string; estado: string }): Observable<any> {
    return this.apiService.post('/salas', sala);
  }

  updateSalaCine(id: number, sala: { nombre: string; estado: string }): Observable<any> {
    return this.apiService.put(`/salas/${id}`, sala);
  }

  searchSalasCineByName(name: string): Observable<SalaCine[]> {
      return this.apiService.get<SalaCine[]>(`/salas/buscarPorNombre?nombre=${name}`);
  }

  getSalaCineStatus(id: number): Observable<SalaCineStatus> {
      return this.apiService.get<SalaCineStatus>(`/salas/status/${id}`);
  }

}