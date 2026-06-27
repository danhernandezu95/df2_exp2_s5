import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

/**
 * Componente Carrito.
 *
 * Muestra los productos agregados al carrito de compras
 * y calcula el total de la compra.
 *
 * Este componente obtiene los datos desde el servicio
 * {@link CarritoService} y los procesa para su visualización.
 *
 * @author Daniel Hernandez
 * @version 1.1
 */
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  /**
   * Lista de productos dentro del carrito.
   *
   * Cada elemento representa un producto con al menos
   * la propiedad `price`.
   */
  carrito: any[] = [];

  /**
   * Total acumulado del valor de los productos en el carrito.
   */
  total = 0;

  /**
   * Crea una instancia del componente Carrito.
   *
   * @param {CarritoService} carritoService Servicio encargado
   * de gestionar los productos del carrito.
   */
  constructor(
    private carritoService: CarritoService
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta
   * al inicializar el componente.
   *
   * Realiza las siguientes acciones:
   * - Obtiene los productos desde el servicio CarritoService.
   * - Calcula el total sumando los precios de los productos.
   *
   * @returns {void}
   */
  ngOnInit(): void {

    this.cargarCarrito();
  }

  /**
   * Carga los productos del carrito y recalcula el total.
   *
   * @returns {void}
   */
  private cargarCarrito(): void {

    this.carrito =
      this.carritoService.obtenerCarrito();

    this.total =
      this.carrito.reduce(
        (suma, p) => suma + p.price,
        0
      );
  }

  /**
   * Limpia el carrito de compras.
   *
   * Elimina los datos del localStorage y reinicia
   * las variables del componente.
   *
   * @returns {void}
   */
  limpiarCarrito(): void {

    this.carritoService.limpiarCarrito();

    this.carrito = [];
    this.total = 0;
  }

}