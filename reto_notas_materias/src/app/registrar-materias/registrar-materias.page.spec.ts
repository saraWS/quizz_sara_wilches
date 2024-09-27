import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarMateriasPage } from './registrar-materias.page';

describe('RegistrarMateriasPage', () => {
  let component: RegistrarMateriasPage;
  let fixture: ComponentFixture<RegistrarMateriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarMateriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
