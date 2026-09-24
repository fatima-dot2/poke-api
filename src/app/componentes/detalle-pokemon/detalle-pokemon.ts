import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon-service';

@Component({
  selector: 'app-detalle-pokemon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-pokemon.html'
})
export class DetallePokemon implements OnInit {

  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);

  pokemon: any = null;

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.pokemonService.getPokemonById(id).subscribe({
        next: (data: any) => {
          this.pokemon = data;
        },

        error: (error) => {
          console.log('Error al obtener el Pokémon:', error);
        }
      });

    }
  }
}