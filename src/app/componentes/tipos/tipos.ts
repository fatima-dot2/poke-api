import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.html'
})
export class Tipos implements OnInit {

  tipos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://pokeapi.co/api/v2/type')
      .subscribe(respuesta => {
        this.tipos = respuesta.results;
      });
  }
}
