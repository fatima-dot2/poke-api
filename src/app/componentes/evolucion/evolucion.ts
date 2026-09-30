import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PokemonSpecies {
  evolution_chain: {
    url: string;
  } | null;
}

interface EvolutionDetail {
  min_level: number | null;
  item: {
    name: string;
  } | null;
  trigger: {
    name: string;
  };
}

interface EvolutionNode {
  species: {
    name: string;
  };
  evolves_to: EvolutionNode[];
  evolution_details: EvolutionDetail[];
}

interface EvolutionChain {
  chain: EvolutionNode;
}

@Component({
  selector: 'app-evolucion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evolucion.html'
})
export class Evolucion {

  nombrePokemon = '';
  evoluciones: {
    nombre: string;
    nivel: number | null;
    item: string | null;
    trigger: string;
  }[] = [];

  cargando = false;
  error = '';

  constructor(private http: HttpClient) {}

  buscarEvolucion(nombre?: string): void {

    const nombreBusqueda = (
      nombre ?? this.nombrePokemon
    ).trim().toLowerCase();

    if (!nombreBusqueda) {
      this.error = 'Escribe el nombre de un Pokémon.';
      this.evoluciones = [];
      return;
    }

    this.cargando = true;
    this.error = '';
    this.evoluciones = [];
    this.nombrePokemon = nombreBusqueda;

    this.http
      .get<PokemonSpecies>(
        `https://pokeapi.co/api/v2/pokemon-species/${nombreBusqueda}`
      )
      .subscribe({

        next: especie => {

          if (!especie.evolution_chain) {
            this.error = 'Este Pokémon no tiene una cadena de evolución.';
            this.cargando = false;
            return;
          }

          this.http
            .get<EvolutionChain>(especie.evolution_chain.url)
            .subscribe({

              next: cadena => {

                this.procesarCadena(cadena.chain);

                this.cargando = false;
              },

              error: () => {

                this.error =
                  'No se pudo obtener la cadena de evolución.';

                this.cargando = false;
              }

            });
        },

        error: () => {

          this.error = 'No se encontró el Pokémon.';

          this.cargando = false;
        }

      });
  }

  private procesarCadena(
    nodo: EvolutionNode
  ): void {

    const detalle = nodo.evolution_details?.[0];

    this.evoluciones.push({
      nombre: nodo.species.name,
      nivel: detalle?.min_level ?? null,
      item: detalle?.item?.name ?? null,
      trigger: detalle?.trigger?.name ?? 'inicio'
    });

    nodo.evolves_to.forEach(
      evolucion => this.procesarCadena(evolucion)
    );
  }

  limpiar(): void {

    this.nombrePokemon = '';
    this.evoluciones = [];
    this.error = '';
  }
}