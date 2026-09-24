import  {Routes} from '@angular/router';
import { PokedexComponent } from './componentes/pokedex/pokedex';

export const routes: Routes = [
  {
    path: 'pokedex',
    component: PokedexComponent
  },
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full'
  }
];