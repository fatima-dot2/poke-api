import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [],
  templateUrl: './movimientos.html'
})
export class Movimientos implements OnInit {

  movimiento: any = null;
  cargando = false;
  error = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.cargando = true;
    this.pokemonService.obtenerMovimiento('thunderbolt').subscribe({
      next: (data) => {
        this.movimiento = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el movimiento.';
        this.cargando = false;
      }
    });
  }
}
