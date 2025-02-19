import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { StepperModule } from 'primeng/stepper';
import { ICalificacion } from '../../../../model/calificacion.interface';
import { IExamen } from '../../../../model/examen.interface';
import { ITema } from '../../../../model/tema.interface';
import { IUsuario } from '../../../../model/usuario.interface';
import { CalificacionService } from '../../../../service/calificacion.service';
import { ExamenService } from '../../../../service/examen.service';
import { SessionService } from '../../../../service/session.service';
import { UsuarioService } from '../../../../service/usuario.service';
import { TemaAdminSelectorUnroutedComponent } from '../../../tema/tema.admin.selector.unrouted/tema.admin.selector.unrouted.component';


declare let bootstrap: any;

@Component({
  selector: 'app-exame-create',
  templateUrl: './examen.create.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule, MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    StepperModule
  ],
  styleUrls: ['./examen.create.component.css']
})
export class ProfExamenCreateComponent implements OnInit {

  oExamenForm: FormGroup | undefined = undefined;
  oExamen: IExamen | null = null;
  strMessage: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  readonly dialog = inject(MatDialog);

  coleccion: string = '';

  oTema: ITema = {} as ITema;
  oTemaForm: FormGroup | undefined = undefined;

  temasSeleccionados: Map<number, ITema> = new Map();

  oCalificacion: ICalificacion = {} as ICalificacion;

  oCalificacionForm: FormGroup | undefined = undefined;

  constructor(
    private oExamenService: ExamenService,
    private oRouter: Router,
    private oCalificacionService: CalificacionService,
    private oSessionService: SessionService,
    private oUsuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.createForm();
    this.createFormCalificacion();
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

    this.oTemaForm = new FormGroup({
      id: new FormControl('', Validators.required),
      titulo: new FormControl(''),
      descripcion: new FormControl(''),
      curso: new FormControl(''),
      calificaciones: new FormControl([]),
      coleccion: new FormControl(''),
    });

  }

  updateForm() {
    this.oExamenForm?.controls['nombre'].setValue('');
    this.oExamenForm?.controls['num_preguntas'].setValue('');

    this.coleccion = '';
    this.temasSeleccionados.clear();
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
          this.crearCalificaciones(oExamen.id);
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
  }

  openDialogTema() {

    const dialogRef = this.dialog.open(TemaAdminSelectorUnroutedComponent, {
      width: '850px',
      maxWidth: '850px',
    });

    dialogRef.afterClosed().subscribe(tema => {

      const nextKey = this.temasSeleccionados.size;
      this.temasSeleccionados.set(nextKey, tema);

      this.coleccion += (this.coleccion ? ", " : "") + tema.id;

      console.log(this.temasSeleccionados);
      console.log(this.coleccion);
    });
    return false;
  }

  crearCalificaciones(idExamen: number) {
    this.temasSeleccionados.forEach((tema: ITema) => {

      this.oUsuarioService.getUsuarioByCorreo(this.oSessionService.getSessionCorreo()).subscribe({
        next: (usuario: IUsuario) => {
          this.oExamenService.get(idExamen).subscribe({
            next: (oExamen: IExamen) => {
              this.oCalificacionForm?.controls['fecha_evaluacion'].setValue(new Date().toLocaleDateString('en-CA'));

              this.oCalificacionForm?.controls['examen'].setValue(oExamen);
              this.oCalificacionForm?.controls['tema'].setValue(tema);
              this.oCalificacionForm?.controls['usuario'].setValue(usuario);

              this.oCalificacionService.create(this.oCalificacionForm?.value).subscribe({
                next: () => {
                  this.showModal('Examen creado con el id: ' + this.oExamen?.id);
                },

                error: (err) => {
                  this.showModal('Error al crear el calificacion, se eliminará el examen creado');
                  this.delete();
                }
              });
            },
            error: (err) => {
              console.log('Error obteniendo examen:', err),
                this.delete();
            }
          });
        },
        error: (err) => {
          console.log('Error obteniendo usuario:', err),
            this.delete();
        }
      });
    });
  }


  createFormCalificacion() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    this.oCalificacionForm = new FormGroup({
      calificacion: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(10)
      ]),

      fecha_evaluacion: new FormControl(formattedDate),

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

      examen: new FormGroup({
        id: new FormControl('', Validators.required),
        nombre: new FormControl(''),
        num_preguntas: new FormControl(''),
        calificaciones: new FormControl([]),
      }),

      tema: new FormGroup({
        id: new FormControl('', Validators.required),
        titulo: new FormControl(''),
        descripcion: new FormControl(''),
        curso: new FormControl(''),
        calificaciones: new FormControl([]),
      }),
    });
  }

  delete(): void {
    this.oExamenService.delete(this.oExamen!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Examen con id ' + this.oExamen!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el examen');
      },
    });
  }
}