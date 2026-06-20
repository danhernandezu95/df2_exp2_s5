import { Injectable } from '@angular/core';
import { Producto } from '../models/producto/producto.module';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [

    {
      id:1,
      name:'Mazo de misiones: Marine',
      category:'Mazo',
      price:8000,
      image:'img/mazo_misiones_marine.jpg',
      description:'Mazo de misiones Marine'
    },

    {
      id:2,
      name:'Mazo de misiones: Crusade',
      category:'Mazo',
      price:8000,
      image:'img/mazo_misiones_crusade.jpg',
      description:'Mazo de misiones Crusade'
    },

    {
      id:3,
      name:'Set de pinturas',
      category:'Mesa',
      price:10000,
      image:'img/set_de_pinturas.jpg',
      description:'Set de pinturas'
    },

    {
      id:4,
      name:'Dado de misiones',
      category:'Accesorio',
      price:3000,
      image:'img/dado_de_misiones.jpg',
      description:'Dado de misiones'
    }

  ];

  obtenerProductos() {
    return this.productos;
  }

}