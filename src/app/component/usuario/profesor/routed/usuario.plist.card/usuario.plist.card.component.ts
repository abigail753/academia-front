import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { IPage } from '../../../../../model/model.interface';
import { IUsuario } from '../../../../../model/usuario.interface';
import { BotoneraService } from '../../../../../service/botonera.service';
import { UsuarioService } from '../../../../../service/usuario.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TrimPipe } from '../../../../../pipe/trim.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-usuario-plist-card',
  templateUrl: './usuario.plist.card.component.html',
  styleUrls: ['./usuario.plist.card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule, 
    MatInputModule,
    TrimPipe,
    MatSelectModule,
    MatButtonToggleModule
  ]
})
export class ProfesorUsuarioPlistCardComponent implements OnInit {

  oPage: IPage<IUsuario> | null = null;
  //
  nPage: number = 0; // 0-based server count
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

  hover: boolean = false;

  constructor(
    private oUsuarioService: UsuarioService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
    this.getPage();});
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
          this.arrBotonera = this.oBotoneraService.getBotonera(this.nPage, oPageFromServer.totalPages);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  view(oUsuario: IUsuario) {
    this.oRouter.navigate(['profesor/usuario/view', oUsuario.id]);
  }

  edit(oUsuario: IUsuario) {
    this.oRouter.navigate(['profesor/usuario/edit', oUsuario.id]);
  }

  plistTable(){
    this.oRouter.navigate(['profesor/usuario/plist']);
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
    this.strFiltro = this.strSearch;
  }

}
