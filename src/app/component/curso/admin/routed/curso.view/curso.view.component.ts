import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ICurso } from '../../../../../model/curso.interface';
import { CursoService } from '../../../../../service/curso.service';


@Component({
  selector: 'app-curso-view',
  templateUrl: './curso.view.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./curso.view.component.css']
})

export class CursoViewComponent implements OnInit {

  id: number = 0;
  route: string = '';

  oCurso: ICurso = {} as ICurso;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCursoService: CursoService,
    private oRouter: Router
  ) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }

  getOne() {
    this.oCursoService.getOne(this.id).subscribe({
      next: (data: ICurso) => {
        this.oCurso = data;
      },
    });
  }

  plist() {
    this.oRouter.navigate(['admin/curso/plist']);
  }

  delete(oCurso: ICurso) {
    this.oRouter.navigate(['admin/curso/delete/', oCurso.id]);
  }

  edit(oCurso: ICurso) {
    this.oRouter.navigate(['admin/curso/edit', oCurso.id]);
  }

}
