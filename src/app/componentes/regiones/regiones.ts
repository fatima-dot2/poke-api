<<<<<<< HEAD

=======
>>>>>>> dbd9ab7 (ultimos detalles)
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface RegionData {
  id: number;
  name: string;
  main_generation: {
    name: string;
<<<<<<< HEAD
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
=======
  } | null;
  pokedexes: {
    name: string;
  }[];
  locations: {
    name: string;
  }[];
  version_groups: {
    name: string;
>>>>>>> dbd9ab7 (ultimos detalles)
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

<<<<<<< HEAD
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
=======
  nombreRegion = '';
  region: RegionData | null = null;
  cargando = false;
  error = '';

  pageSize = 10;
  pokedexPage = 1;
  versionesPage = 1;
  ubicacionesPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarRegion('kanto');
  }

  get pokedexesPaginadas(): { name: string }[] {
    return this.paginar(this.region?.pokedexes ?? [], this.pokedexPage);
  }

  get versionGroupsPaginados(): { name: string }[] {
    return this.paginar(this.region?.version_groups ?? [], this.versionesPage);
  }

  get locationsPaginadas(): { name: string }[] {
    return this.paginar(this.region?.locations ?? [], this.ubicacionesPage);
  }

  get totalPaginasPokedexes(): number {
    return Math.max(1, Math.ceil((this.region?.pokedexes?.length ?? 0) / this.pageSize));
  }

  get totalPaginasVersiones(): number {
    return Math.max(1, Math.ceil((this.region?.version_groups?.length ?? 0) / this.pageSize));
  }

  get totalPaginasUbicaciones(): number {
    return Math.max(1, Math.ceil((this.region?.locations?.length ?? 0) / this.pageSize));
  }

  buscarRegion(nombre?: string): void {
    const nombreBusqueda = (nombre ?? this.nombreRegion).trim().toLowerCase();
>>>>>>> dbd9ab7 (ultimos detalles)

    if (!nombreBusqueda) {
      this.error = 'Escribe el nombre de una región.';
      this.region = null;
      return;
    }

    this.cargando = true;
    this.error = '';
    this.region = null;

    this.http
<<<<<<< HEAD
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
=======
      .get<RegionData>(`https://pokeapi.co/api/v2/region/${nombreBusqueda}`)
      .subscribe({
        next: (data) => {
          this.region = data;
          this.pokedexPage = 1;
          this.versionesPage = 1;
          this.ubicacionesPage = 1;
          this.cargando = false;
        },
        error: () => {
          this.error = 'No se encontró la región.';
>>>>>>> dbd9ab7 (ultimos detalles)
          this.region = null;
          this.cargando = false;
        }
      });
  }

<<<<<<< HEAD
=======
  private paginar<T>(items: T[], pagina: number): T[] {
    const inicio = (pagina - 1) * this.pageSize;
    return items.slice(inicio, inicio + this.pageSize);
  }

  cambiarPaginaPokedexes(pagina: number): void {
    this.pokedexPage = Math.min(Math.max(1, pagina), this.totalPaginasPokedexes);
  }

  cambiarPaginaVersiones(pagina: number): void {
    this.versionesPage = Math.min(Math.max(1, pagina), this.totalPaginasVersiones);
  }

  cambiarPaginaUbicaciones(pagina: number): void {
    this.ubicacionesPage = Math.min(Math.max(1, pagina), this.totalPaginasUbicaciones);
  }

>>>>>>> dbd9ab7 (ultimos detalles)
  limpiar(): void {
    this.nombreRegion = '';
    this.region = null;
    this.error = '';
<<<<<<< HEAD
    this.cargando = false;
=======
>>>>>>> dbd9ab7 (ultimos detalles)
  }
}