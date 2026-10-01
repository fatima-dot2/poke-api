import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
=======
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { PokemonService } from '../../services/pokemon-service';
>>>>>>> dbd9ab7 (ultimos detalles)

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

<<<<<<< HEAD
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

=======
  private pokemonService = inject(PokemonService);
  private readonly busquedaSubject = new Subject<string>();

  listaPokemon: PokemonLista[] = [];
  pokemonFiltrados: PokemonLista[] = [];
  pokemon: PokemonDetalle | null = null;

  busqueda = '';
  cargandoLista = false;
  cargandoDetalle = false;
  error = '';

  pageSize = 10;
  paginaActual = 1;

  get pokemonPaginados(): PokemonLista[] {
    const inicio = (this.paginaActual - 1) * this.pageSize;
    return this.pokemonFiltrados.slice(inicio, inicio + this.pageSize);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.pokemonFiltrados.length / this.pageSize));
  }

  ngOnInit(): void {
    this.busquedaSubject
      .pipe(
        debounceTime(250),
        map(value => value.trim()),
        map(value => PokemonService.normalizeText(value)),
        distinctUntilChanged(),
        filter(value => value.length >= 2),
        switchMap(value => {
          this.cargandoLista = true;
          this.error = '';

          return this.pokemonService
            .getPokemonList(1000, 0)
            .pipe(
              map(data => data.results.filter(pokemon =>
                PokemonService.matchesLocalizedText(
                  PokemonService.toSpanishPokemonName(pokemon.name),
                  value
                )
              ))
            );
        })
      )
      .subscribe({
        next: resultados => {
          this.listaPokemon = resultados;
          this.pokemonFiltrados = resultados;
          this.paginaActual = 1;
          this.cargandoLista = false;
        },
        error: () => {
          this.error = 'No se pudo cargar la lista de Pokémon.';
          this.cargandoLista = false;
        }
>>>>>>> dbd9ab7 (ultimos detalles)
      });
  }

  filtrarPokemon(): void {
<<<<<<< HEAD

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

=======
    const texto = this.busqueda.trim();

    if (!texto) {
      this.listaPokemon = [];
      this.pokemonFiltrados = [];
      this.paginaActual = 1;
      this.error = '';
      this.pokemon = null;
      return;
    }

    this.busquedaSubject.next(this.busqueda);
  }

  seleccionarPokemon(nombre: string): void {
    this.pokemon = null;
    this.cargandoDetalle = true;
    this.error = '';

    this.pokemonService
      .getPokemonById(nombre)
      .subscribe({
        next: data => {
          this.pokemon = data;
          this.cargandoDetalle = false;
        },
        error: () => {
          this.error = 'No se pudo obtener la información del Pokémon.';
          this.pokemon = null;
          this.cargandoDetalle = false;
        }
      });
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = Math.min(
      Math.max(1, pagina),
      this.totalPaginas
    );
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
    this.listaPokemon = [];
    this.pokemonFiltrados = [];
    this.paginaActual = 1;
    this.pokemon = null;
    this.error = '';
  }

  obtenerImagen(): string {
    return (
      this.pokemon?.sprites.other?.['official-artwork']?.front_default
      ?? this.pokemon?.sprites.front_default
      ?? ''
    );
  }

  obtenerNombrePokemon(nombre: string): string {
    return PokemonService.toSpanishPokemonName(nombre);
  }

  obtenerNombreTipo(nombre: string): string {
    return PokemonService.toSpanishTypeName(nombre);
  }

  trackByPokemonName(index: number, pokemon: PokemonLista): string {
    return pokemon.name;
>>>>>>> dbd9ab7 (ultimos detalles)
  }
}