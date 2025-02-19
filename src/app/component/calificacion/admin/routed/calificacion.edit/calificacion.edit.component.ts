import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ICalificacion } from '../../../../../model/calificacion.interface';
import { IExamen } from '../../../../../model/examen.interface';
import { ITema } from '../../../../../model/tema.interface';
import { IUsuario } from '../../../../../model/usuario.interface';
import { CalificacionService } from '../../../../../service/calificacion.service';
import { ExamenService } from '../../../../../service/examen.service';
import { TemaService } from '../../../../../service/tema.service';
import { UsuarioService } from '../../../../../service/usuario.service';
import { ExamenAdminSelectorUnroutedComponent } from '../../../../examen/examen.admin.selector.unrouted/examen.admin.selector.unrouted.component';
import { TemaAdminSelectorUnroutedComponent } from '../../../../tema/tema.admin.selector.unrouted/tema.admin.selector.unrouted.component';
import { UsuarioAdminSelectorUnroutedComponent } from '../../../../usuario/usuario.admin.selector.unrouted/usuario.admin.selector.unrouted.component';

declare let bootstrap: any;

@Component({
  selector: 'app-calificacion-edit',
  templateUrl: './calificacion.edit.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calificacion.edit.component.css']
})

export class CalificacionEditComponent implements OnInit {

  id: number = 0;
  oCalificacionForm: FormGroup | undefined = undefined;
  oCalificacion: ICalificacion | null = null;
  message: string = '';

  myModal: any;

  readonly dialog = inject(MatDialog);

  oUsuario: IUsuario = {} as IUsuario;
  oExamen: IExamen = {} as IExamen;
  oTema: ITema = {} as ITema;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCalificacionService: CalificacionService,
    private oRouter: Router,

    private oUsuarioService: UsuarioService,
    private oExamenService: ExamenService,
    private oTemaService: TemaService
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oCalificacionForm?.markAllAsTouched();

