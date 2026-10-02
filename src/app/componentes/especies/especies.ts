import { Component, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-especies',
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './especies.html'
})
export class Especies {

  private pokemonService = inject(PokemonService);

  nombre = '';
  especie: any = null;

  buscarEspecie() {

    if (!this.nombre.trim()) {

      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Escribe el nombre de un Pokémon'
      });

      return;
    }

    this.pokemonService.getPokemonSpecies(this.nombre)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.especie = data;
        },

        error: (error) => {

          console.error(error);

          this.especie = null;

          Swal.fire({
            icon: 'error',
            title: 'Especie no encontrada',
            text: 'Intenta nuevamente'
          });

        }
      });
  }
}