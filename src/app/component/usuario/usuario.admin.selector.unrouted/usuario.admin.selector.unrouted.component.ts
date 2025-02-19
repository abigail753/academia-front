import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-usuario-admin-selector-unrouted',
  templateUrl: './usuario.admin.selector.unrouted.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TrimPipe,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDialogContent
  ],
  styleUrls: ['./usuario.admin.selector.unrouted.component.css']
})

export class UsuarioAdminSelectorUnroutedComponent implements OnInit {

  oPage: IPage<IUsuario> | null = null;
  //
  nPage: number = 0;
  nRpp: number = 10;
  //
  strField: string = '';
  strDir: string = '';
  //
  strSearch: string = '';
  strFiltro: string = '';
  //
  arrBotonera: string[] = [];
  //
  private debounceSubject = new Subject<string>();

  readonly dialogRef = inject(MatDialogRef<UsuarioAdminSelectorUnroutedComponent>);

  constructor(
    private oUsuarioService: UsuarioService,
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
    this.oUsuarioService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IUsuario>) => {
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
    this.debounceSubject.next(this.strSearch);
    this.strFiltro = this.strSearch;
  }

  filterSelect(event: any){
    this.strFiltro = event.value;
    this.strSearch = '';
    this.debounceSubject.next(this.strFiltro);
  }

  select(id: number) {
    this.oUsuarioService.getOne(id).subscribe((usuario: IUsuario) => {
      this.dialogRef.close(usuario);
    });
  }

}
