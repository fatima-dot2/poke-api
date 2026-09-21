import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tipos } from './tipos';

describe('Tipos', () => {
  let component: Tipos;
  let fixture: ComponentFixture<Tipos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tipos],
    }).compileComponents();

    fixture = TestBed.createComponent(Tipos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
