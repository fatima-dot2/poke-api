import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service';

@Component({
  selector: 'app-generaciones',
  imports: [],
  templateUrl: './generaciones.html',
  styleUrl: './generaciones.css'
})
export class Generaciones {

  private pokemonService = inject(PokemonService);

  generaciones: any[] = [];

  ngOnInit() {
    this.pokemonService.getGenerations().subscribe((respuesta: any) => {
      console.log(respuesta);
      this.generaciones = respuesta.results;
    });
  }

}