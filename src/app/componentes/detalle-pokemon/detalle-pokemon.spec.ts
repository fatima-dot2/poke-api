import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting
} from '@angular/common/http/testing';
<<<<<<< HEAD

=======
import { of } from 'rxjs';

import { PokemonService } from '../../services/pokemon-service';
>>>>>>> dbd9ab7 (ultimos detalles)
import { DetallePokemon } from './detalle-pokemon';

describe('DetallePokemon', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        DetallePokemon
      ],

      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]

    }).compileComponents();

  });

  it('debe crear el componente', () => {

    const fixture =
      TestBed.createComponent(DetallePokemon);

    const component =
      fixture.componentInstance;

    expect(component).toBeTruthy();

  });

  it('debe iniciar sin Pokémon seleccionado', () => {

    const fixture =
      TestBed.createComponent(DetallePokemon);

    const component =
      fixture.componentInstance;

    expect(component.pokemon).toBeNull();

  });

  it('debe iniciar sin error', () => {

    const fixture =
      TestBed.createComponent(DetallePokemon);

    const component =
      fixture.componentInstance;

    expect(component.error).toBe('');

  });

  it('debe iniciar sin estar cargando', () => {

    const fixture =
      TestBed.createComponent(DetallePokemon);

    const component =
      fixture.componentInstance;

    expect(component.cargandoLista).toBeFalsy();
    expect(component.cargandoDetalle).toBeFalsy();

  });

<<<<<<< HEAD
=======
  it('debe esperar la búsqueda antes de cargar la lista completa', async () => {

    const pokemonService = TestBed.inject(PokemonService);
    const getPokemonListSpy = vi.spyOn(pokemonService, 'getPokemonList')
      .mockReturnValue(of({ count: 0, results: [] }));

    const fixture =
      TestBed.createComponent(DetallePokemon);

    fixture.detectChanges();

    const component =
      fixture.componentInstance;

    expect(component.listaPokemon).toEqual([]);
    expect(component.pokemonFiltrados).toEqual([]);
    expect(component.paginaActual).toBe(1);
    expect(getPokemonListSpy).not.toHaveBeenCalled();

    component.busqueda = 'pik';
    component.filtrarPokemon();

    await new Promise(resolve => setTimeout(resolve, 400));

    expect(getPokemonListSpy).toHaveBeenCalledTimes(1);

  });

>>>>>>> dbd9ab7 (ultimos detalles)
  it('debe limpiar la búsqueda', () => {

    const fixture =
      TestBed.createComponent(DetallePokemon);

    const component =
      fixture.componentInstance;

    component.busqueda = 'pika';
    component.error = 'Error';
    component.pokemon = null;

    component.limpiarBusqueda();

    expect(component.busqueda).toBe('');
    expect(component.error).toBe('');
    expect(component.pokemon).toBeNull();

  });

});