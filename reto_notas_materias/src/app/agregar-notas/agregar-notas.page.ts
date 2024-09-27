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
export class AgregarNotasPage implements OnInit {
  materia: any;
  nota: any = {
    fechaEntrega: '',
    descripcion: '',
    nota1: 0,
    nota2: 0,
    nota3: 0,
    notaFinal: 0,
    observaciones: ''
  };

  constructor(private router: Router) {
    // Recuperar el estado pasado
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.materia = navigation.extras.state['materia'];
    }
  }

  ngOnInit() {}

  agregarNotas() {
    if (!this.materia.notas) {
      this.materia.notas = [];
    }

    // Asegurar que las notas tienen un valor
    const nuevaNota = {
      fechaEntrega: this.nota.fechaEntrega,
      descripcion: this.nota.descripcion,
      nota1: this.nota.nota1 || 0,
      nota2: this.nota.nota2 || 0,
      nota3: this.nota.nota3 || 0,
      notaFinal: this.nota.notaFinal || 0,
      observaciones: this.nota.observaciones || ''
    };

    this.materia.notas.push(nuevaNota);

    // Guardar la materia actualizada en localStorage
    const materias = JSON.parse(localStorage.getItem('materias') || '[]');
    const index = materias.findIndex((m: any) => m.codigo === this.materia.codigo);
    if (index !== -1) {
      materias[index] = this.materia; // Actualizar la materia con las nuevas notas
      localStorage.setItem('materias', JSON.stringify(materias));
    }

    // Limpiar el formulario
    this.nota = {
      fechaEntrega: '',
      descripcion: '',
      nota1: 0,
      nota2: 0,
      nota3: 0,
      notaFinal: 0,
      observaciones: ''
    };

    // Redirigir a la página de detalles de la materia con la materia actualizada
    this.router.navigate(['/materia-detalle'], {
      state: { materia: this.materia }
    });
  }

  volver() {
    // Navegar de regreso a la página de detalles de la materia
    this.router.navigate(['/materia-detalle'], {
      state: { materia: this.materia }
    });
  }
}