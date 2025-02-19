import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ICurso } from '../../../../../model/curso.interface';
import { ITema } from '../../../../../model/tema.interface';
import { CursoService } from '../../../../../service/curso.service';
import { TemaService } from '../../../../../service/tema.service';
import { CursoAdminSelectorUnroutedComponent } from '../../../../curso/curso.admin.selector.unrouted/curso.admin.selector.unrouted.component';

declare let bootstrap: any;

@Component({
  selector: 'app-tema-create',
  templateUrl: './tema.create.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./tema.create.component.css']
})

export class TemaCreateComponent implements OnInit {

  id: number = 0;
  oTemaForm: FormGroup | undefined = undefined;
  oTema: ITema | null = null;
  strMessage: string = '';

  myModal: any;

  readonly dialog = inject(MatDialog);

  oCurso: ICurso = {} as ICurso;

  constructor(
    private oTemaService: TemaService,
    private oCursoService: CursoService,

    private oRouter: Router,
  ) { }

  ngOnInit() {
    this.createForm();
    this.oTemaForm?.markAllAsTouched();

    this.oTemaForm?.controls['curso'].valueChanges.subscribe(change => {
      if (change) {
        if (change.id) {
          // obtener el objeto usuario del servidor
          this.oCursoService.get(change.id).subscribe({
            next: (oCurso: ICurso) => {
              this.oCurso = oCurso;
            },

            error: (err) => {
              console.log(err);
              this.oCurso = {} as ICurso;
              // marcar el campo como inválido
              this.oTemaForm?.controls['curso'].setErrors({
                invalid: true,
              });
            }
          });
        } else {
          this.oCurso = {} as ICurso;
        }
      }
    });

  }

  createForm() {
    this.oTemaForm = new FormGroup({

      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),

      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),

      curso: new FormGroup({
        id: new FormControl('', Validators.required),
        nombre: new FormControl(''), 
        descripcion: new FormControl(''), 
        inscripciones: new FormControl([]),
        temas: new FormControl([]),
      }),

    });
  }

  updateForm() {
    this.oTemaForm?.controls['titulo'].setValue('');

    this.oTemaForm?.controls['descripcion'].setValue('');

    this.oTemaForm?.controls['curso'].setValue({
      id: null,
      nombre: null,
      descripcion: null,
      inscripciones: null,
      temas: null
    });
  }

  onReset() {
    this.updateForm();
    return false;
  }

  onSubmit() {
    if (this.oTemaForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oTemaService.create(this.oTemaForm?.value).subscribe({
        next: (oTema: ITema) => {
          this.oTema = oTema;
          this.showModal('Tema creado con el id: ' + this.oTema.id);
        },
        error: (err) => {
          this.showModal('Error al crear el tema');
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
    this.oRouter.navigate(['/admin/tema/view/' + this.oTema?.id]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CursoAdminSelectorUnroutedComponent, {
      width: '850px',
      maxWidth: '850px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oTemaForm?.controls['curso'].setValue(result);
        this.oCurso = result;
      }
    });
    return false;
  }
}


