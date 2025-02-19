import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IInscripcion } from '../../../../../model/inscripcion.interface';
import { InscripcionService } from '../../../../../service/inscripcion.service';


@Component({
  selector: 'app-inscripcion-view',
  templateUrl: './inscripcion.view.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./inscripcion.view.component.css']
})
export class InscripcionViewComponent implements OnInit {

  id: number = 0;
  route: string = '';

  oInscripcion: IInscripcion = {} as IInscripcion;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oInscripcionService: InscripcionService,
    private oRouter: Router
  ) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }

  getOne() {
    this.oInscripcionService.getOne(this.id).subscribe({
      next: (data: IInscripcion) => {
        this.oInscripcion = data;
      },
    });
  }

  plist() {
    this.oRouter.navigate(['admin/inscripcion/plist']);
  }

  delete(oInscripcion: IInscripcion) {
    this.oRouter.navigate(['admin/inscripcion/delete/', oInscripcion.id]);
  }

  edit(oInscripcion: IInscripcion) {
    this.oRouter.navigate(['admin/inscripcion/edit', oInscripcion.id]);
  }

}
