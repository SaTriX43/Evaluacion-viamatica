// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { MoviesComponent } from './features/movies/components/movies/movies.component';
import { RoomsComponent } from './features/rooms/components/rooms/rooms.component';
import { AssignmentFormComponent } from './features/assignments/components/assignment-form/assignment-form.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'assign', component: AssignmentFormComponent },
      { path: '**', redirectTo: 'dashboard' },
    ]
  },
];