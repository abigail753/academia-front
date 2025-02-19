import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ICurso } from '../../../../../model/curso.interface';
import { CursoService } from '../../../../../service/curso.service';


declare let bootstrap: any;

@Component({
  selector: 'app-curso-delete',
  templateUrl: './curso.delete.component.html',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./curso.delete.component.css']
})

export class CursoDeleteComponent implements OnInit {

  oCurso: ICurso | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oCursoService: CursoService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) { }


  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
        this.oCursoService.get(id).subscribe({
          next: (oCurso: ICurso) => {
            this.oCurso = oCurso;
          },
          error: (err) => {
            this.showModal('Error al cargar el curso');
          },
        });
  }

  plist () {
    this.oRouter.navigate(['admin/curso/plist']);
  }

  delete(): void {
    this.oCursoService.delete(this.oCurso!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Curso con id ' + this.oCurso!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el curso');
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
    this.oRouter.navigate(['/admin/curso/plist']);
  }

}
