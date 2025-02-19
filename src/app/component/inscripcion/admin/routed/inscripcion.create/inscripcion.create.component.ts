import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  selector: 'app-inscripcion-create',
  templateUrl: './inscripcion.create.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  styleUrls: ['./inscripcion.create.component.css']
})

export class InscripcionCreateComponent implements OnInit {

  id: number = 0;
  oInscripcionForm: FormGroup | undefined = undefined;
  oInscripcion: IInscripcion | null = null;
  strMessage: string = '';

  myModal: any;

  readonly dialog = inject(MatDialog);

  oUsuario: IUsuario = {} as IUsuario;
  oCurso: ICurso = {} as ICurso;

  constructor(
    private oInscripcionService: InscripcionService,
    private oUsuarioService: UsuarioService,
    private oCursoService: CursoService,

    private oRouter: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.oInscripcionForm?.markAllAsTouched();

    this.oInscripcionForm?.controls['usuario'].valueChanges.subscribe(change => {
      if (change) {
        if (change.id) {
          // obtener el objeto usuario del servidor
          this.oUsuarioService.get(change.id).subscribe({
            next: (oUsuario: IUsuario) => {
              this.oUsuario = oUsuario;
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
          // obtener el objeto curso del servidor
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

      usuario: new FormGroup({
        id: new FormControl('', Validators.required),
        nombre: new FormControl(''),
        apellidos: new FormControl(''),
        correo: new FormControl(''),
        foto: new FormControl(''),
        tipousuario: new FormControl(''),
        inscripciones: new FormControl([]),
        calificaciones: new FormControl([])
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

  updateForm() {
    this.oInscripcionForm?.controls['usuario'].setValue({
      id: null,
      nombre: null,
      apellidos: null,
      correo: null,
      foto: null,
      tipousuario: null,
      inscripciones: null,
      calificaciones: null
    });

    this.oInscripcionForm?.controls['curso'].setValue({
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
    if (this.oInscripcionForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oInscripcionService.create(this.oInscripcionForm?.value).subscribe({
        next: (oInscripcion: IInscripcion) => {
          this.oInscripcion = oInscripcion;
          this.showModal('Inscripcion creado con el id: ' + this.oInscripcion.id);
        },
        error: (err) => {
          this.showModal('Error al crear el inscripcion');
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
    this.oRouter.navigate(['/admin/inscripcion/view/' + this.oInscripcion?.id]);
  }

  openDialogUsuario() {
    const dialogRef = this.dialog.open(UsuarioAdminSelectorUnroutedComponent, {
      width: '850px',
      maxWidth: '850px',
    });
    dialogRef.afterClosed().subscribe(usuario => {
      console.log('The dialog was closed');
      if (usuario !== undefined) {
        console.log(usuario);
        this.oInscripcionForm?.controls['usuario'].setValue(usuario);
        this.oUsuario = usuario;
      }
    });
    return false;
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
        this.oInscripcionForm?.controls['curso'].setValue(result);
        this.oCurso = result;
      }
    });
    return false;
  }

}