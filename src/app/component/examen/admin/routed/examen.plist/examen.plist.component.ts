import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { IExamen } from '../../../../../model/examen.interface';
import { IPage } from '../../../../../model/model.interface';
import { TrimPipe } from '../../../../../pipe/trim.pipe';
import { BotoneraService } from '../../../../../service/botonera.service';
import { ExamenService } from '../../../../../service/examen.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-examen-plist',
  templateUrl: './examen.plist.component.html',
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
  styleUrls: ['./examen.plist.component.css']
})
export class ExamenPlistComponent implements OnInit {

  oPage: IPage<IExamen> | null = null;
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
    private oExamenService: ExamenService,
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
    this.oExamenService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IExamen>) => {
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
    this.oRouter.navigate(['admin/examen/create']);
  }
  view(oExamen: IExamen) {
    this.oRouter.navigate(['admin/examen/view', oExamen.id]);
  }

  delete(oExamen: IExamen) {
    this.oRouter.navigate(['admin/examen/delete/', oExamen.id]);
  }

  edit(oExamen: IExamen) {
    this.oRouter.navigate(['admin/examen/edit', oExamen.id]);
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
    doc.text('Listado de Exámenes', 14, 30);

    // Generar tabla
    autoTable(doc, {
      startY: 35,
      head: [['Id', 'Nombre', 'Nº de Preguntas']],
      body: this.oPage?.content.map((examen: IExamen) => [
        examen.id,
        examen.nombre,
        examen.num_preguntas
      ]),
    });

    doc.save('Lista-de-examenes.pdf');
  }

}
