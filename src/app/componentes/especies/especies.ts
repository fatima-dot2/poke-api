import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon-service';
import swal from 'sweetalert2';

@Component({
  imports: [FormsModule],
  selector: 'app-especies',
  templateUrl: './especies.html',
})
export class Especies {
  private pokemonService = inject(PokemonService);

  nombre = '';
  especie: any = null;

  buscarEspecie() {
    if (!this.nombre.trim()) {

      swal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Escribe el nombre de un pokemon",
      });
      return;
    }
    this.pokemonService.getSpecies(this.nombre)
    .subscribe({
      next: (data: any) => {
        this.especie = data;
      },

      error: () => {
        this.especie = null;
        swal.fire({
          icon: "error",
          title: "Especie no encontrada",
          text: "Intenta nuevamnete"
        });
      }

    });
  }
}