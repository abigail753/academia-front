import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { IExamen } from '../../../../model/examen.interface';
import { ExamenService } from '../../../../service/examen.service';


declare let bootstrap: any;

@Component({
  selector: 'app-examen-edit',
  templateUrl: './examen.edit.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./examen.edit.component.css']
})

export class ProfExamenEditComponent implements OnInit {

  id: number = 0;
  oExamenForm: FormGroup | undefined = undefined;
  oExamen: IExamen | null = null;
  message: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oExamenService: ExamenService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oExamenForm?.markAllAsTouched();
  }

  createForm() {
    this.oExamenForm = new FormGroup({
      id: new FormControl('', [Validators.required]),

      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),

      num_preguntas: new FormControl('', [
        Validators.required,
        Validators.min(5),
        Validators.max(20),
        Validators.pattern(/^\d+$/)
      ]),
    });
  }

  get() {
    this.oExamenService.get(this.id).subscribe({
      next: (oExamen: IExamen) => {
        this.oExamen = oExamen;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateForm() {
    this.oExamenForm?.controls['id'].setValue(this.oExamen?.id);
    this.oExamenForm?.controls['nombre'].setValue(this.oExamen?.nombre);
    this.oExamenForm?.controls['num_preguntas'].setValue(this.oExamen?.num_preguntas);
  }

  onReset() {
    this.oExamenService.get(this.id).subscribe({
      next: (oExamen: IExamen) => {
        this.oExamen = oExamen;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  onSubmit() {
    if (!this.oExamenForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oExamenService.update(this.oExamenForm?.value).subscribe({
        next: (oExamen: IExamen) => {
          this.oExamen = oExamen;
          this.updateForm();
          this.showModal('Examen ' + this.oExamen.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el examen');
          console.error(error);
        },
      });
    }
  }

  showModal(mensaje: string) {
    this.message = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/profesor/examen/view/' + this.oExamen?.id]);
  }

}

