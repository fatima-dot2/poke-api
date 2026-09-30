import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { Pokedex } from './pokedex';

describe('Pokedex', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        Pokedex
      ],

      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]

    }).compileComponents();

  });


  it('debe crear el componente', () => {

    const fixture =
      TestBed.createComponent(Pokedex);

    const component =
      fixture.componentInstance;

    expect(component).toBeTruthy();

  });


  it('debe iniciar sin error', () => {

    const fixture =
      TestBed.createComponent(Pokedex);

    const component =
      fixture.componentInstance;

    expect(component.error).toBe('');

  });


  it('debe iniciar sin una Pokedex seleccionada', () => {

    const fixture =
      TestBed.createComponent(Pokedex);

    const component =
      fixture.componentInstance;

    expect(component.pokedex).toBeNull();

  });


  it('debe iniciar sin estar cargando', () => {

    const fixture =
      TestBed.createComponent(Pokedex);

    const component =
      fixture.componentInstance;

    expect(component.cargando).toBeFalsy();

  });


  it('debe limpiar la información', () => {

    const fixture =
      TestBed.createComponent(Pokedex);

    const component =
      fixture.componentInstance;

    component.nombrePokedex = 'national';

    component.error = 'Error';

    component.limpiar();

    expect(component.nombrePokedex).toBe('');

    expect(component.error).toBe('');

    expect(component.pokedex).toBeNull();

  });

});