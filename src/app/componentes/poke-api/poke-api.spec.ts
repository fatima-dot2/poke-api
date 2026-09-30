import { TestBed } from '@angular/core/testing';
import {
HttpClientTestingModule,
HttpTestingController
} from '@angular/common/http/testing';

import { PokeApi } from './poke-api';

describe('PokeApi', () => {

let component: PokeApi;
let httpMock: HttpTestingController;

beforeEach(async () => {

await TestBed.configureTestingModule({
  imports: [
    PokeApi,
    HttpClientTestingModule
  ]
}).compileComponents();

const fixture = TestBed.createComponent(PokeApi);

component = fixture.componentInstance;

httpMock = TestBed.inject(HttpTestingController);

});

afterEach(() => {
httpMock.verify();
});

it('debería crear el componente', () => {
expect(component).toBeTruthy();
});

it('debería buscar un Pokémon correctamente', () => {

component.nombrePokemon = 'ditto';

component.buscarPokemon();

const request = httpMock.expectOne(
  'https://pokeapi.co/api/v2/pokemon/ditto'
);

expect(request.request.method).toBe('GET');

request.flush({
  id: 132,
  name: 'ditto',
  height: 3,
  weight: 40,
  base_experience: 101,
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png'
      }
    }
  },
  types: [
    {
      type: {
        name: 'normal'
      }
    }
  ],
  abilities: [
    {
      ability: {
        name: 'limber'
      }
    }
  ]
});

expect(component.pokemon.name).toBe('ditto');
expect(component.pokemon.id).toBe(132);
expect(component.cargando).toBeFalsy();

});

it('debería mostrar error si no se encuentra el Pokémon', () => {

component.nombrePokemon = 'pokemon-inexistente';

component.buscarPokemon();

const request = httpMock.expectOne(
  'https://pokeapi.co/api/v2/pokemon/pokemon-inexistente'
);

request.flush(
  { message: 'Not Found' },
  {
    status: 404,
    statusText: 'Not Found'
  }
);

expect(component.error).toBe(
  'No se encontró ese Pokémon.'
);

expect(component.pokemon).toBeNull();
expect(component.cargando).toBeFalsy();

});

it('debería mostrar error si el buscador está vacío', () => {

component.nombrePokemon = '';

component.buscarPokemon();

expect(component.error).toBe(
  'Escribe el nombre de un Pokémon.'
);

expect(component.pokemon).toBeNull();

});

});