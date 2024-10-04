import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton, IonText, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-registrar-materias',
  templateUrl: './registrar-materias.page.html',
  styleUrls: ['./registrar-materias.page.scss'],
  standalone: true,
  imports: [IonText, 
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton, 
    IonButtons, 
    IonMenuButton],
})
export class RegistrarMateriasPage implements OnInit {
  // Propiedades para capturar los datos del formulario
  nombre: string = ''; 
  semestre: number | undefined;
  codigo: string = '';
  horario: string = '';
  observaciones: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.semestre = navigation.extras.state['semestre'] ? Number(navigation.extras.state['semestre']) : undefined;
    }
  }

  // Método para guardar la materia
  registrarMateria() {
    const materia = {
      nombre: this.nombre,
      semestre: this.semestre,  // Ya lo tienes aquí
      codigo: this.codigo,
      horario: this.horario,
      observaciones: this.observaciones,
    };
  
    // Guardar en localStorage
    const materias = JSON.parse(localStorage.getItem('materias') || '[]');
    materias.push(materia);
    localStorage.setItem('materias', JSON.stringify(materias));
  
    // Limpiar el formulario después de guardar
    this.nombre = '';
    this.semestre = undefined;
    this.codigo = '';
    this.horario = '';
    this.observaciones = '';
  }
  
}
