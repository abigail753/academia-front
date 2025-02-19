import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICurso } from '../../../../../model/curso.interface';
import { CursoService } from '../../../../../service/curso.service';



declare let bootstrap: any;

@Component({
  selector: 'app-curso-edit',
  templateUrl: './curso.edit.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./curso.edit.component.css']
})
export class ProfCursoEditComponent implements OnInit {

  id: number = 0;
  oCursoForm: FormGroup | undefined = undefined;
  oCurso: ICurso | null = null;
  message: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCursoService: CursoService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.get();
    this.oCursoForm?.markAllAsTouched();
  }

  createForm() {
    this.oCursoForm = new FormGroup({
      id: new FormControl('', [Validators.required]),

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

  get() {
    this.oCursoService.get(this.id).subscribe({
      next: (oCurso: ICurso) => {
        this.oCurso = oCurso;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateForm() {
    this.oCursoForm?.controls['id'].setValue(this.oCurso?.id);
    this.oCursoForm?.controls['nombre'].setValue(this.oCurso?.nombre);
    this.oCursoForm?.controls['descripcion'].setValue(this.oCurso?.descripcion);
  }

  onReset() {
    this.oCursoService.get(this.id).subscribe({
      next: (oCurso: ICurso) => {
        this.oCurso = oCurso;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  onSubmit() {
    if (!this.oCursoForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oCursoService.update(this.oCursoForm?.value).subscribe({
        next: (oCurso: ICurso) => {
          this.oCurso = oCurso;
          this.updateForm();
          this.showModal('Curso ' + this.oCurso.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el curso');
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
    this.oRouter.navigate(['/profesor/curso/view/' + this.oCurso?.id]);
  }


}
