import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ICalificacion } from '../../../../../model/calificacion.interface';
import { CalificacionService } from '../../../../../service/calificacion.service';

@Component({
  selector: 'app-calificacion-view',
  templateUrl: './calificacion.view.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./calificacion.view.component.css']
})

export class CalificacionViewComponent implements OnInit {

  id: number = 0;
  route: string = '';

  oCalificacion: ICalificacion = {} as ICalificacion;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCalificacionService: CalificacionService,
    private oRouter: Router
  ) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }

  getOne() {
    this.oCalificacionService.getOne(this.id).subscribe({
      next: (data: ICalificacion) => {
        this.oCalificacion = data;
      },
    });
  }

  plist() {
    this.oRouter.navigate(['admin/calificacion/plist']);
  }

  delete(oCalificacion: ICalificacion) {
    this.oRouter.navigate(['admin/calificacion/delete/', oCalificacion.id]);
  }

  edit(oCalificacion: ICalificacion) {
    this.oRouter.navigate(['admin/calificacion/edit', oCalificacion.id]);
  }

}
