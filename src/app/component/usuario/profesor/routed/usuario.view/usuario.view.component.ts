import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IUsuario } from '../../../../../model/usuario.interface';
import { UsuarioService } from '../../../../../service/usuario.service';

@Component({
  selector: 'app-usuario-view',
  templateUrl: './usuario.view.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterModule
  ],
  styleUrls: ['./usuario.view.component.css']
})

export class ProfUsuarioViewComponent implements OnInit {

  id: number = 0;
  route: string = '';

  oUsuario: IUsuario = {} as IUsuario;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService,
    private oRouter: Router
  ) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();

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
    this.oRouter.navigate(['profesor/usuario/plist']);
  }

  edit(oUsuario: IUsuario) {
    this.oRouter.navigate(['profesor/usuario/edit', oUsuario.id]);
  }

}
