import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IUsuario } from '../../../../../model/usuario.interface';
import { UsuarioService } from '../../../../../service/usuario.service';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

declare let bootstrap: any;


@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario.edit.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule, 
    MatButtonModule,
    FileUploadModule,
    CommonModule,
    MatSelectModule

  ],
  styleUrls: ['./usuario.edit.component.css']
})

export class ProfUsuarioEditComponent implements OnInit {

  id: number = 0;
  oUsuarioForm: FormGroup | undefined = undefined;
  oUsuario: IUsuario | null = null;
  message: string = '';

  myModal: any;

  hidePassword: boolean = true;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService,
    private oRouter: Router,
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oUsuarioForm?.markAllAsTouched();
  }

  createForm() {
    this.oUsuarioForm = new FormGroup({
      id: new FormControl('', [Validators.required]),

      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),

      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      
      correo: new FormControl('', [
        Validators.required, 
        Validators.email
      ]),

      foto: new FormControl(''),
      
      tipousuario: new FormControl('', [
        Validators.required
      ]),

      password: new FormControl ('', [
      ])

    });
  }

  get() {
    this.oUsuarioService.get(this.id).subscribe({
      next: (oUsuario: IUsuario) => {

        if (oUsuario.foto == null) {
          oUsuario.foto = 'img/SinFoto.png';
        }

        this.oUsuario = oUsuario;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateForm() {
    this.oUsuarioForm?.controls['id'].setValue(this.oUsuario?.id);
    this.oUsuarioForm?.controls['nombre'].setValue(this.oUsuario?.nombre);
    this.oUsuarioForm?.controls['apellidos'].setValue(this.oUsuario?.apellidos);
    this.oUsuarioForm?.controls['correo'].setValue(this.oUsuario?.correo);
    if (this.oUsuario?.foto === 'img/SinFoto.png') {
      this.oUsuarioForm?.controls['foto'].setValue(null);
    }

    this.oUsuarioForm?.controls['foto'].setValue(this.oUsuario?.foto);
    this.oUsuarioForm?.controls['tipousuario'].setValue(this.oUsuario?.tipousuario);
  }

   onReset() {
    this.oUsuarioService.get(this.id).subscribe({

      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  onSubmit() {
    if (!this.oUsuarioForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oUsuarioService.update(this.oUsuarioForm?.value).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.updateForm();
          this.showModal('Usuario ' + this.oUsuario.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el usuario');
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
    this.oRouter.navigate(['/profesor/usuario/view/' + this.oUsuario?.id]);
  }


}
