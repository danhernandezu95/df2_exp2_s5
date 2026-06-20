import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent {

  productos: any[] = [];

  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {

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

  agregar(producto: any) {

    this.carritoService.agregar(
      producto
    );

    alert(
      'Producto agregado al carrito'
    );

  }

}