import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

  getAbility(nombre: string) {
    return this.http.get(
        this.URL_BASE + nombre.toLocaleLowerCase() + '/ability'
    );
}

getSpecies(nombre: string) {
    return this.http.get(
        this.URL_BASE + nombre.toLocaleLowerCase() + '/species'
    );
  }
}
