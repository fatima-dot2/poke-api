import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { Regiones } from './regiones';

describe('Regiones', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        Regiones
      ],

      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]

    }).compileComponents();

  });


  it('debe crear el componente', () => {

    const fixture =
      TestBed.createComponent(Regiones);

    const component =
      fixture.componentInstance;

    expect(component).toBeTruthy();

  });


  it('debe iniciar sin error', () => {

    const fixture =
      TestBed.createComponent(Regiones);

    const component =
      fixture.componentInstance;

    expect(component.error).toBe('');

  });


  it('debe iniciar sin una región seleccionada', () => {

    const fixture =
      TestBed.createComponent(Regiones);

    const component =
      fixture.componentInstance;

    expect(component.region).toBeNull();

  });


  it('debe iniciar sin estar cargando', () => {

    const fixture =
      TestBed.createComponent(Regiones);

    const component =
      fixture.componentInstance;

    expect(component.cargando).toBeFalsy();

  });


  it('debe limpiar la información', () => {

    const fixture =
      TestBed.createComponent(Regiones);

    const component =
      fixture.componentInstance;

    component.nombreRegion = 'kanto';
    component.error = 'Error';

    component.limpiar();

    expect(component.nombreRegion).toBe('');
    expect(component.error).toBe('');
    expect(component.region).toBeNull();

  });

});