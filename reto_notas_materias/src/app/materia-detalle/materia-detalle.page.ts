import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea, IonList } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-materia-detalle',
  templateUrl: './materia-detalle.page.html',
  styleUrls: ['./materia-detalle.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea, IonList]
})
export class MateriaDetallePage {
  materia: any;
  promedio: number | null = null;

  constructor(private router: Router) {
    // Recuperar el estado pasado
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.materia = navigation.extras.state['materia']; // Acceso usando corchetes
      this.calcularPromedio(); // Calcular promedio al cargar la materia
    }
  }

  calcularPromedio() {
    if (this.materia.notas && this.materia.notas.length > 0) {
      const totalNotas = this.materia.notas.reduce((acc: number, nota: any) => {
        return acc + (nota.nota1 * 0.2) + (nota.nota2 * 0.2) + (nota.nota3 * 0.2) + (nota.notaFinal * 0.4);
      }, 0);
      this.promedio = totalNotas / this.materia.notas.length; // Promedio de todas las notas
    } else {
      this.promedio = null; // Sin notas, no hay promedio
    }
  }

  modificarMateria() {
    // Lógica para modificar la materia y guardar los cambios
    const materias = JSON.parse(localStorage.getItem('materias') || '[]');
    const index = materias.findIndex((m: any) => m.codigo === this.materia.codigo);
    if (index !== -1) {
      materias[index] = this.materia; // Actualizar la materia
      localStorage.setItem('materias', JSON.stringify(materias));
    }
    this.router.navigate(['/home']); // Redirigir a la página principal
  }
  
  agregarNotas() {
    this.router.navigate(['/agregar-notas'], {
      state: { materia: this.materia }
    });
  }
}
