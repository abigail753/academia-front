import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { IInscripcion } from '../../../../../model/inscripcion.interface';
import { IPage } from '../../../../../model/model.interface';
import { BotoneraService } from '../../../../../service/botonera.service';
import { InscripcionService } from '../../../../../service/inscripcion.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-inscripcion-plist',
  templateUrl: './inscripcion.plist.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule
  ],
  styleUrls: ['./inscripcion.plist.component.css']
})
export class InscripcionPlistComponent implements OnInit {

  oPage: IPage<IInscripcion> | null = null;
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
    private oInscripcionService: InscripcionService,
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
    this.oInscripcionService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IInscripcion>) => {
          this.oPage = oPageFromServer;
          this.arrBotonera = this.oBotoneraService.getBotonera(
            this.nPage,
            oPageFromServer.totalPages
          );
          console.log(this.oPage);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  create() {
    this.oRouter.navigate(['admin/inscripcion/create']);
  }
  view(oInscripcion: IInscripcion) {
    this.oRouter.navigate(['admin/inscripcion/view', oInscripcion.id]);
  }

  delete(oInscripcion: IInscripcion) {
    this.oRouter.navigate(['admin/inscripcion/delete/', oInscripcion.id]);
  }

  edit(oInscripcion: IInscripcion) {
    this.oRouter.navigate(['admin/inscripcion/edit', oInscripcion.id]);
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
    doc.text('Listado de Inscripciones', 14, 30);

    // Generar tabla
    autoTable(doc, {
      startY: 35,
      head: [['Id', 'Usuario', 'Curso']],
      body: this.oPage?.content.map((examen: IInscripcion) => [
        examen.id,
        examen.usuario.id,
        examen.curso.id
      ]),
    });

    doc.save('Lista-de-inscripiciones.pdf');
  }

}
