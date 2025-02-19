import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IUsuario } from '../../../../../model/usuario.interface';
import { UsuarioService } from '../../../../../service/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

//Imagen
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';

declare let bootstrap: any;

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario.create.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    FileUploadModule,
    ButtonModule,
    ToastModule
  ],
  styleUrls: ['./usuario.create.component.css'],
  providers: [MessageService]
})

export class UsuarioCreateComponent implements OnInit {

  id: number = 0;
  oUsuarioForm: FormGroup | undefined = undefined;
  oUsuario: IUsuario | null = null;
  strMessage: string = '';
  image: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  hidePassword: boolean = true;


  constructor(
    private oUsuarioService: UsuarioService,
    private oRouter: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.oUsuarioForm?.markAllAsTouched();
    this.clearImage();
  }

  createForm() {
    this.oUsuarioForm = new FormGroup({
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
        Validators.required, Validators.email
      ]),

      foto: new FormControl(''),

      tipousuario: new FormControl('', [
        Validators.required,
      ]),

      password: new FormControl ('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ])

    });
  }

  updateForm() {
    this.oUsuarioForm?.controls['nombre'].setValue('');
    this.oUsuarioForm?.controls['apellidos'].setValue('');
    this.oUsuarioForm?.controls['correo'].setValue('');
    this.oUsuarioForm?.controls['foto'].setValue('');
    this.oUsuarioForm?.controls['tipousuario'].setValue('');
    this.oUsuarioForm?.controls['password'].setValue('');
  }

  onReset() {
    this.updateForm();
    return false;
  }

  onSubmit() {
    if (this.oUsuarioForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {

      if (this.oUsuarioForm?.value.foto == '') {
        this.oUsuarioForm.value.foto = null;
      }

      this.oUsuarioService.create(this.oUsuarioForm?.value).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.showModal('Usuario creado con el id: ' + this.oUsuario.id);
        },
        error: (err) => {
          this.showModal('Error al crear el usuario');
          console.log(err);
          console.log(this.oUsuarioForm?.value);
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
    this.oRouter.navigate(['/admin/usuario/view/' + this.oUsuario?.id]);
  }

  clearImage() {
    this.image = 'img/SinFoto.png';
  }

  onFileSelect(event: any): void {
    // Obtenemos el archivo seleccionado
    const file = event.files[0];

    if (file) {
      // Convertimos el archivo a base64
      const maxlength = 1000000;
      if (file.size > maxlength) {
        this.showModal('El archivo es demasiado grande');
        this.image = '';
        return;
      } else {
        this.convertToBase64(file).then(base64 => {
          // Asignamos el base64 a la propiedad foto
          this.oUsuarioForm?.controls['foto'].setValue(base64);
          this.image = base64;
        });
      }
    }
  }

  // Convertir archivo a base64
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);  // Resolvemos con el base64
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);  // Leemos el archivo como una URL en base64
    });
  }

}


