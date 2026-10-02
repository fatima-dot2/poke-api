import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon-service';

describe('PokemonService', () => {

  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reuse the same pokemon list request when called repeatedly', () => {
    const first = service.getPokemonList(200, 0);
    const second = service.getPokemonList(200, 0);

    first.subscribe();
    second.subscribe();

    const requests = httpMock.match('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0');
    expect(requests.length).toBe(1);

    requests[0].flush({ count: 200, results: [] });
  });

});