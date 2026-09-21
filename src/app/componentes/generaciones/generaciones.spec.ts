import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Generaciones } from './generaciones';

describe('Generaciones', () => {
  let component: Generaciones;
  let fixture: ComponentFixture<Generaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Generaciones],
    }).compileComponents();

    fixture = TestBed.createComponent(Generaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
