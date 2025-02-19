import { Injectable } from '@angular/core';
import { ITema } from '../model/tema.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';
import { ICurso } from '../model/curso.interface';

@Injectable({
  providedIn: 'root',
})

export class TemaService {
  serverURL: string = serverURL + '/tema';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<ITema>> {
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
    return this.oHttp.get<IPage<ITema>>(URL, httpOptions);
  }

  getPageXExamen(idExamen: number, idProfesor: number): Observable<IPage<ITema>> {
    let URL: string = '';
    URL += this.serverURL + '/xexamen/' + idExamen + '/' + idProfesor;
    return this.oHttp.get<IPage<ITema>>(URL, httpOptions);
  }

  getPageXAlumno(idCurso: number, idAlumno: number): Observable<IPage<ITema>> {
    let URL: string = '';
    URL += this.serverURL + '/xalumno/' + idCurso + '/' + idAlumno;
    return this.oHttp.get<IPage<ITema>>(URL, httpOptions);

  }

  get(id: number): Observable<ITema> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITema>(URL);
  }
  
  getOne(id: number): Observable<ITema> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITema>(URL);
  }

  create(oTema: ITema): Observable<ITema> {

    oTema.curso.inscripciones = [];
    oTema.curso.temas = [];
    oTema.calificaciones = [];

    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.post<ITema>(URL, oTema);
  }

  delete(id: number) {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.delete(URL);
  }

  update(oTema: ITema): Observable<ITema> {

    oTema.curso.inscripciones = [];
    oTema.curso.temas = [];  

    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITema>(URL, oTema);
  }

  // CURSO
  getPageXCurso(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string,
    id_curso: number
  ): Observable<IPage<ICurso>> {
    let URL: string = '';
    URL += this.serverURL + '/xcurso/' + id_curso;
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
    return this.oHttp.get<IPage<ICurso>>(URL, httpOptions);
  }

}
