import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/**
 * Componente Perfil de Usuario.
 *
 * Permite visualizar y modificar los datos del usuario registrado
 * almacenado en localStorage.
 *
 * @author Daniel Hernandez
 * @version 1.0
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  /**
   * Formulario de edición de usuario.
   */
  profileForm;

  /**
   * Usuario cargado desde localStorage.
   */
  usuarioOriginal: any;

  /**
   * Constructor del componente.
   *
   * @param fb FormBuilder para formularios reactivos.
   * @param authService Servicio de autenticación.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {

    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  /**
   * Método de inicialización.
   * Carga el usuario registrado desde localStorage.
   */
  ngOnInit(): void {

    if (typeof window === 'undefined') return;

    this.usuarioOriginal = JSON.parse(
      localStorage.getItem('usuarioRegistrado') || '{}'
    );

    this.profileForm.patchValue(this.usuarioOriginal);
  }

  /**
   * Guarda los cambios del usuario.
   *
   * Actualiza localStorage con los nuevos datos.
   */
  guardarCambios(): void {

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const usuarioActualizado = this.profileForm.value;

    localStorage.setItem(
      'usuarioRegistrado',
      JSON.stringify(usuarioActualizado)
    );

    alert('Usuario actualizado correctamente');
  }

  /**
   * Reinicia el formulario con los datos originales.
   */
  resetForm(): void {
    this.profileForm.patchValue(this.usuarioOriginal);
  }

}