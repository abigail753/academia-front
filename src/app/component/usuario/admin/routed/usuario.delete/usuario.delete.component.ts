import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../../../../service/usuario.service';
import { IUsuario } from '../../../../../model/usuario.interface';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';

declare let bootstrap: any;

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario.delete.component.html',
  standalone: true,
  imports: [
    RouterModule, 
    MatCardModule, 
    MatChipsModule, 
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./usuario.delete.component.css']
})

export class UsuarioDeleteComponent implements OnInit {
  id: number = 0;

  oUsuario: IUsuario = {} as IUsuario;

  strMessage: string = '';
  myModal: any;

  constructor(
    private oUsuarioService: UsuarioService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) { }

  ngOnInit(): void {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
    console.log(this.oUsuario);
  }

  getOne() {
    this.oUsuarioService.getOne(this.id).subscribe({
      next: (data: IUsuario) => {
        this.oUsuario = data;
        console.log(this.oUsuario);
      },
    });
  }

  plist () {
    this.oRouter.navigate(['admin/usuario/plist']);
  }

  delete(): void {
    this.oUsuarioService.delete(this.oUsuario!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Usuario con id ' + this.oUsuario!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el usuario');
      },
    });
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
    this.oRouter.navigate(['/admin/usuario/plist']);
  }

}
