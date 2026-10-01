import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { Generaciones } from './generaciones';

describe('Generaciones', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        Generaciones
      ],

      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]

    }).compileComponents();

  });


  it('debe crear el componente', () => {

    const fixture =
      TestBed.createComponent(Generaciones);

    const component =
      fixture.componentInstance;

    expect(component).toBeTruthy();

  });


  it('debe iniciar sin error', () => {

    const fixture =
      TestBed.createComponent(Generaciones);

    const component =
      fixture.componentInstance;

    expect(component.error).toBe('');

  });


  it('debe iniciar sin una generación seleccionada', () => {

    const fixture =
      TestBed.createComponent(Generaciones);

    const component =
      fixture.componentInstance;

    expect(component.generacion).toBeNull();

  });


  it('debe iniciar sin estar cargando', () => {

    const fixture =
      TestBed.createComponent(Generaciones);

    const component =
      fixture.componentInstance;

    expect(component.cargando).toBeFalsy();

  });


  it('debe limpiar la información', () => {

    const fixture =
      TestBed.createComponent(Generaciones);

    const component =
      fixture.componentInstance;

    component.nombreGeneracion = 'generation-i';

    component.error = 'Error';

    component.limpiar();

    expect(component.nombreGeneracion).toBe('');

    expect(component.error).toBe('');

    expect(component.generacion).toBeNull();

  });

});