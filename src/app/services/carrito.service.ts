import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  obtenerCarrito() {

    if (typeof window === 'undefined') {
      return [];
    }

    return JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

  }

  agregar(producto: any) {

    if (typeof window === 'undefined') {
      return;
    }

    const carrito =
      this.obtenerCarrito();

    carrito.push(producto);

    localStorage.setItem(
      'cart',
      JSON.stringify(carrito)
    );

  }

}