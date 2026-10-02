import { Routes } from '@angular/router';
import { Especies } from './componentes/especies/especies';
import { Habilidades } from './componentes/habilidades/habilidades';
import { Inicio } from './componentes/inicio/inicio';
import { Evolucion } from './componentes/evolucion/evolucion';
import { Generaciones } from './componentes/generaciones/generaciones';
import { Movimientos } from './componentes/movimientos/movimientos';
import { Pokedex } from './componentes/pokedex/pokedex';
import { Regiones } from './componentes/regiones/regiones';
import { Tipos  } from './componentes/tipos/tipos';
import {PokeApi} from './componentes/poke-api/poke-api'
import { DetallePokemon } from './componentes/detalle-pokemon/detalle-pokemon';

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
    path:'evolucion',
    component:Evolucion
  },
  {
    path:'generaciones',
    component:Generaciones
  },
{
  path: 'movimientos',
  component: Movimientos
},
  {
    path:'pokedex',
    component:Pokedex
  },
  {
    path:'regiones',
    component:Regiones
  },
  {
    path:'tipos',
    component:Tipos
  },
  {
    path:'pokemon',
    component:PokeApi
  },
{
  path: 'detalle-pokemon',
  component: DetallePokemon
}
];