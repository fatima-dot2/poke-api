import { Routes } from '@angular/router';
import { Especies } from './componentes/especies/especies';
import { Habilidades } from './componentes/habilidades/habilidades';
import { Inicio } from './componentes/inicio/inicio';
import { Tipos } from './componentes/tipos/tipos';
import { Generaciones } from './componentes/generaciones/generaciones';

export const routes: Routes = [

  {
    path: '',
    component: Inicio
  },

  {
    path: 'habilidades',
    component: Habilidades
  },

  {
    path: 'especies',
    component: Especies
  },

  {
    path: 'tipos',
    component: Tipos
  },

  {
    path: 'generaciones',
    component: Generaciones
  }

];