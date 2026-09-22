import { Routes } from '@angular/router';
import { Especies } from './componentes/especies/especies';
import { Habilidades } from './componentes/habilidades/habilidades';

export const routes: Routes = [
    {
        path: 'habilidades',
        component: Habilidades
    },

    {
        path: 'especies',
        component: Especies
    }
];
