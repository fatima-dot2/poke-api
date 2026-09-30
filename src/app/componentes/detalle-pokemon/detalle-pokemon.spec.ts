import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting
} from '@angular/common/http/testing';

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