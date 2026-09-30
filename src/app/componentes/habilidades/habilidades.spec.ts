import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);

  private URL_BASE = 'https://pokeapi.co/api/v2/';

  getPokemonById(id: string): Observable<any> {
    return this.http.get<any>(
      this.URL_BASE + 'pokemon/' + id.toLowerCase().trim()
    );
  }

  getPokemonSpecies(nombre: string): Observable<any> {
    return this.http.get<any>(
      this.URL_BASE + 'pokemon-species/' + nombre.toLowerCase().trim()
    );
  }

  getAbility(nombre: string): Observable<any> {
    return this.http.get<any>(
      this.URL_BASE + 'ability/' + nombre.toLowerCase().trim()
    );
  }
}