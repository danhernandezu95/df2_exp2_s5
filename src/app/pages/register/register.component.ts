
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

function edadMinimaValidator(minEdad: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const fecha = new Date(value);
    if (Number.isNaN(fecha.getTime())) return { edadInvalida: true };
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
    return edad >= minEdad ? null : { edadMinima: true };
  };
}

function passwordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const repetir = group.get('repetirPassword')?.value;
    if (!password || !repetir) return null;
    return password === repetir ? null : { passwordsNoCoinciden: true };
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, edadMinimaValidator(13)]],
      direccionDespacho: [''],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
      repetirPassword: ['', Validators.required]
    }, { validators: passwordsMatchValidator() });
  }

  get f() { return this.registerForm.controls; }

  registrar() {
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

  limpiarFormulario() {
    this.registerForm.reset();
    this.enviado = false;
  }
}