    this.oCalificacionForm?.controls['usuario'].valueChanges.subscribe(change => {
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
              this.oCalificacionForm?.controls['usuario'].setErrors({
                invalid: true,
              });
            }
          });
        } else {
          this.oUsuario = {} as IUsuario;
        }
      }
    });

    this.oCalificacionForm?.controls['examen'].valueChanges.subscribe(change => {
      if (change) {
        if (change.id) {
          // obtener el objeto usuario del servidor
          this.oExamenService.get(change.id).subscribe({
            next: (oExamen: IExamen) => {
              this.oExamen = oExamen;
            },

            error: (err) => {
              console.log(err);
              this.oExamen = {} as IExamen;
              // marcar el campo como inválido
              this.oCalificacionForm?.controls['examen'].setErrors({
                invalid: true,
              });
            }
          });
        } else {
          this.oExamen = {} as IExamen;
        }
      }
    });

    this.oCalificacionForm?.controls['tema'].valueChanges.subscribe(change => {
      if (change) {
        if (change.id) {
          // obtener el objeto usuario del servidor
          this.oTemaService.get(change.id).subscribe({
            next: (oTema: ITema) => {
              this.oTema = oTema;
            },

            error: (err) => {
              console.log(err);
              this.oTema = {} as ITema;
              // marcar el campo como inválido
              this.oCalificacionForm?.controls['tema'].setErrors({
                invalid: true,
              });
            }
          });
        } else {
          this.oTema = {} as ITema;
        }
      }
    });

  }

  createForm() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    this.oCalificacionForm = new FormGroup({
      id: new FormControl('', [Validators.required]),

      calificacion: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{1,2}(\\.\\d{1,2})?$')
      ]),

      fecha_evaluacion: new FormControl(formattedDate, [Validators.required]),

      usuario: new FormGroup({
        id: new FormControl('', Validators.required),
        nombre: new FormControl(''),
        apellidos: new FormControl(''),
        correo: new FormControl(''),
        foto: new FormControl(''),
        tipousuario: new FormControl(''),
        inscripciones: new FormControl([]),
        calificaciones: new FormControl([]),
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

  get() {
    this.oCalificacionService.get(this.id).subscribe({
      next: (oCalificacion: ICalificacion) => {
        this.oCalificacion = oCalificacion;

        this.updateForm();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  updateForm() {
    this.oCalificacionForm?.controls['id'].setValue(this.oCalificacion?.id);
    this.oCalificacionForm?.controls['calificacion'].setValue(this.oCalificacion?.calificacion);

    // Convierte la fecha a un objeto Date, si es necesario
    const fechaEvaluacion = new Date(this.oCalificacion?.fecha_evaluacion || '');
    this.oCalificacionForm?.controls['fecha_evaluacion'].setValue(fechaEvaluacion);

    this.oCalificacionForm?.controls['usuario'].setValue({
      id: this.oCalificacion?.usuario?.id,
      nombre: this.oCalificacion?.usuario?.nombre,
      apellidos: this.oCalificacion?.usuario?.apellidos,
      correo: this.oCalificacion?.usuario?.correo,
      foto: this.oCalificacion?.usuario?.foto,
      tipousuario: this.oCalificacion?.usuario?.tipousuario,
      inscripciones: null,
      calificaciones: null
    });

    this.oCalificacionForm?.controls['examen'].setValue({
      id: this.oCalificacion?.examen?.id,
      nombre: this.oCalificacion?.examen?.nombre,
      num_preguntas: this.oCalificacion?.examen?.num_preguntas,
      calificaciones: null
    });
    this.oCalificacionForm?.controls['tema'].setValue({
      id: this.oCalificacion?.tema?.id,
      titulo: this.oCalificacion?.tema?.titulo,
      descripcion: this.oCalificacion?.tema?.descripcion,
      curso: this.oCalificacion?.tema?.curso,
      calificaciones: null
    });
  }

  onReset() {
    this.oCalificacionService.get(this.id).subscribe({
      next: (oCalificacion: ICalificacion) => {
        this.oCalificacion = oCalificacion;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  onDateChange(event: any) {
    if (event.value) {
      let fechaEvaluacion = this.oCalificacionForm?.value.fecha_evaluacion;

      // Si la fecha es un objeto Date, la convertimos a formato yyyy-MM-dd (sin hora ni zona horaria)
      if (fechaEvaluacion instanceof Date) {
        // Convertir el Date a formato 'yyyy-MM-dd'
        fechaEvaluacion = fechaEvaluacion.toLocaleDateString('en-CA'); // Formato yyyy-MM-dd
      }

      // Actualizamos el valor de la fecha en el formulario para enviar al backend
      this.oCalificacionForm?.controls['fecha_evaluacion'].setValue(fechaEvaluacion);
    }
  }

  onSubmit() {
    if (!this.oCalificacionForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {

      let fechaEvaluacion = this.oCalificacionForm?.value.fecha_evaluacion;

      // Si la fecha es un objeto Date, la convertimos a formato yyyy-MM-dd (sin hora ni zona horaria)
      if (fechaEvaluacion instanceof Date) {
        // Convertir el Date a formato 'yyyy-MM-dd'
        fechaEvaluacion = fechaEvaluacion.toLocaleDateString('en-CA'); // Formato yyyy-MM-dd
      }

      // Actualizamos el valor de la fecha en el formulario para enviar al backend
      this.oCalificacionForm?.controls['fecha_evaluacion'].setValue(fechaEvaluacion);

      console.log(fechaEvaluacion);

      this.oCalificacionService.update(this.oCalificacionForm?.value).subscribe({
        next: (oCalificacion: ICalificacion) => {
          this.oCalificacion = oCalificacion;
          this.updateForm();
          this.showModal('Calificacion ' + this.oCalificacion.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar la calificacion');
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
    this.oRouter.navigate(['/admin/calificacion/view/' + this.oCalificacion?.id]);
  }

  showUsuarioSelectorModal() {
    const dialogRef = this.dialog.open(UsuarioAdminSelectorUnroutedComponent, {
      width: '850px',
      maxWidth: '850px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oCalificacionForm?.controls['usuario'].setValue(result);
        this.oUsuario = result;
        //this.animal.set(result);
      }
    });
    return false;
  }

  showExamenSelectorModal() {
    const dialogRef = this.dialog.open(ExamenAdminSelectorUnroutedComponent, {
      width: '850px',
      maxWidth: '850px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oCalificacionForm?.controls['examen'].setValue(result);
        this.oUsuario = result;
        //this.animal.set(result);
      }
    });
    return false;
  }

  showTemaSelectorModal() {
    const dialogRef = this.dialog.open(TemaAdminSelectorUnroutedComponent, {
      width: '850px',
      maxWidth: '850px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oCalificacionForm?.controls['tema'].setValue(result);
        this.oUsuario = result;
        //this.animal.set(result);
      }
    });
    return false;
  }

}
