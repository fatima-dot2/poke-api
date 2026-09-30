import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface GenerationData {
  id: number;
  name: string;

  main_region: {
    name: string;
  };

  pokemon_species: {
    name: string;
  }[];

  abilities: {
    name: string;
  }[];

  moves: {
    name: string;
  }[];

  types: {
    name: string;
  }[];

  version_groups: {
    name: string;
  }[];
}

@Component({
  selector: 'app-generaciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './generaciones.html'
})
export class Generaciones implements OnInit {

  nombreGeneracion = '';

  generacion: GenerationData | null = null;

  cargando = false;

  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarGeneracion('generation-i');
  }

  buscarGeneracion(nombre?: string): void {

    const nombreBusqueda = (
      nombre ?? this.nombreGeneracion
    ).trim().toLowerCase();

    if (!nombreBusqueda) {
      this.error = 'Escribe el nombre de una generación.';
      this.generacion = null;
      return;
    }

    this.cargando = true;
    this.error = '';
    this.generacion = null;

    this.http
      .get<GenerationData>(
        `https://pokeapi.co/api/v2/generation/${nombreBusqueda}`
      )
      .subscribe({

        next: (data) => {

          this.generacion = data;

          this.nombreGeneracion = data.name;

          this.cargando = false;

        },

        error: () => {

          this.error = 'No se encontró la generación.';

          this.generacion = null;

          this.cargando = false;

        }

      });
  }

  limpiar(): void {

    this.nombreGeneracion = '';

    this.generacion = null;

    this.error = '';

  }
}