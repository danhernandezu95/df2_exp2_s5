import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registrar(usuario: any) {

    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(
      'usuarioRegistrado',
      JSON.stringify(usuario)
    );

  }

  login(
    usuario: string,
    password: string
  ): boolean {

    if (typeof window === 'undefined') {
      return false;
    }

    const data = JSON.parse(
      localStorage.getItem(
        'usuarioRegistrado'
      ) || '{}'
    );

    if (
      usuario === data.usuario &&
      password === data.password
    ) {

      sessionStorage.setItem(
        'usuarioActivo',
        usuario
      );

      return true;
    }

    return false;
  }

}