import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Region {
  name: string;
  url: string;
  id: number;
  image: string;
}

@Component({
  selector: 'app-regiones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './regiones.html'
})
export class Regiones implements OnInit {

  regiones: Region[] = [];
  cargando: boolean = true;

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.obtenerRegiones();
  }

  obtenerRegiones(): void {
    this.http.get<any>('https://pokeapi.co/api/v2/region/').subscribe({
      next: (data) => {

        this.regiones = data.results.map((region: any) => {

          const partes = region.url.split('/').filter(Boolean);

          return {
            name: region.name,
            url: region.url,
            id: Number(partes[partes.length - 1]),
            image: this.obtenerImagenRegion(region.name)
          };

        });

        this.cargando = false;
      },

      error: () => {

        this.cargando = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las regiones.'
        });

      }
    });
  }

  private obtenerImagenRegion(nombre: string): string {

    const imagenes: { [key: string]: string } = {

      kanto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',

      johto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png',

      hoenn: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/252.png',

      sinnoh: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/387.png',

      unova: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/495.png',

      kalos: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/650.png',

      alola: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/722.png',

      galar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/810.png',

      hisui: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png',

      paldea: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/906.png',

orre: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png'
    };

    return imagenes[nombre.toLowerCase()] || '';
  }

  mostrarRegion(region: Region): void {

    Swal.fire({
      icon: 'info',
      title: region.name.toUpperCase(),
      text: `ID de la región: ${region.id}`,
      confirmButtonText: 'Aceptar'
    });

  }
}