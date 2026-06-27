import { Injectable } from '@angular/core';

/**
 * Servicio de autenticación.
 *
 * Maneja el registro e inicio de sesión de usuarios
 * utilizando localStorage para persistencia y sessionStorage
 * para mantener la sesión activa.
 *
 * Este servicio es de propósito educativo y no incluye
 * seguridad avanzada (como hashing de contraseñas).
 *
 * @author Daniel Hernandez
 * @version 1.0
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Registra un nuevo usuario en el sistema.
   *
   * Guarda los datos del usuario en localStorage bajo la clave
   * `usuarioRegistrado`.
   *
   * @param {any} usuario Objeto con los datos del usuario a registrar.
   * @returns {void}
   */
  registrar(usuario: any): void {

    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(
      'usuarioRegistrado',
      JSON.stringify(usuario)
    );

  }

  /**
   * Realiza el inicio de sesión de un usuario.
   *
   * Compara las credenciales ingresadas con los datos almacenados
   * en localStorage. Si son correctas, guarda el usuario en
   * sessionStorage como sesión activa.
   *
   * @param {string} usuario Nombre de usuario ingresado.
   * @param {string} password Contraseña ingresada.
   * @returns {boolean} `true` si el login es exitoso, `false` en caso contrario.
   */
  login(
    usuario: string,
    password: string
  ): boolean {

    if (typeof window === 'undefined') {
      return false;
    }

    const data = JSON.parse(
      localStorage.getItem('usuarioRegistrado') || '{}'
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