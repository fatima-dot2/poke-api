import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface RegionData {
  id: number;
  name: string;
  main_generation: {
    name: string;
  } | null;
  pokedexes: {
    name: string;
  }[];
  locations: {
    name: string;
  }[];
  version_groups: {
    name: string;
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

  nombreRegion = '';

  region: RegionData | null = null;

  cargando = false;

  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarRegion('kanto');
  }

  buscarRegion(nombre?: string): void {

    const nombreBusqueda = (
      nombre ?? this.nombreRegion
    ).trim().toLowerCase();

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
          this.error = 'No se encontró la región.';
          this.region = null;
          this.cargando = false;
        }
      });
  }

  limpiar(): void {
    this.nombreRegion = '';
    this.region = null;
    this.error = '';
  }
}