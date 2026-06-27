import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Router,
  NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs';

/**
 * Componente Navbar.
 *
 * Muestra la barra de navegación de la aplicación y el nombre
 * del usuario autenticado. El nombre se obtiene desde Session Storage
 * y se actualiza automáticamente con los cambios de navegación.
 *
 * @author Daniel Hernandez
 * @version 1.1
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  /**
   * Nombre del usuario actualmente autenticado.
   */
  usuario = 'Invitado';

  /**
   * Constructor del componente Navbar.
   *
   * @param router Servicio de Angular para navegación.
   */
  constructor(
    private router: Router
  ) {}

  /**
   * Inicializa el componente y carga el usuario.
   */
  ngOnInit(): void {
    this.cargarUsuario();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.cargarUsuario();
      });
  }

  /**
   * Obtiene el usuario desde sessionStorage.
   */
  cargarUsuario(): void {

    if (typeof window !== 'undefined') {

      this.usuario =
        sessionStorage.getItem('usuarioActivo') || 'Invitado';

    }

  }

  /**
   * Cierra la sesión del usuario.
   *
   * Elimina el usuario activo de sessionStorage
   * y actualiza el navbar.
   */
  logout(): void {

    if (typeof window === 'undefined') return;

    sessionStorage.removeItem('usuarioActivo');

    this.cargarUsuario();

    this.router.navigate(['/']);

  }

}