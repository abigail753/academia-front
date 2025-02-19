import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { IExamen } from '../../../../../model/examen.interface';
import { ExamenService } from '../../../../../service/examen.service';

declare let bootstrap: any;

@Component({
  selector: 'app-exame-create',
  templateUrl: './examen.create.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule, MatButtonModule
  ],
  styleUrls: ['./examen.create.component.css']
})
export class ExamenCreateComponent implements OnInit {

  id: number = 0;
  oExamenForm: FormGroup | undefined = undefined;
  oExamen: IExamen | null = null;
  strMessage: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oExamenService: ExamenService,
    private oRouter: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.oExamenForm?.markAllAsTouched();
  }

  createForm() {
    this.oExamenForm = new FormGroup({
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

  updateForm() {
    this.oExamenForm?.controls['nombre'].setValue('');
    this.oExamenForm?.controls['num_preguntas'].setValue('');
  }

  onReset() {
    this.updateForm();
    return false;
  }

  onSubmit() {
    if (this.oExamenForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oExamenService.create(this.oExamenForm?.value).subscribe({
        next: (oExamen: IExamen) => {
          this.oExamen = oExamen;
          this.showModal('Examen creado con el id: ' + this.oExamen.id);
        },
        error: (err) => {
          this.showModal('Error al crear el examen');
          console.log(err);
        },
      });
    }
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/examen/view/' + this.oExamen?.id]);
  }

}