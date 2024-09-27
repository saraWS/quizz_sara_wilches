import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registrar-materias',
    loadComponent: () => import('./registrar-materias/registrar-materias.page').then( m => m.RegistrarMateriasPage)
  },
  {
    path: 'materia-detalle',
    loadComponent: () => import('./materia-detalle/materia-detalle.page').then( m => m.MateriaDetallePage)
  },
  {
    path: 'agregar-notas',
    loadComponent: () => import('./agregar-notas/agregar-notas.page').then( m => m.AgregarNotasPage)
  },
];
