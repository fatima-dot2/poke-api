import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.css'
})
export class Movimientos {

  private pokemonService = inject(PokemonService);

  nombre: string = '';
  movimiento: any = null;

  buscarMovimiento(): void {

    if (!this.nombre.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Escribe el nombre de un movimiento'
      });

      return;
    }

    this.pokemonService.getMove(this.nombre).subscribe({

      next: (data: any) => {
        console.log('Movimiento recibido:', data);
        this.movimiento = data;
      },

      error: (error: unknown) => {
        console.error('Error al obtener el movimiento:', error);

        this.movimiento = null;

        Swal.fire({
          icon: 'error',
          title: 'Movimiento no encontrado',
          text: 'Verifica el nombre e intenta nuevamente'
        });
      }

    });
  }
}