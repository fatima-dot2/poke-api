import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-poke-api',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './poke-api.html'
})
export class PokeApi {

  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef);

  nombrePokemon: string = '';
  pokemon: any = null;
  cargando: boolean = false;
  error: string = '';

  buscarPokemon(): void {

    const nombre = this.nombrePokemon.trim().toLowerCase();

    if (!nombre) {
      this.error = 'Escribe el nombre de un Pokémon.';
      this.pokemon = null;
      return;
    }

    this.cargando = true;
    this.error = '';
    this.pokemon = null;

    this.http
      .get<any>(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
      .subscribe({
        next: (respuesta: any) => {

          console.log('RESPUESTA POKEAPI:', respuesta);

          this.pokemon = respuesta;
          this.cargando = false;

          this.cd.detectChanges();
        },

        error: (error: unknown) => {

          console.error('ERROR POKEAPI:', error);

          this.error = 'No se encontró ese Pokémon.';
          this.pokemon = null;
          this.cargando = false;

          this.cd.detectChanges();
        }
      });
  }
}