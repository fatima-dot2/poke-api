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

  pageSize = 10;
  pokemonPage = 1;
  habilidadesPage = 1;
  movimientosPage = 1;
  tiposPage = 1;
  versionesPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarGeneracion('generation-i');
  }

  get pokemonSpeciesPaginados(): { name: string }[] {
    return this.paginar(this.generacion?.pokemon_species ?? [], this.pokemonPage);
  }

  get habilidadesPaginadas(): { name: string }[] {
    return this.paginar(this.generacion?.abilities ?? [], this.habilidadesPage);
  }

  get movimientosPaginados(): { name: string }[] {
    return this.paginar(this.generacion?.moves ?? [], this.movimientosPage);
  }

  get tiposPaginados(): { name: string }[] {
    return this.paginar(this.generacion?.types ?? [], this.tiposPage);
  }

  get versionesPaginadas(): { name: string }[] {
    return this.paginar(this.generacion?.version_groups ?? [], this.versionesPage);
  }

  get totalPaginasPokemonSpecies(): number {
    return Math.max(1, Math.ceil((this.generacion?.pokemon_species?.length ?? 0) / this.pageSize));
  }

  get totalPaginasHabilidades(): number {
    return Math.max(1, Math.ceil((this.generacion?.abilities?.length ?? 0) / this.pageSize));
  }

  get totalPaginasMovimientos(): number {
    return Math.max(1, Math.ceil((this.generacion?.moves?.length ?? 0) / this.pageSize));
  }

  get totalPaginasTipos(): number {
    return Math.max(1, Math.ceil((this.generacion?.types?.length ?? 0) / this.pageSize));
  }

  get totalPaginasVersiones(): number {
    return Math.max(1, Math.ceil((this.generacion?.version_groups?.length ?? 0) / this.pageSize));
  }

  buscarGeneracion(nombre?: string): void {
    const nombreBusqueda = (nombre ?? this.nombreGeneracion).trim().toLowerCase();

    if (!nombreBusqueda) {
      this.error = 'Escribe el nombre de una generación.';
      this.generacion = null;
      return;
    }

    this.cargando = true;
    this.error = '';
    this.generacion = null;

    this.http
      .get<GenerationData>(`https://pokeapi.co/api/v2/generation/${nombreBusqueda}`)
      .subscribe({
        next: (data) => {
          this.generacion = data;
          this.nombreGeneracion = data.name;
          this.pokemonPage = 1;
          this.habilidadesPage = 1;
          this.movimientosPage = 1;
          this.tiposPage = 1;
          this.versionesPage = 1;
          this.cargando = false;
        },
        error: () => {
          this.error = 'No se encontró la generación.';
          this.generacion = null;
          this.cargando = false;
        }
      });
  }

  private paginar<T>(items: T[], pagina: number): T[] {
    const inicio = (pagina - 1) * this.pageSize;
    return items.slice(inicio, inicio + this.pageSize);
  }

  cambiarPaginaPokemon(pagina: number): void {
    this.pokemonPage = Math.min(Math.max(1, pagina), this.totalPaginasPokemonSpecies);
  }

  cambiarPaginaHabilidades(pagina: number): void {
    this.habilidadesPage = Math.min(Math.max(1, pagina), this.totalPaginasHabilidades);
  }

  cambiarPaginaMovimientos(pagina: number): void {
    this.movimientosPage = Math.min(Math.max(1, pagina), this.totalPaginasMovimientos);
  }

  cambiarPaginaTipos(pagina: number): void {
    this.tiposPage = Math.min(Math.max(1, pagina), this.totalPaginasTipos);
  }

  cambiarPaginaVersiones(pagina: number): void {
    this.versionesPage = Math.min(Math.max(1, pagina), this.totalPaginasVersiones);
  }

  limpiar(): void {
    this.nombreGeneracion = '';
    this.generacion = null;
    this.error = '';
  }
}