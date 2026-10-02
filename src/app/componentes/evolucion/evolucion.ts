import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon-service';

interface PokemonSpecies {
  name: string;
  evolution_chain: {
    url: string;
  } | null;
}

interface EvolutionDetail {
  min_level: number | null;
  min_happiness: number | null;
  time_of_day: string;
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
    url: string;
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
  templateUrl: './evolucion.html',
  styles: [`
    .carrusel {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      padding: 0.75rem 0.25rem;
      scrollbar-width: none;
    }
    .carrusel::-webkit-scrollbar { display: none; }

    .etiqueta {
      flex: 0 0 200px;
      scroll-snap-align: center;
      border: 2px solid #dee2e6;
      border-radius: 2rem;
      background: #fff;
      padding: 1rem;
      text-align: center;
      transition: transform .2s, box-shadow .2s;
    }
    .etiqueta:hover {
      transform: translateY(-4px);
      box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
    }
    .etiqueta-activa {
      border-color: #0d6efd;
      background: #e7f1ff;
    }
    .etiqueta img { width: 96px; height: 96px; }
  `]
})
export class Evolucion implements OnInit {

  @ViewChild('carrusel') carrusel?: ElementRef<HTMLElement>;

  nombrePokemon = '';
  pokemonBuscado = '';
  listaPokemon: string[] = [];

  evoluciones: {
    id: number;
    nombre: string;
    imagen: string;
    nivel: number | null;
    item: string | null;
    felicidad: number | null;
    momento: string;
    trigger: string;
  }[] = [];

  cargando = false;
  error = '';

  private http = inject(HttpClient);
  private pokemonService = inject(PokemonService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {

    this.pokemonService
      .getPokemonSpeciesList(250, 0)
      .subscribe({
        next: respuesta => {
          this.listaPokemon = respuesta.results.map(p => p.name);
          this.cdr.markForCheck();
        },
        error: () => {
          this.listaPokemon = [];
          this.cdr.markForCheck();
        }
      });
  }

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
    this.pokemonBuscado = '';
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
            this.cdr.markForCheck();
            return;
          }

          this.pokemonBuscado = especie.name;

          this.http
            .get<EvolutionChain>(especie.evolution_chain.url)
            .subscribe({

              next: cadena => {

                this.procesarCadena(cadena.chain);

                this.cargando = false;
                this.cdr.markForCheck();
              },

              error: () => {

                this.error =
                  'No se pudo obtener la cadena de evolución.';

                this.cargando = false;
                this.cdr.markForCheck();
              }

            });
        },

        error: () => {

          this.error = 'No se encontró el Pokémon.';

          this.cargando = false;
          this.cdr.markForCheck();
        }

      });
  }

  private procesarCadena(
    nodo: EvolutionNode
  ): void {

    const detalle = nodo.evolution_details?.[0];

    // El id viene al final de la URL: .../pokemon-species/133/
    const id = Number(
      nodo.species.url.split('/').filter(Boolean).pop()
    );

    this.evoluciones.push({
      id,
      nombre: nodo.species.name,
      imagen:
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      nivel: detalle?.min_level ?? null,
      item: detalle?.item?.name ?? null,
      felicidad: detalle?.min_happiness ?? null,
      momento: detalle?.time_of_day ?? '',
      trigger: detalle?.trigger?.name ?? 'inicio'
    });

    nodo.evolves_to.forEach(
      evolucion => this.procesarCadena(evolucion)
    );
  }

  desplazar(direccion: number): void {

    this.carrusel?.nativeElement.scrollBy({
      left: direccion * 220,
      behavior: 'smooth'
    });
  }

  limpiar(): void {

    this.nombrePokemon = '';
    this.pokemonBuscado = '';
    this.evoluciones = [];
    this.error = '';
  }

  trackByEvolucion(index: number, evolucion: {
    id: number;
    nombre: string;
    imagen: string;
    nivel: number | null;
    item: string | null;
    felicidad: number | null;
    momento: string;
    trigger: string;
  }): number {
    return evolucion.id;
  }
}