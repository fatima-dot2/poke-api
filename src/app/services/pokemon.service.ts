import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  obtenerPokemon(nombre: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/pokemon/${nombre.toLowerCase()}`
    );
  }

  obtenerPokemones(limite: number = 20, offset: number = 0): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/pokemon?limit=${limite}&offset=${offset}`
    );
  }
}