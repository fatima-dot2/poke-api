import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

interface PokemonListResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

interface PokemonSpeciesListResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

interface TypeListResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private static readonly typeTranslations: Record<string, string> = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Eléctrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero',
    fairy: 'Hada'
  };

  private static readonly pokemonTranslations: Record<string, string> = {
    'nidoran-f': 'Nidorán♀',
    'nidoran-m': 'Nidorán♂',
    'mr-mime': 'Mr. Mime',
    'mime-jr': 'Mime Jr.',
    'farfetchd': 'Farfetch\'d',
    'ho-oh': 'Ho-Oh',
    'porygon-z': 'Porygon-Z'
  };

  private http = inject(HttpClient);

  private URL_BASE = 'https://pokeapi.co/api/v2/';

  private readonly requestCache = new Map<string, Observable<unknown>>();

  static normalizeText(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  static toSpanishPokemonName(value: string): string {
    const clave = PokemonService.normalizeText(value);
    const mapped = PokemonService.pokemonTranslations[clave];
    return mapped ?? value;
  }

  static toSpanishTypeName(value: string): string {
    const clave = PokemonService.normalizeText(value);
    const mapped = PokemonService.typeTranslations[clave];
    return mapped ?? value;
  }

  static matchesLocalizedText(value: string, query: string): boolean {
    const search = PokemonService.normalizeText(query);
    return PokemonService.normalizeText(value).includes(search);
  }

  getPokemonById(id: string): Observable<any> {
    return this.getCached<any>(
      `pokemon/${id.toLowerCase().trim()}`
    );
  }

  getPokemonList(limit = 250, offset = 0): Observable<PokemonListResponse> {
    return this.getCached<PokemonListResponse>(
      `pokemon?limit=${limit}&offset=${offset}`
    );
  }

  getPokemonSpeciesList(limit = 250, offset = 0): Observable<PokemonSpeciesListResponse> {
    return this.getCached<PokemonSpeciesListResponse>(
      `pokemon-species?limit=${limit}&offset=${offset}`
    );
  }

  getPokemonSpecies(nombre: string): Observable<any> {
    return this.getCached<any>(
      `pokemon-species/${nombre.toLowerCase().trim()}`
    );
  }

  getAbility(nombre: string): Observable<any> {
    return this.getCached<any>(
      `ability/${nombre.toLowerCase().trim()}`
    );
  }

  getMove(nombre: string): Observable<any> {
    return this.getCached<any>(
      `move/${nombre.toLowerCase().trim()}`
    );
  }

  getTypeList(limit = 100, offset = 0): Observable<TypeListResponse> {
    return this.getCached<TypeListResponse>(
      `type?limit=${limit}&offset=${offset}`
    );
  }

  getTypeByName(nombre: string): Observable<any> {
    return this.getCached<any>(
      `type/${nombre.toLowerCase().trim()}`
    );
  }

  private getCached<T>(endpoint: string): Observable<T> {
    const cachedRequest = this.requestCache.get(endpoint);

    if (cachedRequest) {
      return cachedRequest as Observable<T>;
    }

    const request$ = this.http.get<T>(`${this.URL_BASE}${endpoint}`).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.requestCache.set(endpoint, request$);

    return request$;
  }
}
