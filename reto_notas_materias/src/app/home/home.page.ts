import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonButton, IonList, IonItem, IonLabel, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonButton, NgFor, FormsModule, NgStyle, IonButtons, IonMenuButton],
})
export class HomePage {
  materias: any[] = []; // Arreglo para almacenar las materias
  semestreSeleccionado: string = ''; // Propiedad para almacenar el semestre seleccionado
  semestreTodos: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // Opción "Todos" (0) más los semestres

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarMaterias(); // Cargar materias desde el localStorage al iniciar
  }

  cargarMaterias() {
    const storedMaterias = localStorage.getItem('materias');
    if (storedMaterias) {
      this.materias = JSON.parse(storedMaterias);
    }
  }

  obtenerMateriasFiltradas() {
    if (this.semestreSeleccionado === '0') {
      return this.materias; // Si se selecciona "Todos", retorna todas las materias
    } else if (this.semestreSeleccionado) {
      return this.materias.filter(materia => materia.semestre === Number(this.semestreSeleccionado));
    } else {
      return this.materias; // Sin filtro
    }
  }

  registrarMaterias() {
    this.router.navigate(['/registrar-materias'], { state: { semestre: this.semestreSeleccionado } });
  }

  verDetalles(materia: any) {
    this.router.navigate(['/materia-detalle'], {
      state: { materia } // Pasamos la materia seleccionada a la nueva página
    });
  }

  eliminarMateria(materia: any) {
    if (materia.notas && materia.notas.length > 0) {
      alert("No se puede eliminar la materia porque tiene notas registradas.");
    } else {
      if (confirm(`¿Estás seguro de que deseas eliminar la materia ${materia.nombre}?`)) {
        this.materias = this.materias.filter(m => m.codigo !== materia.codigo);
        localStorage.setItem('materias', JSON.stringify(this.materias));
        alert("Materia eliminada exitosamente.");
      }
    }
  }

  calcularPromedio(materia: any): number {
    if (!materia.notas || materia.notas.length === 0) {
      return 0; // Si no hay notas, retornar 0
    }
  
    const pesos = [0.2, 0.2, 0.2, 0.4]; // Pesos de las notas
    let promedio = 0;
  
    for (let i = 0; i < materia.notas.length; i++) {
      if (!isNaN(materia.notas[i])) { // Verificar que la nota sea un número
        promedio += materia.notas[i] * (pesos[i] || 0); // Sumar las notas con los pesos
      }
    }
  
    return promedio; // Retornar el promedio calculado
  }
}  