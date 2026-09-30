import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habilidades',
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
  styleUrl: './habilidades.css',
  templateUrl: './habilidades.html'
})
export class Habilidades {

  private pokemonService = inject(PokemonService);

  nombre: string = '';
  habilidad: any = null;

  buscarHabilidad(): void {

    if (!this.nombre.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Escribe el nombre de una habilidad'
      });

      return;
    }

    this.pokemonService.getAbility(this.nombre).subscribe({
      next: (data: any) => {
        this.habilidad = data;
      },

      error: (error: unknown) => {
        console.error('Error al obtener la habilidad:', error);

        this.habilidad = null;

        Swal.fire({
          icon: 'error',
          title: 'Habilidad no encontrada',
          text: 'Intenta nuevamente'
        });
      }
    });
  }
}