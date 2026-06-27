import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * Componente Recuperación de contraseña.
 *
 * Permite recuperar la contraseña de un usuario registrado
 * comparando el nombre de usuario ingresado con los datos
 * almacenados en localStorage.
 *
 * Este componente es principalmente demostrativo y utiliza
 * almacenamiento local del navegador.
 *
 * @author Daniel Hernandez
 * @version 1.0
 */
@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
})
export class RecoverComponent {

  /**
   * Formulario reactivo de recuperación de contraseña.
   *
   * Contiene:
   * - nombreUsuario: nombre del usuario a recuperar (requerido)
   */
  recoverForm;

  /**
   * Crea una instancia del componente Recover.
   *
   * @param {FormBuilder} fb Servicio para construir formularios reactivos.
   */
  constructor(private fb: FormBuilder) {
    this.recoverForm = this.fb.group({
      nombreUsuario: ['', Validators.required]
    });
  }

  /**
   * Ejecuta el proceso de recuperación de contraseña.
   *
   * Valida el formulario, obtiene el usuario desde localStorage
   * y compara el nombre ingresado. Si coincide, muestra la contraseña
   * en una alerta.
   *
   * @returns {void}
   */
  recuperar(): void {

    if (this.recoverForm.invalid) {
      this.recoverForm.markAllAsTouched();
      return;
    }

    if (typeof window === 'undefined') return;

    const usuario = JSON.parse(
      localStorage.getItem('usuarioRegistrado') || '{}'
    );

    alert(
      this.recoverForm.value.nombreUsuario === usuario.usuario
        ? 'La contraseña es: ' + usuario.password
        : 'Usuario no encontrado'
    );

  }

  /**
   * Limpia el formulario de recuperación.
   *
   * @returns {void}
   */
  limpiarFormulario(): void {
    this.recoverForm.reset();
  }

}