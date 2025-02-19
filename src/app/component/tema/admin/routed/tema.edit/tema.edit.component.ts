import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ICurso } from '../../../../../model/curso.interface';
import { ITema } from '../../../../../model/tema.interface';
import { CursoService } from '../../../../../service/curso.service';
import { TemaService } from '../../../../../service/tema.service';
import { CursoAdminSelectorUnroutedComponent } from '../../../../curso/curso.admin.selector.unrouted/curso.admin.selector.unrouted.component';


declare let bootstrap: any;

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema.edit.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./tema.edit.component.css']
})
export class TemaEditComponent implements OnInit {

  id: number = 0;
  oTemaForm: FormGroup | undefined = undefined;
  oTema: ITema | null = null;
  message: string = '';

  myModal: any;

  readonly dialog = inject(MatDialog);

  oCurso: ICurso = {} as ICurso;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oTemaService: TemaService,
    private oRouter: Router,

    private oCursoService: CursoService,
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
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
      id: new FormControl('', [Validators.required]),

      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),

      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),

      curso: new FormGroup({
        id: new FormControl('', Validators.required),
        nombre: new FormControl(''), 
        descripcion: new FormControl(''), 
        inscripciones: new FormControl([]),
        temas: new FormControl([]),
      })
    });
  }

  get() {
    this.oTemaService.get(this.id).subscribe({
      next: (oTema: ITema) => {
        this.oTema = oTema;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateForm() {
    this.oTemaForm?.controls['id'].setValue(this.oTema?.id);
    this.oTemaForm?.controls['titulo'].setValue(this.oTema?.titulo);
    this.oTemaForm?.controls['descripcion'].setValue(this.oTema?.descripcion);
    this.oTemaForm?.controls['curso'].setValue({
      id: this.oTema?.curso?.id,
      nombre: this.oTema?.curso?.nombre,
      descripcion: this.oTema?.curso?.descripcion,
      inscripciones: null,
      temas: null
    })
  }

  onReset() {
    this.oTemaService.get(this.id).subscribe({
      next: (oTema: ITema) => {
        this.oTema = oTema;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  onSubmit() {
    if (!this.oTemaForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oTemaService.update(this.oTemaForm?.value).subscribe({
        next: (oTema: ITema) => {
          this.oTema = oTema;
          this.updateForm();
          this.showModal('Tema ' + this.oTema.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el tema');
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
    this.oRouter.navigate(['/admin/tema/view/' + this.oTema?.id]);
  }

  showCursoSelectorModal() {
    const dialogRef = this.dialog.open(CursoAdminSelectorUnroutedComponent, {
      height: '800px',
      maxHeight: '1200px',
      width: '80%',
      maxWidth: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oTemaForm?.controls['curso'].setValue(result);
        this.oCurso = result;
        //this.animal.set(result);
      }
    });
    return false;
  }

}
