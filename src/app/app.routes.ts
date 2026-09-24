import { Routes } from '@angular/router';

import { ListaPokemon } from './componentes/lista-pokemon/lista-pokemon';
import { DetallePokemon } from './componentes/detalle-pokemon/detalle-pokemon';

export const routes: Routes = [

  {
    path: '',
    component: ListaPokemon
  },

  {
    path: 'pokemon/:id',
    component: DetallePokemon
  }

];