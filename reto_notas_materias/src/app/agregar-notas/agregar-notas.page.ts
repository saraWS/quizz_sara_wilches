import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea, IonDatetime } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-notas',
  templateUrl: './agregar-notas.page.html',
  styleUrls: ['./agregar-notas.page.scss'],
  standalone: true,
  imports: [CommonModule,
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
    IonDatetime,
    IonButton]
})


export class AgregarNotasPage {
  materia: any;
  nota: any = {
    fechaEntrega: '',
    descripcion: '',
    corte1: 0,
    corte2: 0,
    corte3: 0,
    corteFinal: 0,
    observaciones: ''
  };

  promedio: number | null = null;  // Para almacenar el promedio

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.materia = navigation.extras.state['materia'];
    }
  }

  agregarNotas() {
    // Validación del rango de las notas
    const { corte1, corte2, corte3, corteFinal } = this.nota;
    if (
      corte1 < 0 || corte1 > 50 ||
      corte2 < 0 || corte2 > 50 ||
      corte3 < 0 || corte3 > 50 ||
      corteFinal < 0 || corteFinal > 50
    ) {
      alert("Por favor, ingresa notas válidas entre 0 y 50.");
      return;
    }
  
    // Validación antes de agregar la nota
    if (this.nota.fechaEntrega && this.nota.descripcion) {
      if (!this.materia.notas) {
        this.materia.notas = [];
      }
  
      const nuevaNota = {
        fechaEntrega: this.nota.fechaEntrega,
        descripcion: this.nota.descripcion,
        corte1: this.nota.corte1 || 0,
        corte2: this.nota.corte2 || 0,
        corte3: this.nota.corte3 || 0,
        corteFinal: this.nota.corteFinal || 0,
        observaciones: this.nota.observaciones || ''
      };
  
      this.materia.notas.push(nuevaNota);
  
      const materias = JSON.parse(localStorage.getItem('materias') || '[]');
      const index = materias.findIndex((m: any) => m.codigo === this.materia.codigo);
      if (index !== -1) {
        materias[index] = this.materia;
        localStorage.setItem('materias', JSON.stringify(materias));
      }
  
      this.router.navigate(['/materia-detalle'], {
        state: { materia: this.materia }
      });
    } else {
      alert("Por favor, completa todos los campos requeridos.");
    }
  }
  

  calcularPromedio() {
    if (this.materia.notas && this.materia.notas.length > 0) {
      const totalNotas = this.materia.notas.reduce((acc: number, nota: any) => {
        return acc + (nota.corte1 * 0.2) + (nota.corte2 * 0.2) + (nota.corte3 * 0.2) + (nota.corteFinal * 0.4);
      }, 0);
      this.promedio = totalNotas / this.materia.notas.length;
    } else {
      this.promedio = null;
    }
  }

  volver() {
    this.router.navigate(['/materia-detalle'], {
      state: { materia: this.materia }
    });
  }
}
