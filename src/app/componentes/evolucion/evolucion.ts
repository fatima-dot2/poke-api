import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface PokemonEvolution {
  name: string;
  id: number;
  image: string;
}

@Component({
  selector: 'app-evolucion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evolucion.html'
})
export class Evolucion {

  pokemonName: string = '';
  evoluciones: PokemonEvolution[] = [];
  cargando: boolean = false;

  private http = inject(HttpClient);

  private apiUrl = 'https://pokeapi.co/api/v2';

  buscarEvoluciones(): void {

    const nombre = this.pokemonName.trim().toLowerCase();

    if (!nombre) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Escribe el nombre de un Pokémon.'
      });
      return;
    }

    this.cargando = true;
    this.evoluciones = [];

    this.http
      .get<any>(`${this.apiUrl}/pokemon-species/${nombre}`)
      .subscribe({
        next: (pokemon) => {

          this.http
            .get<any>(pokemon.evolution_chain.url)
            .subscribe({
              next: (cadena) => {
                this.obtenerEvoluciones(cadena.chain);
                this.cargando = false;
              },
              error: () => {
                this.mostrarError();
              }
            });

        },
        error: () => {
          this.mostrarError();
        }
      });
  }

  private obtenerEvoluciones(cadena: any): void {

    this.evoluciones = [];

    let actual = cadena;

    while (actual) {

      const url = actual.species.url;

      const id = Number(
        url.split('/').filter(Boolean).pop()
      );

      this.evoluciones.push({
        name: actual.species.name,
        id: id,
        image:
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      });

      if (actual.evolves_to && actual.evolves_to.length > 0) {
        actual = actual.evolves_to[0];
      } else {
        actual = null;
      }
    }
  }

  private mostrarError(): void {

    this.cargando = false;

    Swal.fire({
      icon: 'error',
      title: 'Pokémon no encontrado',
      text: 'Verifica el nombre del Pokémon e inténtalo nuevamente.'
    });
  }
}