import { Injectable } from '@angular/core';

/**
 * Servicio de carrito de compras.
 *
 * Maneja la lógica de almacenamiento y recuperación de productos
 * del carrito utilizando localStorage del navegador.
 *
 * Este servicio permite agregar productos, obtener el carrito
 * y limpiar su contenido.
 *
 * @author Daniel Hernandez
 * @version 1.1
 */
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  /**
   * Obtiene los productos almacenados en el carrito.
   *
   * Recupera los datos desde localStorage bajo la clave `cart`.
   * Si no existe información, retorna un arreglo vacío.
   *
   * @returns {any[]} Lista de productos en el carrito.
   */
  obtenerCarrito(): any[] {

    if (typeof window === 'undefined') {
      return [];
    }

    return JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

  }

  /**
   * Agrega un producto al carrito de compras.
   *
   * Obtiene el carrito actual, agrega el nuevo producto
   * y guarda la actualización en localStorage.
   *
   * @param {any} producto Producto a agregar al carrito.
   * @returns {void}
   */
  agregar(producto: any): void {

    if (typeof window === 'undefined') {
      return;
    }

    const carrito = this.obtenerCarrito();

    carrito.push(producto);

    localStorage.setItem(
      'cart',
      JSON.stringify(carrito)
    );

  }

  /**
   * Limpia completamente el carrito de compras.
   *
   * Elimina todos los productos almacenados en localStorage
   * bajo la clave `cart`.
   *
   * @returns {void}
   */
  limpiarCarrito(): void {

    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem('cart');
  }

}