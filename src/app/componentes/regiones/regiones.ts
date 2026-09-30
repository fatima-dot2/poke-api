
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface RegionData {
  id: number;
  name: string;
  main_generation: {
    name: string;
    url: string;
  } | null;
  pokedexes: {
    name: string;
    url: string;
  }[];
  locations: {
    name: string;
    url: string;
  }[];
  version_groups: {
    name: string;
    url: string;
  }[];
}

@Component({
  selector: 'app-regiones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './regiones.html'
})
export class Regiones implements OnInit {

  nombreRegion = 'kanto';

  region: RegionData | null = null;

  cargando = false;

  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarRegion();
  }

  buscarRegion(): void {
    const nombreBusqueda = this.nombreRegion
      .trim()
      .toLowerCase();

    if (!nombreBusqueda) {
      this.error = 'Escribe el nombre de una región.';
      this.region = null;
      return;
    }

    this.cargando = true;
    this.error = '';
    this.region = null;

    this.http
      .get<RegionData>(
        `https://pokeapi.co/api/v2/region/${nombreBusqueda}`
      )
      .subscribe({
        next: (data) => {
          this.region = data;
          this.cargando = false;
        },
        error: () => {
          this.error = 'No se encontró la región. Verifica el nombre e inténtalo de nuevo.';
          this.region = null;
          this.cargando = false;
        }
      });
  }

  limpiar(): void {
    this.nombreRegion = '';
    this.region = null;
    this.error = '';
    this.cargando = false;
  }
}