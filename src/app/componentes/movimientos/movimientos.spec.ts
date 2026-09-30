import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Movimientos } from './movimientos';

describe('Movimientos', () => {
  let component: Movimientos;
  let fixture: ComponentFixture<Movimientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Movimientos],
      providers: [
        {
          provide: PokemonService,
          useValue: { obtenerMovimiento: () => of({ name: 'thunderbolt' }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Movimientos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
