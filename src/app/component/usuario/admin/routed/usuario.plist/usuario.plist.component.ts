import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { IPage } from '../../../../../model/model.interface';
import { IUsuario } from '../../../../../model/usuario.interface';
import { TrimPipe } from '../../../../../pipe/trim.pipe';
import { BotoneraService } from '../../../../../service/botonera.service';
import { UsuarioService } from '../../../../../service/usuario.service';
import { TableModule } from 'primeng/table';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-usuario-plist',
  templateUrl: './usuario.plist.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TrimPipe, 
    RouterModule, 
    MatIconModule, 
    MatButtonModule, 
    MatInputModule,
    TableModule,
    MatButtonToggleModule,
    MatSelectModule
  ],
  styleUrls: ['./usuario.plist.component.css']
})

export class UsuarioPlistComponent implements OnInit {

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
  //
  exportCols: any[] = [];

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
  create ()  {
    this.oRouter.navigate(['admin/usuario/create']);
  }
  view(oUsuario: IUsuario) {
    this.oRouter.navigate(['admin/usuario/view', oUsuario.id]);
  }

  delete(oUsuario: IUsuario) {
    this.oRouter.navigate(['admin/usuario/delete/', oUsuario.id]);
  }

  edit(oUsuario: IUsuario) {
    this.oRouter.navigate(['admin/usuario/edit', oUsuario.id]);
  }

  plistCard(){
    this.oRouter.navigate(['admin/usuario/plist/card']);
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

  // npm install jspdf jspdf-autotable
  exportToPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('EduSphere', 14, 20);
    doc.text('Listado de Usuarios', 14, 30);

    // Generar tabla
    autoTable(doc, {
      startY: 35,
      head: [['Nombre', 'Apellidos', 'Correo', 'Tipo de usuario']],
      body: this.oPage?.content.map((usuario: IUsuario) => [
        usuario.nombre,
        usuario.apellidos,
        usuario.correo,
        usuario.tipousuario
      ]),
    });

    doc.save('Lista-de-usuarios.pdf');
  }



}
