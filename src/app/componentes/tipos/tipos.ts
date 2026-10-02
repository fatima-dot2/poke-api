import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon-service';
import Swal from 'sweetalert2';

interface TipoResumen {
  name: string;
  url: string;
}

interface TipoDetalle {
  id: number;
  name: string;
  moves: { name: string }[];
  pokemon: {
    pokemon: { name: string; url: string };
  }[];
}

@Component({
  selector: 'app-tipos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './tipos.css',
  templateUrl: './tipos.html',
})
export class Tipos implements OnInit {

  private pokemonService = inject(PokemonService);

  tipos: TipoResumen[] = [];
  tipoSeleccionado: TipoDetalle | null = null;
  nombreTipo = '';
  cargando = false;
  error = '';

  pageSize = 10;
  paginaTipos = 1;
  paginaPokemon = 1;
  paginaMovimientos = 1;

  ngOnInit(): void {
    this.cargarTipos();
  }

  get tiposPaginados(): TipoResumen[] {
    const inicio = (this.paginaTipos - 1) * this.pageSize;
    return this.tipos.slice(inicio, inicio + this.pageSize);
  }

  get pokemonsTipoPaginados(): { name: string; url: string }[] {
    return this.paginar(
      this.tipoSeleccionado?.pokemon.map(item => item.pokemon) ?? [],
      this.paginaPokemon
    );
  }

  get movimientosTipoPaginados(): { name: string }[] {
    return this.paginar(this.tipoSeleccionado?.moves ?? [], this.paginaMovimientos);
  }

  get totalPaginasTipos(): number {
    return Math.max(1, Math.ceil(this.tipos.length / this.pageSize));
  }

  get totalPaginasPokemonsTipo(): number {
    return Math.max(1, Math.ceil((this.tipoSeleccionado?.pokemon.length ?? 0) / this.pageSize));
  }

  get totalPaginasMovimientosTipo(): number {
    return Math.max(1, Math.ceil((this.tipoSeleccionado?.moves.length ?? 0) / this.pageSize));
  }

  cargarTipos(): void {
    this.cargando = true;
    this.error = '';

    this.pokemonService.getTypeList(100, 0).subscribe({
      next: (data) => {
        this.tipos = data.results;
        this.paginaTipos = 1;
        this.cargando = false;

        if (this.tipos.length > 0) {
          this.seleccionarTipo(this.tipos[0].name);
        }
      },
      error: () => {
        this.error = 'No se pudieron cargar los tipos de Pokémon.';
        this.cargando = false;
      }
    });
  }

  buscarTipo(): void {
    const nombre = this.nombreTipo.trim();
    const clave = PokemonService.normalizeText(nombre);

    if (!clave) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Escribe el nombre de un tipo.'
      });
      return;
    }

    const match = this.tipos.find(tipo =>
      PokemonService.matchesLocalizedText(
        PokemonService.toSpanishTypeName(tipo.name),
        nombre
      )
    );

    this.seleccionarTipo(match ? match.name : nombre.toLowerCase());
  }

  seleccionarTipo(nombre: string): void {
    this.cargando = true;
    this.error = '';

    const apiName = nombre.trim().toLowerCase();

    this.pokemonService.getTypeByName(apiName).subscribe({
      next: (data) => {
        this.tipoSeleccionado = data;
        this.nombreTipo = PokemonService.toSpanishTypeName(data.name);
        this.paginaPokemon = 1;
        this.paginaMovimientos = 1;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se encontró el tipo solicitado.';
        this.tipoSeleccionado = null;
        this.cargando = false;
      }
    });
  }

  private paginar<T>(items: T[], pagina: number): T[] {
    const inicio = (pagina - 1) * this.pageSize;
    return items.slice(inicio, inicio + this.pageSize);
  }

  cambiarPaginaTipos(pagina: number): void {
    this.paginaTipos = Math.min(Math.max(1, pagina), this.totalPaginasTipos);
  }

  cambiarPaginaPokemon(pagina: number): void {
    this.paginaPokemon = Math.min(Math.max(1, pagina), this.totalPaginasPokemonsTipo);
  }

  cambiarPaginaMovimientos(pagina: number): void {
    this.paginaMovimientos = Math.min(Math.max(1, pagina), this.totalPaginasMovimientosTipo);
  }

  obtenerNombreTipo(nombre: string): string {
    return PokemonService.toSpanishTypeName(nombre);
  }

  obtenerNombrePokemon(nombre: string): string {
    return PokemonService.toSpanishPokemonName(nombre);
  }

  obtenerNombreMovimiento(nombre: string): string {
    return nombre
      .split('-')
      .map(parte => parte ? parte.charAt(0).toUpperCase() + parte.slice(1) : '')
      .join(' ');
  }
}
