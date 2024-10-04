import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router'; // Importar el Router en el archivo TypeScript
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonButton, NgFor, FormsModule],
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
    // Leer materias del localStorage
    const storedMaterias = localStorage.getItem('materias');
    if (storedMaterias) {
      this.materias = JSON.parse(storedMaterias); // Si existen materias en el localStorage, cargarlas
    }
  }

  obtenerMateriasFiltradas() {
    // Filtrar materias según el semestre seleccionado
    if (this.semestreSeleccionado === '0') {
      return this.materias; // Si se selecciona "Todos", retorna todas las materias
    } else if (this.semestreSeleccionado) {
      return this.materias.filter(materia => materia.semestre === Number(this.semestreSeleccionado));
    } else {
      return this.materias; // Sin filtro
    }
  }
  
  registrarMaterias() {
    // Redirigir a la página de registro y pasar el semestre seleccionado
    this.router.navigate(['/registrar-materias'], { state: { semestre: this.semestreSeleccionado } });
  }
  

  verDetalles(materia: any) {
    // Redirigir a la página de detalles de la materia seleccionada
    this.router.navigate(['/materia-detalle'], {
      state: { materia } // Pasamos la materia seleccionada a la nueva página
    });
  }

  eliminarMateria(materia: any) {
    // Verificar si la materia tiene notas registradas
    if (materia.notas && materia.notas.length > 0) {
      alert("No se puede eliminar la materia porque tiene notas registradas.");
    } else {
      // Confirmación antes de eliminar
      if (confirm(`¿Estás seguro de que deseas eliminar la materia ${materia.nombre}?`)) {
        // Eliminar la materia del arreglo
        this.materias = this.materias.filter(m => m.codigo !== materia.codigo);
        
        // Actualizar el localStorage
        localStorage.setItem('materias', JSON.stringify(this.materias));

        alert("Materia eliminada exitosamente.");
      }
    }
  }
}