import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private URL_BASE = 'https://pokeapi.co/api/v2/';
  private http = inject(HttpClient);

  getAbility(nombre: string) {
    return this.http.get(
      this.URL_BASE + 'ability/' + nombre.toLowerCase().trim()
    );
  }

  getPokemonSpecies(nombre: string) {
    return this.http.get(
      this.URL_BASE + 'pokemon-species/' + nombre.toLowerCase().trim()
    );
  }

}