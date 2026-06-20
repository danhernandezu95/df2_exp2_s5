
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
describe('RegisterComponent', () => {
  let component: RegisterComponent; let fixture: ComponentFixture<RegisterComponent>;
  beforeEach(async () => { await TestBed.configureTestingModule({imports:[RegisterComponent]}).compileComponents(); fixture = TestBed.createComponent(RegisterComponent); component = fixture.componentInstance; fixture.detectChanges();});
  it('debe ser inválido si las contraseñas no coinciden', () => {
    component.registerForm.patchValue({nombre:'A',usuario:'u',correo:'a@a.com',fechaNacimiento:'2000-01-01',password:'Abc123',repetirPassword:'Abc124'});
    expect(component.registerForm.valid).toBeFalse();
    expect(component.registerForm.hasError('passwordsNoCoinciden')).toBeTrue();
  });
});
