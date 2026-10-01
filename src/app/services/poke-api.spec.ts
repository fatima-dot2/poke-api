import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private URL_BASE = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getPokemonById(id: string) {
    return this.http.get(
      this.URL_BASE + 'pokemon/' + id.toLowerCase().trim()
    );
  }
}