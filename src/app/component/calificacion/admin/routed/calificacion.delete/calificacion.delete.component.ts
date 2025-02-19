import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICalificacion } from '../../../../../model/calificacion.interface';
import { CalificacionService } from '../../../../../service/calificacion.service';

declare let bootstrap: any;

@Component({
  selector: 'app-calificacion-delete',
  templateUrl: './calificacion.delete.component.html',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./calificacion.delete.component.css']
})
export class CalificacionDeleteComponent implements OnInit {

  oCalificacion: ICalificacion | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oCalificacionService: CalificacionService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) { }

  ngOnInit(): void {
    // Se comprueba que hay un calificacion
    // Importante ya que se esta manipulando la BBDD
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oCalificacionService.get(id).subscribe({
      next: (oCalificacion: ICalificacion) => {
        this.oCalificacion = oCalificacion;
      },
      error: (err) => {
        this.showModal('Error al cargar el calificacion');
      },
    });
  }

  plist() {
    this.oRouter.navigate(['admin/calificacion/plist']);
  }

  delete(): void {
    this.oCalificacionService.delete(this.oCalificacion!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Calificacion con id ' + this.oCalificacion!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el calificacion');
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
    this.oRouter.navigate(['/admin/calificacion/plist']);
  }

}
