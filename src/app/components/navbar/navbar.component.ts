import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Router,
  NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs';

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

  usuario = 'Invitado';

  constructor(
    private router: Router
  ) {}

  ngOnInit() {

    this.cargarUsuario();

    this.router.events
      .pipe(
        filter(
          event => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {

        this.cargarUsuario();

      });

  }

  cargarUsuario() {

    if (typeof window !== 'undefined') {

      this.usuario =
        sessionStorage.getItem(
          'usuarioActivo'
        ) || 'Invitado';

    }

  }

}