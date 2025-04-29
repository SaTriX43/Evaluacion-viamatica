// frontend/src/app/features/dashboard/components/dashboard/dashboard.component.ts
import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core'; // Importa signal y WritableSignal
import { DashboardService } from '../../services/dashboard.service';
import { DashboardIndicators } from '../../models/dashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit { 
  private dashboardService = inject(DashboardService);

  indicators: WritableSignal<DashboardIndicators | null> = signal(null);

  constructor() { }

  ngOnInit(): void {
    this.dashboardService.getDashboardIndicators()
      .subscribe({
        next: (data) => {
          this.indicators.set(data);
        },
        error: (err) => {
          console.error('Error al cargar indicadores del dashboard:', err);
          this.indicators.set(null);
        }
      });
    }
  }