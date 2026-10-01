import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PokedexData {
  id: number;
  name: string;
  is_main_series: boolean;

  descriptions: {
    description: string;
    language: {
      name: string;
    };
  }[];

  pokemon_entries: {
    entry_number: number;
    pokemon_species: {
      name: string;
    };
  }[];

  region: {
    name: string;
  } | null;
}

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './pokedex.html'
})
export class Pokedex implements OnInit {

  nombrePokedex = '';
<<<<<<< HEAD

  pokedex: PokedexData | null = null;

  cargando = false;

  error = '';

  constructor(private http: HttpClient) {}

=======
  pokedex: PokedexData | null = null;
  cargando = false;
  error = '';

  pageSize = 10;
  paginaActual = 1;

  constructor(private http: HttpClient) {}

  get pokemonEntriesPaginados(): { entry_number: number; pokemon_species: { name: string } }[] {
    return this.paginar(this.pokedex?.pokemon_entries ?? [], this.paginaActual);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil((this.pokedex?.pokemon_entries?.length ?? 0) / this.pageSize));
  }

>>>>>>> dbd9ab7 (ultimos detalles)
  ngOnInit(): void {
    this.buscarPokedex('national');
  }

  buscarPokedex(nombre?: string): void {
<<<<<<< HEAD

    const nombreBusqueda = (
      nombre ?? this.nombrePokedex
    ).trim().toLowerCase();
=======
    const nombreBusqueda = (nombre ?? this.nombrePokedex).trim().toLowerCase();
>>>>>>> dbd9ab7 (ultimos detalles)

    if (!nombreBusqueda) {
      this.error = 'Escribe el nombre de una Pokédex.';
      this.pokedex = null;
      return;
    }

    this.cargando = true;
    this.error = '';
    this.pokedex = null;

    this.http
<<<<<<< HEAD
      .get<PokedexData>(
        `https://pokeapi.co/api/v2/pokedex/${nombreBusqueda}`
      )
      .subscribe({

        next: (data) => {

          this.pokedex = data;

          this.nombrePokedex = data.name;

          this.cargando = false;

        },

        error: () => {

          this.error = 'No se encontró la Pokédex.';

          this.pokedex = null;

          this.cargando = false;

        }

      });
  }

  limpiar(): void {

    this.nombrePokedex = '';

    this.pokedex = null;

    this.error = '';

=======
      .get<PokedexData>(`https://pokeapi.co/api/v2/pokedex/${nombreBusqueda}`)
      .subscribe({
        next: (data) => {
          this.pokedex = data;
          this.nombrePokedex = data.name;
          this.paginaActual = 1;
          this.cargando = false;
        },
        error: () => {
          this.error = 'No se encontró la Pokédex.';
          this.pokedex = null;
          this.cargando = false;
        }
      });
  }

  private paginar<T>(items: T[], pagina: number): T[] {
    const inicio = (pagina - 1) * this.pageSize;
    return items.slice(inicio, inicio + this.pageSize);
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = Math.min(Math.max(1, pagina), this.totalPaginas);
  }

  limpiar(): void {
    this.nombrePokedex = '';
    this.pokedex = null;
    this.error = '';
>>>>>>> dbd9ab7 (ultimos detalles)
  }
}