import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Componente Login.
 *
 * Maneja la autenticación de usuarios mediante un formulario reactivo.
 * Permite validar credenciales, iniciar sesión y redirigir al usuario
 * a la página principal si el login es exitoso.
 *
 * Utiliza {@link AuthService} para validar credenciales.
 *
 * @author Daniel Hernandez
 * @version 1.0
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  /**
   * Formulario reactivo de login.
   *
   * Contiene los campos:
   * - usuario: nombre de usuario (requerido)
   * - password: contraseña (requerido)
   */
  loginForm;

  /**
   * Crea una instancia del componente Login.
   *
   * @param {AuthService} authService Servicio encargado de
   * autenticación de usuarios.
   *
   * @param {Router} router Servicio de Angular para navegación.
   *
   * @param {FormBuilder} fb Servicio para construir formularios reactivos.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  /**
   * Ejecuta el proceso de inicio de sesión.
   *
   * Valida el formulario, envía las credenciales al servicio
   * de autenticación y redirige al usuario si el login es exitoso.
   *
   * @returns {void}
   */
  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { usuario, password } = this.loginForm.value;

    const ok = this.authService.login(usuario!, password!);

    alert(
      ok
        ? 'Bienvenido ' + usuario
        : 'Usuario o contraseña incorrectos'
    );

    if (ok) {
      this.router.navigate(['/']);
    }

  }

  /**
   * Limpia todos los campos del formulario de login.
   *
   * @returns {void}
   */
  limpiarFormulario(): void {
    this.loginForm.reset();
  }

}