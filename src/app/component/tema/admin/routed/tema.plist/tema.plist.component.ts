import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { IPage } from '../../../../../model/model.interface';
import { ITema } from '../../../../../model/tema.interface';
import { TrimPipe } from '../../../../../pipe/trim.pipe';
import { BotoneraService } from '../../../../../service/botonera.service';
import { TemaService } from '../../../../../service/tema.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-tema-plist',
  templateUrl: './tema.plist.component.html',
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
  styleUrls: ['./tema.plist.component.css']
})
export class TemaPlistComponent implements OnInit {

  oPage: IPage<ITema> | null = null;
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
    private oTemaService: TemaService,
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
    this.oTemaService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<ITema>) => {
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
    this.oRouter.navigate(['admin/tema/create']);
  }
  view(oTema: ITema) {
    this.oRouter.navigate(['admin/tema/view', oTema.id]);
  }

  delete(oTema: ITema) {
    this.oRouter.navigate(['admin/tema/delete/', oTema.id]);
  }

  edit(oTema: ITema) {
    this.oRouter.navigate(['admin/tema/edit', oTema.id]);
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
      head: [['Id', 'Titulo', 'Descripción del Tema', 'Curso']],
      body: this.oPage?.content.map((tema: ITema) => [
        tema.id,
        tema.titulo,
        tema.descripcion,
        tema.curso.id
      ]),
    });

    doc.save('Lista-de-cursos.pdf');
  }

}
