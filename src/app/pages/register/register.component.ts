import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/**
 * Validador que verifica que el usuario tenga una edad mínima.
 *
 * @param {number} minEdad Edad mínima permitida.
 * @returns {ValidatorFn} Función validadora de Angular.
 */
function edadMinimaValidator(minEdad: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const fecha = new Date(value);

    if (Number.isNaN(fecha.getTime())) {
      return { edadInvalida: true };
    }

    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();

    const m = hoy.getMonth() - fecha.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }

    return edad >= minEdad ? null : { edadMinima: true };
  };
}

/**
 * Validador que verifica que las contraseñas coincidan.
 *
 * @returns {ValidatorFn} Función validadora de grupo.
 */
function passwordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const repetir = group.get('repetirPassword')?.value;

    if (!password || !repetir) return null;

    return password === repetir
      ? null
      : { passwordsNoCoinciden: true };
  };
}

/**
 * Validador de seguridad para contraseña.
 *
 * Reglas:
 * - Entre 6 y 18 caracteres
 * - Al menos una letra mayúscula
 * - Al menos un número
 *
 * @returns {ValidatorFn}
 */
function passwordSecurityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const validLength = value.length >= 6 && value.length <= 18;

    const errors: ValidationErrors = {};

    if (!hasUpperCase) errors['noUpperCase'] = true;
    if (!hasNumber) errors['noNumber'] = true;
    if (!validLength) errors['invalidLength'] = true;

    return Object.keys(errors).length ? errors : null;
  };
}

/**
 * Componente Registro de usuario.
 *
 * Permite crear usuarios validando datos personales,
 * correo, fecha de nacimiento y contraseña segura.
 *
 * Utiliza AuthService para persistir el usuario.
 *
 * @author Daniel Hernandez
 * @version 1.1
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  /**
   * Formulario reactivo de registro.
   */
  registerForm: FormGroup;

  /**
   * Indica si el formulario fue enviado.
   */
  enviado = false;

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

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: [
        '',
        [Validators.required, edadMinimaValidator(13)]
      ],
      direccionDespacho: [''],
      password: [
        '',
        [
          Validators.required,
          passwordSecurityValidator()
        ]
      ],
      repetirPassword: ['', Validators.required]
    }, {
      validators: passwordsMatchValidator()
    });

  }

  /**
   * Acceso rápido a los controles del formulario.
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Registra un nuevo usuario.
   *
   * Valida el formulario y guarda el usuario mediante AuthService.
   */
  registrar(): void {

    this.enviado = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { repetirPassword, ...usuario } = this.registerForm.value;

    this.authService.registrar(usuario);

    alert('Usuario registrado correctamente');

    this.limpiarFormulario();

  }

  /**
   * Limpia el formulario.
   */
  limpiarFormulario(): void {
    this.registerForm.reset();
    this.enviado = false;
  }

}