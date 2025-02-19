import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { IInscripcion } from '../../../../../model/inscripcion.interface';
import { InscripcionService } from '../../../../../service/inscripcion.service';


declare let bootstrap: any;

@Component({
  selector: 'app-inscripcion-delete',
  templateUrl: './inscripcion.delete.component.html',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./inscripcion.delete.component.css']
})
export class InscripcionDeleteComponent implements OnInit {

  oInscripcion: IInscripcion | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oInscripcionService: InscripcionService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) { }

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oInscripcionService.get(id).subscribe({
      next: (oInscripcion: IInscripcion) => {
        this.oInscripcion = oInscripcion;
      },
      error: (err) => {
        this.showModal('Error al cargar el inscripcion');
      },
    });
  }

  plist() {
    this.oRouter.navigate(['admin/inscripcion/plist']);
  }

  delete(): void {
    this.oInscripcionService.delete(this.oInscripcion!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Inscripcion con id ' + this.oInscripcion!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el inscripcion');
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
    this.oRouter.navigate(['/admin/inscripcion/plist']);
  }

}
