
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({ usuario: ['', Validators.required], password: ['', Validators.required] });
  }
  login() {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    const { usuario, password } = this.loginForm.value;
    const ok = this.authService.login(usuario!, password!);
    alert(ok ? 'Bienvenido ' + usuario : 'Usuario o contraseña incorrectos');
    if (ok) this.router.navigate(['/']);
  }
  limpiarFormulario(){ this.loginForm.reset(); }
}
