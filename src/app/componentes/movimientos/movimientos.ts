import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-movimientos',
  imports: [],
  templateUrl: './movimientos.html'
})
export class Movimientos implements OnInit {

  movimiento: any;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.obtenerMovimiento('thunderbolt').subscribe({
      next: (data) => {
        console.log('MOVIMIENTO RECIBIDO:', data);
        this.movimiento = data;
      },
      error: (error) => {
        console.error('ERROR MOVIMIENTO:', error);
      }
    });
  }
}
