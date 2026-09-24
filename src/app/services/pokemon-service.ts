import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList() {
    return this.http.get<any>(
      `${this.apiUrl}/pokemon?limit=20&offset=0`
    );
  }

  getPokemonById(id: string) {
    return this.http.get<any>(
      `${this.apiUrl}/pokemon/${id}`
    );
  }
}