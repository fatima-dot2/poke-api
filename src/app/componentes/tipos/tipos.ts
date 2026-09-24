import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service';

@Component({
  selector: 'app-tipos',
  imports: [],
  templateUrl: './tipos.html',
  styleUrl: './tipos.css'
})
export class Tipos {

  private pokemonService = inject(PokemonService);

  tipos: any[] = [];

  ngOnInit() {
    this.pokemonService.getTypes().subscribe((respuesta: any) => {
      console.log(respuesta);
      this.tipos = respuesta.results;
    });
  }

}