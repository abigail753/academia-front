import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ITema } from '../../../../../model/tema.interface';
import { TemaService } from '../../../../../service/tema.service';

declare let bootstrap: any;

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema.delete.component.html',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./tema.delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  oTema: ITema | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oTemaService: TemaService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) { }

  ngOnInit(): void {
    // Se comprueba que hay un tema
    // Importante ya que se esta manipulando la BBDD
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oTemaService.get(id).subscribe({
      next: (oTema: ITema) => {
        this.oTema = oTema;
      },
      error: (err) => {
        this.showModal('Error al cargar el tema');
      },
    });
  }

  plist() {
    this.oRouter.navigate(['admin/tema/plist']);
  }

  delete(): void {
    this.oTemaService.delete(this.oTema!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Tema con id ' + this.oTema!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el tema');
      },
    });
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/tema/plist']);
  }

}
