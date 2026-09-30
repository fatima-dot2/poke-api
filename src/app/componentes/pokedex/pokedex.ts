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

  pokedex: PokedexData | null = null;

  cargando = false;

  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarPokedex('national');
  }

  buscarPokedex(nombre?: string): void {

    const nombreBusqueda = (
      nombre ?? this.nombrePokedex
    ).trim().toLowerCase();

    if (!nombreBusqueda) {
      this.error = 'Escribe el nombre de una Pokédex.';
      this.pokedex = null;
      return;
    }

    this.cargando = true;
    this.error = '';
    this.pokedex = null;

    this.http
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

  }
}