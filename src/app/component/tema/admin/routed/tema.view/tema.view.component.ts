import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ITema } from '../../../../../model/tema.interface';
import { TemaService } from '../../../../../service/tema.service';


@Component({
  selector: 'app-tema-view',
  templateUrl: './tema.view.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./tema.view.component.css']
})

export class TemaViewComponent implements OnInit {

  id: number = 0;
  route: string = '';

  oTema: ITema = {} as ITema;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oTemaService: TemaService,
    private oRouter: Router
  ) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }

  getOne() {
    this.oTemaService.getOne(this.id).subscribe({
      next: (data: ITema) => {
        this.oTema = data;
      },
    });
  }

  plist() {
    this.oRouter.navigate(['admin/tema/plist']);
  }

  delete(oTema: ITema) {
    this.oRouter.navigate(['admin/tema/delete/', oTema.id]);
  }

  edit(oTema: ITema) {
    this.oRouter.navigate(['admin/tema/edit', oTema.id]);
  }

}
