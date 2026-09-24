import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon-service';
import swal from 'sweetalert2';


@Component({
  imports: [FormsModule],
  selector: 'app-habilidades',
  templateUrl: './habilidades.html',
})
export class Habilidades {
  private pokemonService = inject(PokemonService);
  nombre: string = '';
  habilidad: any=null;

  buscarHabilidad() {
    if (!this.nombre.trim()) {
      swal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Escribe el nombre de una habilidad",
      });
      return;
    }

    this.pokemonService.getAbility(this.nombre)
      .subscribe({
        next: (data: any) =>{
          this.habilidad = data;
        },

        error: () => {
          this.habilidad = null;
          swal.fire({
            icon: "error",
            title: "Habilidad no encontrada",
            text: "Intenta nuevamnete"
          });
        }

      });

  }

}
