import { Injectable } from '@angular/core';
import { ICalificacion } from '../model/calificacion.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})

export class CalificacionService {
  serverURL: string = serverURL + '/calificacion';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<ICalificacion>> {
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
    return this.oHttp.get<IPage<ICalificacion>>(URL, httpOptions);
  }

  getPageXUsuario(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string,
    id_usuario: number
  ): Observable<IPage<ICalificacion>> {
    let URL: string = '';
    URL += this.serverURL + '/xusuario/' + id_usuario;
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
    return this.oHttp.get<IPage<ICalificacion>>(URL, httpOptions);
  }

  get(id: number): Observable<ICalificacion> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ICalificacion>(URL);
  }
  
  getOne(id: number): Observable<ICalificacion> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ICalificacion>(URL);
  }

  create(oCalificacion: ICalificacion): Observable<ICalificacion> {

     oCalificacion.usuario.inscripciones = [];
    oCalificacion.usuario.calificaciones = [];

    oCalificacion.examen.calificaciones = [];

    oCalificacion.tema.calificaciones = [];  

    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.post<ICalificacion>(URL, oCalificacion);
  }

  delete(id: number) {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.delete(URL);
  }

  update(oCalificacion: ICalificacion): Observable<ICalificacion> {

    oCalificacion.usuario.inscripciones = [];
    oCalificacion.usuario.calificaciones = [];

    oCalificacion.examen.calificaciones = [];

    oCalificacion.tema.calificaciones = [];

    console.log ("ksajhdfkjshdfjksdfkj : "+oCalificacion);

    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ICalificacion>(URL, oCalificacion);
  }

}
