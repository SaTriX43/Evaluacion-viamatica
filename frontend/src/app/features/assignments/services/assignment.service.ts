// frontend/src/app/features/assignments/services/assignment.service.ts
import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { AsignacionPayload, Asignacion } from '../models/assignments';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiService = inject(ApiService);

  createAssignment(assignment: AsignacionPayload): Observable<Asignacion> {
    return this.apiService.post<Asignacion>('/asignaciones', assignment);
  }
}