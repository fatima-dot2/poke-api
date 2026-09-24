import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon-service';

@Component({
  selector: 'app-lista-pokemon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-pokemon.html'
})
export class ListaPokemon implements OnInit {

  pokemones: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.obtenerPokemones();
  }

  obtenerPokemones(): void {
    this.pokemonService.getPokemonList().subscribe({
      next: (data: any) => {
        this.pokemones = data.results;
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }

  obtenerId(url: string): string {
    const partes = url.split('/');
    return partes[partes.length - 2];
  }
}