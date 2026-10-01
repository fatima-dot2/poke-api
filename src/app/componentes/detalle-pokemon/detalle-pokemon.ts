import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PokemonLista {
  name: string;
  url: string;
}

interface PokemonResponse {
  count: number;
  results: PokemonLista[];
}

interface PokemonDetalle {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
}

@Component({
  selector: 'app-detalle-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-pokemon.html'
})
export class DetallePokemon implements OnInit {

  private http = inject(HttpClient);

  listaPokemon: PokemonLista[] = [];
  pokemonFiltrados: PokemonLista[] = [];

  pokemon: PokemonDetalle | null = null;

  busqueda = '';

  cargandoLista = false;
  cargandoDetalle = false;

  error = '';

  ngOnInit(): void {
    this.cargarPokemon();
  }

  cargarPokemon(): void {

    this.cargandoLista = true;
    this.error = '';

    this.http
      .get<PokemonResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=2000'
      )
      .subscribe({

        next: data => {

          this.listaPokemon = data.results;
          this.pokemonFiltrados = data.results;

          this.cargandoLista = false;

        },

        error: () => {

          this.error = 'No se pudo cargar la lista de Pokémon.';
          this.cargandoLista = false;

        }

      });
  }

  filtrarPokemon(): void {

    const texto = this.busqueda
      .trim()
      .toLowerCase();

    if (!texto) {

      this.pokemonFiltrados = this.listaPokemon;

      return;
    }

    this.pokemonFiltrados =
      this.listaPokemon.filter(pokemon =>
        pokemon.name.includes(texto)
      );
  }

  seleccionarPokemon(nombre: string): void {

    this.cargandoDetalle = true;
    this.error = '';

    this.http
      .get<PokemonDetalle>(
        `https://pokeapi.co/api/v2/pokemon/${nombre}`
      )
      .subscribe({

        next: data => {

          this.pokemon = data;
          this.cargandoDetalle = false;

        },

        error: () => {

          this.error =
            'No se pudo obtener la información del Pokémon.';

          this.pokemon = null;
          this.cargandoDetalle = false;

        }

      });
  }

  limpiarBusqueda(): void {

    this.busqueda = '';
    this.pokemonFiltrados = this.listaPokemon;
    this.pokemon = null;
    this.error = '';

  }

  obtenerImagen(): string {

    return (
      this.pokemon
        ?.sprites
        .other?.['official-artwork']
        ?.front_default
      ??
      this.pokemon?.sprites.front_default
      ??
      ''
    );

  }
}