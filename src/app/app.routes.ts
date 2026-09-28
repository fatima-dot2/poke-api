import { Routes } from '@angular/router';

import { Inicio } from './componentes/inicio/inicio';
import { Evolucion } from './componentes/evolucion/evolucion';
import { Regiones } from './componentes/regiones/regiones';
import { Habilidades } from './componentes/habilidades/habilidades';
import { Movimientos } from './componentes/movimientos/movimientos';
import { Tipos } from './componentes/tipos/tipos';
import { Especies } from './componentes/especies/especies';
import { ListaPokemon } from './componentes/lista-pokemon/lista-pokemon';
import { Pokedex } from './componentes/pokedex/pokedex';

export const routes: Routes = [
  {
    path: '',
    component: Inicio
  },
  {
    path: 'pokemon',
    component: ListaPokemon
  },
  {
    path: 'habilidades',
    component: Habilidades
  },
  {
    path: 'movimientos',
    component: Movimientos
  },
  {
    path: 'tipos',
    component: Tipos
  },
  {
    path: 'especies',
    component: Especies
  },
  {
    path: 'regiones',
    component: Regiones
  },
  {
    path: 'pokedex',
    component: Pokedex
  },
  {
    path: 'evoluciones',
    component: Evolucion
  }
];