import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  carrito: any[] = [];
  total = 0;

  constructor(
    private carritoService: CarritoService
  ) {}

  ngOnInit() {

    this.carrito =
      this.carritoService.obtenerCarrito();

    this.total =
      this.carrito.reduce(
        (suma, p) => suma + p.price,
        0
      );

  }

}