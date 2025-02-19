import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverURL, httpOptions } from '../environment/environment';
import { IExamen } from '../model/examen.interface';
import { IPage } from '../model/model.interface';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  serverURL: string = serverURL + '/examen';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IExamen>> {
    let URL: string = '';
    URL += this.serverURL;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    if (field) {
      URL += '&sort=' + field;
      if (dir === 'asc') {
        URL += ',asc';
      } else {
        URL += ',desc';
      }
    }
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<IExamen>>(URL, httpOptions);
  }

  get(id: number): Observable<IExamen> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IExamen>(URL);
  }

  getOne(id: number): Observable<IExamen> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IExamen>(URL);
  }

  create(oExamen: IExamen): Observable<IExamen> {
    oExamen.calificaciones = [];    

    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.post<IExamen>(URL, oExamen);
  }
  
  update(oExamen: IExamen): Observable<IExamen> {
    oExamen.calificaciones = [];   
    
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IExamen>(URL, oExamen);
  }

  delete(id: number) {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.delete(URL);
  }
}

