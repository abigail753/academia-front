import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ICurso } from '../../../../../model/curso.interface';
import { IInscripcion } from '../../../../../model/inscripcion.interface';
import { IUsuario } from '../../../../../model/usuario.interface';
import { CursoService } from '../../../../../service/curso.service';
import { InscripcionService } from '../../../../../service/inscripcion.service';
import { UsuarioService } from '../../../../../service/usuario.service';
import { CursoAdminSelectorUnroutedComponent } from '../../../../curso/curso.admin.selector.unrouted/curso.admin.selector.unrouted.component';
import { UsuarioAdminSelectorUnroutedComponent } from '../../../../usuario/usuario.admin.selector.unrouted/usuario.admin.selector.unrouted.component';

declare let bootstrap: any;

@Component({
  selector: 'app-inscripcion-edit',
  templateUrl: './inscripcion.edit.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
  ],
  styleUrls: ['./inscripcion.edit.component.css']
})

export class InscripcionEditComponent implements OnInit {

  id: number = 0;
  oInscripcionForm: FormGroup | undefined = undefined;
  oInscripcion: IInscripcion | null = null;

  message: string = '';

  myModal: any;

  readonly dialog = inject(MatDialog);

  oUsuario: IUsuario = {} as IUsuario;
  oCurso: ICurso = {} as ICurso;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oInscripcionService: InscripcionService,
    private oRouter: Router,

    private oUsuarioService: UsuarioService,
    private oCursoService: CursoService,
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    
    this.get();

    this.oInscripcionForm?.markAllAsTouched();

    this.oInscripcionForm?.controls['usuario'].valueChanges.subscribe(change => {
      if (change) {
        if (change.id) {
          // obtener el objeto usuario del servidor
          this.oUsuarioService.get(change.id).subscribe({
            next: (oUsuario: IUsuario) => {
              this.oUsuario = oUsuario;
              console.log(this.oUsuario);
            },

            error: (err) => {
              console.log(err);
              this.oUsuario = {} as IUsuario;
              // marcar el campo como inválido
              this.oInscripcionForm?.controls['usuario'].setErrors({
                invalid: true,
              });
            }
          });
        } else {
          this.oUsuario = {} as IUsuario;
        }
      }
    });

    this.oInscripcionForm?.controls['curso'].valueChanges.subscribe(change => {
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
              this.oInscripcionForm?.controls['curso'].setErrors({
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
  this.oInscripcionForm = new FormGroup({

    id: new FormControl('', Validators.required),

    usuario: new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      correo: new FormControl(''), 
      inscripciones: new FormControl([]),
      calificaciones: new FormControl([]),
    }),

    curso: new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl(''), 
      descripcion: new FormControl(''), 
      inscripciones: new FormControl([]),
      temas: new FormControl([]),
    }),
  });
  }

  get() {
    this.oInscripcionService.get(this.id).subscribe({
      next: (oInscripcion: IInscripcion) => {
        this.oInscripcion = oInscripcion;
        this.updateForm();

        console.log(this.oInscripcion);

      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateForm() {
    this.oInscripcionForm?.controls['id'].setValue(this.oInscripcion?.id);

    this.oInscripcionForm?.controls['usuario'].setValue({
      id: this.oInscripcion?.usuario?.id,
      nombre: this.oInscripcion?.usuario?.nombre,
      apellidos: this.oInscripcion?.usuario?.apellidos,
      correo: this.oInscripcion?.usuario?.correo,
      inscripciones: null,
      calificaciones: null
    });

    this.oInscripcionForm?.controls['curso'].setValue({
      id: this.oInscripcion?.curso?.id,
      nombre: this.oInscripcion?.curso?.nombre,
      descripcion: this.oInscripcion?.curso?.descripcion,
      inscripciones: null,
      temas: null
    })
  }

  onReset() {
    this.oInscripcionService.get(this.id).subscribe({
      next: (oInscripcion: IInscripcion) => {
        this.oInscripcion = oInscripcion;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  onSubmit() {
    if (!this.oInscripcionForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oInscripcionService.update(this.oInscripcionForm?.value).subscribe({
        next: (oInscripcion: IInscripcion) => {
          this.oInscripcion = oInscripcion;
          this.updateForm();
          this.showModal('Inscripcion ' + this.oInscripcion.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el inscripcion');
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
    this.oRouter.navigate(['/admin/inscripcion/view/' + this.oInscripcion?.id]);
  }

  showUsuarioSelectorModal() {
    const dialogRef = this.dialog.open(UsuarioAdminSelectorUnroutedComponent, {
      height: '800px',
      maxHeight: '1200px',
      width: '80%',
      maxWidth: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oInscripcionForm?.controls['usuario'].setValue(result);
        this.oUsuario = result;
        //this.animal.set(result);
      }
    });
    return false;
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
        this.oInscripcionForm?.controls['curso'].setValue(result);
        this.oCurso = result;
        //this.animal.set(result);
      }
    });
    return false;
  }

}
