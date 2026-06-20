
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => { TestBed.configureTestingModule({}); service = TestBed.inject(AuthService); localStorage.clear(); sessionStorage.clear();});
  it('debe iniciar sesión correctamente con el usuario registrado', () => {
    service.registrar({usuario:'daniel',password:'Abc123'});
    expect(service.login('daniel','Abc123')).toBeTrue();
    expect(sessionStorage.getItem('usuarioActivo')).toBe('daniel');
  });
});
