import { Routes } from '@angular/router';
import { Especies } from './componentes/especies/especies';
import { Habilidades } from './componentes/habilidades/habilidades';
import { Inicio } from './componentes/inicio/inicio';

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
    }
];
