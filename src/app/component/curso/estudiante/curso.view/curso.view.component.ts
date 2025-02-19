import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ICurso } from '../../../../model/curso.interface';
import { CursoService } from '../../../../service/curso.service';
import { TemaService } from '../../../../service/tema.service';
import { SessionService } from '../../../../service/session.service';
import { IUsuario } from '../../../../model/usuario.interface';
import { IPage } from '../../../../model/model.interface';
import { ITema } from '../../../../model/tema.interface';
import { UsuarioService } from '../../../../service/usuario.service';



@Component({
  selector: 'app-curso-view',
  templateUrl: './curso.view.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./curso.view.component.css']
})

export class EstudianteCursoViewComponent implements OnInit {

  id: number = 0;
  route: string = '';
  idUsuario: number = 0;

  oCurso: ICurso = {} as ICurso;
  oUsuario: IUsuario = {} as IUsuario;
  oTemas: IPage<ITema> = {} as IPage<ITema>;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCursoService: CursoService,
    private oTemaService:  TemaService,
    private oSessionService: SessionService,
    private oUsuarioService: UsuarioService,
    private oRouter: Router
  ) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
    this.getUsuario();
  }

  getOne() {
    this.oCursoService.getOne(this.id).subscribe({
      next: (data: ICurso) => {
        this.oCurso = data;
      },
    });
  }

  getPlist(){
    this.oTemaService.getPageXAlumno(this.id, this.idUsuario).subscribe({
      next: (data: IPage<ITema>) => {
        this.oTemas = data;
      },
    }) 
  }

  getUsuario(){
    this.oUsuarioService.getUsuarioByCorreo(this.oSessionService.getSessionCorreo()).subscribe({
      next: (data: IUsuario) => {
        this.idUsuario = data.id;
        this.oUsuario = data;
        this.getPlist();	

      },
    })
  }

  
  plist() {
    this.oRouter.navigate(['estudiante/curso/plist']);
  }

}
