import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { ICalificacion } from '../../../../../model/calificacion.interface';
import { IPage } from '../../../../../model/model.interface';
import { BotoneraService } from '../../../../../service/botonera.service';
import { CalificacionService } from '../../../../../service/calificacion.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UsuarioService } from '../../../../../service/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IUsuario } from '../../../../../model/usuario.interface';

@Component({
  selector: 'app-calificacion-xusuario-plist',
  templateUrl: './calificacion.xusuario.plist.component.html',
  styleUrls: ['./calificacion.xusuario.plist.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule
  ]
})
export class CalificacionXusuarioPlistComponent implements OnInit {

  oPage: IPage<ICalificacion> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  strField: string = '';
  strDir: string = '';
  //
  strFiltro: string = '';
  //
  arrBotonera: string[] = [];
  //
  private debounceSubject = new Subject<string>();
  //
  oUsuario: IUsuario = {} as IUsuario;

  exportCols: any[] = [];

  hover: boolean = false;

  constructor(
    private oCalificacionService: CalificacionService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService : UsuarioService
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });

    this.oActivatedRoute.params.subscribe((params) => {
      this.oUsuarioService.get(params['id']).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.getPage();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    })

  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oCalificacionService
      .getPageXUsuario(
        this.nPage, 
        this.nRpp, 
        this.strField, 
        this.strDir, 
        this.strFiltro,
        this.oUsuario.id)
      .subscribe({
        next: (oPageFromServer: IPage<ICalificacion>) => {
          this.oPage = oPageFromServer;
          this.arrBotonera = this.oBotoneraService.getBotonera(
            this.nPage,
            oPageFromServer.totalPages
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  create() {
    this.oRouter.navigate(['admin/calificacion/create']);
  }
  view(oCalificacion: ICalificacion) {
    this.oRouter.navigate(['admin/calificacion/view', oCalificacion.id]);
  }

  delete(oCalificacion: ICalificacion) {
    this.oRouter.navigate(['admin/calificacion/delete/', oCalificacion.id]);
  }

  edit(oCalificacion: ICalificacion) {
    this.oRouter.navigate(['admin/calificacion/edit', oCalificacion.id]);
  }

  goToPage(p: number) {
    if (p) {
      this.nPage = p - 1;
      this.getPage();
    }
    return false;
  }

  goToNext() {
    this.nPage++;
    this.getPage();
    return false;
  }

  goToPrev() {
    this.nPage--;
    this.getPage();
    return false;
  }

  sort(field: string) {
    this.strField = field;
    this.strDir = this.strDir === 'asc' ? 'desc' : 'asc';
    this.getPage();
  }

  goToRpp(nrpp: number) {
    this.nPage = 0;
    this.nRpp = nrpp;
    this.getPage();
    return false;
  }

  filter(event: KeyboardEvent) {
    this.debounceSubject.next(this.strFiltro);
  }

  exportToPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('EduSphere', 14, 20);
    doc.text('Listado de Cursos', 14, 30);

    // Generar tabla
    autoTable(doc, {
      startY: 35,
      head: [['Id', 'Calificacion', 'Fecha de evaluación', 'Usuario', 'Examen', 'Tema']],
      body: this.oPage?.content.map((calificacion: ICalificacion) => [
        calificacion.id,
        calificacion.calificacion,
        calificacion.fecha_evaluacion.toString(),
        calificacion.usuario.id,
        calificacion.examen.id,
        calificacion.tema.id
      ]),
    });

    doc.save('Lista-de-calificaciones.pdf');
  }

}
