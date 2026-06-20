
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
})
export class RecoverComponent {
  recoverForm;
  constructor(private fb: FormBuilder){ this.recoverForm=this.fb.group({nombreUsuario:['',Validators.required]});}
  recuperar(){ if(this.recoverForm.invalid){this.recoverForm.markAllAsTouched(); return;} if(typeof window==='undefined') return; const usuario=JSON.parse(localStorage.getItem('usuarioRegistrado')||'{}'); alert(this.recoverForm.value.nombreUsuario===usuario.usuario?'La contraseña es: '+usuario.password:'Usuario no encontrado');}
  limpiarFormulario(){this.recoverForm.reset();}
}
