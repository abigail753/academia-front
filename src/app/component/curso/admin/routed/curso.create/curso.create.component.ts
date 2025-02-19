import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { ICurso } from '../../../../../model/curso.interface';
import { CursoService } from '../../../../../service/curso.service';


declare let bootstrap: any;

@Component({
  selector: 'app-curso-create',
  templateUrl: './curso.create.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule, MatButtonModule
  ],
  styleUrls: ['./curso.create.component.css']
})
export class CursoCreateComponent implements OnInit {

  id: number = 0;
  oCursoForm: FormGroup | undefined = undefined;
  oCurso: ICurso | null = null;
  strMessage: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oCursoService: CursoService,
    private oRouter: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.oCursoForm?.markAllAsTouched();
  }

  createForm() {
    this.oCursoForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),

      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),

    });
  }

  updateForm() {
    this.oCursoForm?.controls['nombre'].setValue('');
    this.oCursoForm?.controls['descripcion'].setValue('');
  }

  onReset() {
    this.updateForm();
    return false;
  }

  onSubmit() {
    if (this.oCursoForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oCursoService.create(this.oCursoForm?.value).subscribe({
        next: (oCurso: ICurso) => {
          this.oCurso = oCurso;
          this.showModal('Curso creado con el id: ' + this.oCurso.id);
        },
        error: (err) => {
          this.showModal('Error al crear el curso');
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
    this.oRouter.navigate(['/admin/curso/view/' + this.oCurso?.id]);
  }

}
