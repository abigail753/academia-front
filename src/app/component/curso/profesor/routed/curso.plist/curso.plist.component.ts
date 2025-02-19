import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ICurso } from '../../../../../model/curso.interface';
import { IPage } from '../../../../../model/model.interface';
import { TrimPipe } from '../../../../../pipe/trim.pipe';
import { BotoneraService } from '../../../../../service/botonera.service';
import { CursoService } from '../../../../../service/curso.service';


@Component({
  selector: 'app-curso-plist',
  templateUrl: './curso.plist.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TrimPipe,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule
  ],
  styleUrls: ['./curso.plist.component.css']
})
export class ProfCursoPlistComponent implements OnInit {

  oPage: IPage<ICurso> | null = null;
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
  exportCols: any[] = [];

  hover: boolean = false;

  constructor(
    private oCursoService: CursoService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oCursoService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<ICurso>) => {
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
  view(oCurso: ICurso) {
    this.oRouter.navigate(['profesor/curso/view', oCurso.id]);
  }

  edit(oCurso: ICurso) {
    this.oRouter.navigate(['profesor/curso/edit', oCurso.id]);
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
      head: [['Id', 'Nombre del Curso', 'Descripción']],
      body: this.oPage?.content.map((curso: ICurso) => [
        curso.id,
        curso.nombre,
        curso.descripcion
      ]),
    });

    doc.save('Lista-de-cursos.pdf');
  }
  
}
