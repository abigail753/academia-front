import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IExamen } from '../../../../model/examen.interface';
import { ExamenService } from '../../../../service/examen.service';

@Component({
  selector: 'app-examen-view',
  templateUrl: './examen.view.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./examen.view.component.css']
})

export class ProfExamenViewComponent implements OnInit {

  id: number = 0;
  route: string = '';

  oExamen: IExamen = {} as IExamen;

  constructor(
    private oActivatedRoute: ActivatedRoute,
        private oExamenService: ExamenService,
        private oRouter: Router 
  ) { }


  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }

  getOne() {
      this.oExamenService.getOne(this.id).subscribe({
        next: (data: IExamen) => {
          this.oExamen = data;
        },
      });
    }
  
    plist () {
      this.oRouter.navigate(['profesor/examen/plist']);
    }
    
    delete(oExamen: IExamen) {
      this.oRouter.navigate(['profesor/examen/delete/', oExamen.id]);
    }
  
    edit(oExamen: IExamen) {
      this.oRouter.navigate(['profesor/examen/edit', oExamen.id]);
    }

}
