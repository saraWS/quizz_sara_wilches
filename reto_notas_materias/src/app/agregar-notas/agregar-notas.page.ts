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
    
    // Asignar 0 a las notas si no se ingresan
    const notaCorte1 = corte1 || 0;
    const notaCorte2 = corte2 || 0;
    const notaCorte3 = corte3 || 0;
    const notaCorteFinal = corteFinal || 0;
  
    // Validar que las notas estén en el rango de 0 a 50
    if (
      notaCorte1 < 0 || notaCorte1 > 50 ||
      notaCorte2 < 0 || notaCorte2 > 50 ||
      notaCorte3 < 0 || notaCorte3 > 50 ||
      notaCorteFinal < 0 || notaCorteFinal > 50
    ) {
      alert("Por favor, ingresa notas válidas entre 0 y 50.");
      return;
    }
  
    // Validación antes de agregar la nota
    if (this.nota.fechaEntrega && this.nota.descripcion) {
      if (!this.materia.notas) {
        this.materia.notas = [];
      }
  
      // Crear la nueva nota con los valores
      const nuevaNota = {
        fechaEntrega: this.nota.fechaEntrega,
        descripcion: this.nota.descripcion,
        corte1: notaCorte1,  // Se usa la nota ya validada o asignada como 0
        corte2: notaCorte2,
        corte3: notaCorte3,
        corteFinal: notaCorteFinal,
        observaciones: this.nota.observaciones || ''  // Si no hay observaciones, será una cadena vacía
      };
  
      this.materia.notas.push(nuevaNota);
  
      // Guardar la materia actualizada en localStorage
      const materias = JSON.parse(localStorage.getItem('materias') || '[]');
      const index = materias.findIndex((m: any) => m.codigo === this.materia.codigo);
      if (index !== -1) {
        materias[index] = this.materia;
        localStorage.setItem('materias', JSON.stringify(materias));
      }
  
      // Redirigir a la página de detalles de la materia
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
        // Asegurarse de que las notas tengan valores numéricos válidos o 0
        const corte1 = nota.corte1 || 0;
        const corte2 = nota.corte2 || 0;
        const corte3 = nota.corte3 || 0;
        const corteFinal = nota.corteFinal || 0;
  
        // Sumar las notas ponderadas
        return acc + (corte1 * 0.2) + (corte2 * 0.2) + (corte3 * 0.2) + (corteFinal * 0.4);
      }, 0);
      
      // Calcular el promedio dividiendo por la cantidad de notas
      this.promedio = totalNotas / this.materia.notas.length;
    } else {
      this.promedio = null; // No hay notas, no hay promedio
    }
  }
  

  volver() {
    this.router.navigate(['/materia-detalle'], {
      state: { materia: this.materia }
    });
  }
}
