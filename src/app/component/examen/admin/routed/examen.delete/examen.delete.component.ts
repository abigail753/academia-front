import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from '../../../../../service/examen.service';
import { IExamen } from '../../../../../model/examen.interface';


declare let bootstrap: any;

@Component({
  selector: 'app-examen-delete',
  templateUrl: './examen.delete.component.html',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./examen.delete.component.css']
})
export class ExamenDeleteComponent implements OnInit {

  oExamen: IExamen | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oExamenService: ExamenService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) { }

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oExamenService.get(id).subscribe({
      next: (oExamen: IExamen) => {
        this.oExamen = oExamen;
      },
      error: (err) => {
        this.showModal('Error al cargar el examen');
      },
    });
  }

  plist() {
    this.oRouter.navigate(['admin/examen/plist']);
  }

  delete(): void {
    this.oExamenService.delete(this.oExamen!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Examen con id ' + this.oExamen!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el examen');
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
    this.oRouter.navigate(['/admin/examen/plist']);
  }

}
