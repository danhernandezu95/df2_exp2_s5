import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';

/**
 * Componente Catálogo.
 *
 * Muestra la lista de productos disponibles y permite filtrarlos
 * por categoría mediante parámetros de la URL.
 *
 * También permite agregar productos al carrito de compras
 * utilizando {@link CarritoService}.
 *
 * @author Daniel Hernandez
 * @version 1.0
 */
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent {

  /**
   * Lista de productos mostrados en el catálogo.
   *
   * Puede contener todos los productos o un subconjunto
   * filtrado por categoría.
   */
  productos: any[] = [];

  /**
   * Crea una instancia del componente Catálogo.
   *
   * @param {ProductosService} productosService Servicio que
   * proporciona la lista de productos disponibles.
   *
   * @param {ActivatedRoute} route Servicio de Angular que permite
   * acceder a los parámetros de la URL.
   *
   * @param {CarritoService} carritoService Servicio encargado
   * de gestionar el carrito de compras.
   */
  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private carritoService: CarritoService
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta
   * al inicializar el componente.
   *
   * Obtiene los productos desde el servicio y escucha los
   * cambios en los parámetros de la URL para filtrar por
   * categoría.
   *
   * @returns {void}
   */
  ngOnInit(): void {

    const todosLosProductos =
      this.productosService.obtenerProductos();

    this.route.queryParams.subscribe(params => {

      const categoria = params['categoria'];

      if (
        !categoria ||
        categoria === 'All'
      ) {

        this.productos =
          todosLosProductos;

      } else {

        this.productos =
          todosLosProductos.filter(
            producto =>
              producto.category === categoria
          );

      }

    });

  }

  /**
   * Agrega un producto al carrito de compras.
   *
   * Muestra una alerta de confirmación después de agregarlo.
   *
   * @param {any} producto Producto seleccionado para agregar al carrito.
   * @returns {void}
   */
  agregar(producto: any): void {

    this.carritoService.agregar(
      producto
    );

    alert(
      'Producto agregado al carrito'
    );

  }

}