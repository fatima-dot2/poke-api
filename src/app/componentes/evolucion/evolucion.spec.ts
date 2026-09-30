import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { Evolucion } from './evolucion';

describe('Evolucion', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        Evolucion
      ],

      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]

    }).compileComponents();

  });

  it('debe crear el componente', () => {

    const fixture =
      TestBed.createComponent(Evolucion);

    const component =
      fixture.componentInstance;

    expect(component).toBeTruthy();

  });

  it('debe iniciar sin error', () => {

    const fixture =
      TestBed.createComponent(Evolucion);

    const component =
      fixture.componentInstance;

    expect(component.error).toBe('');

  });

  it('debe iniciar sin evoluciones', () => {

    const fixture =
      TestBed.createComponent(Evolucion);

    const component =
      fixture.componentInstance;

    expect(component.evoluciones.length).toBe(0);

  });

  it('debe iniciar sin estar cargando', () => {

    const fixture =
      TestBed.createComponent(Evolucion);

    const component =
      fixture.componentInstance;

    expect(component.cargando).toBeFalsy();

  });

  it('debe limpiar la información', () => {

    const fixture =
      TestBed.createComponent(Evolucion);

    const component =
      fixture.componentInstance;

    component.nombrePokemon = 'pikachu';

    component.error = 'Error';

    component.limpiar();

    expect(component.nombrePokemon).toBe('');

    expect(component.error).toBe('');

    expect(component.evoluciones.length).toBe(0);

  });

});