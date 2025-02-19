import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverURL, httpOptions } from '../environment/environment';
import { IInscripcion } from '../model/inscripcion.interface';
import { IPage } from '../model/model.interface';
import { IUsuario } from '../model/usuario.interface';
import { ICurso } from '../model/curso.interface';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  serverURL: string = serverURL + '/inscripcion';

  constructor(private oHttp: HttpClient) { }

getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IInscripcion>> {
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
    return this.oHttp.get<IPage<IInscripcion>>(URL, httpOptions);
  }

  get(id: number): Observable<IInscripcion> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IInscripcion>(URL);
  }
  
  getOne(id: number): Observable<IInscripcion> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IInscripcion>(URL);
  }

  create(oInscripcion: IInscripcion): Observable<IInscripcion> {

    oInscripcion.usuario.inscripciones = [];
    oInscripcion.usuario.calificaciones = [];

    oInscripcion.curso.inscripciones = [];
    oInscripcion.curso.temas = [];

    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.post<IInscripcion>(URL, oInscripcion);
  }

  delete(id: number) {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.delete(URL);
  }

  update(oInscripcion: IInscripcion): Observable<IInscripcion> {

    oInscripcion.usuario.inscripciones = [];
    oInscripcion.usuario.calificaciones = [];

    oInscripcion.curso.inscripciones = [];
    oInscripcion.curso.temas = [];

    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IInscripcion>(URL, oInscripcion);
  }

  // USUARIO
  getPageXUsuario(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string,
    id_usuario: number
  ): Observable<IPage<IUsuario>> {
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
    return this.oHttp.get<IPage<IUsuario>>(URL, httpOptions);
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
