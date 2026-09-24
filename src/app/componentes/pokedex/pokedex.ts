import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './pokedex.html'
})
export class PokedexComponent {

  pokemones: any[] = [];
  pokemonBuscado = '';
  cargando = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.cargarPokemones();
  }

  cargarPokemones(): void {
    this.cargando = true;
    this.pokemonService.obtenerPokemones(20, 0).subscribe({
      next: ( respuesta ) => {

        this.pokemones = respuesta.results;
        this.cargando = false;

      },
      error: () => {
        this.cargando = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los Pokémon.'
        });

      }
    });
  }

  buscarPokemon(): void {

    if (!this.pokemonBuscado.trim()) {

      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Escribe el nombre de un Pokémon.'
      });

      return;
    }

    this.cargando = true;
    this.pokemonService
      .obtenerPokemon(this.pokemonBuscado)
      .subscribe({

        next: (pokemon) => {

          this.pokemones = [pokemon];
          this.cargando = false;

        },

        error: () => {

          this.cargando = false;
          this.pokemones = [];

          Swal.fire({
            icon: 'error',
            title: 'Pokémon no encontrado',
            text: 'No encontramos ese Pokémon. Verifica el nombre.'
          });

        }

      });

  }

  obtenerNumero(url: string): number {
    const partes = url.split('/');
    return Number(partes[partes.length - 2]);

  }

}