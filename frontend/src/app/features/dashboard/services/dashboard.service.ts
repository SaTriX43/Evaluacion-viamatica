// frontend/src/app/features/dashboard/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { DashboardIndicators } from '../models/dashboard'; // Importa la interfaz de tu archivo dashboard.ts

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) { }

  getDashboardIndicators(): Observable<DashboardIndicators> {
    return this.apiService.get<DashboardIndicators>('/dashboard/indicadores');
  }
}