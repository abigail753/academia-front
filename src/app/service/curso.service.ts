import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { httpOptions, serverURL } from "../environment/environment";
import { ICurso } from "../model/curso.interface";
import { Observable } from "rxjs";
import { IPage } from "../model/model.interface";

@Injectable({
    providedIn: 'root',
})

export class CursoService {

    serverURL: string = serverURL + '/curso';

    constructor(private oHttp: HttpClient) { }

    getPage(
        page: number,
        size: number,
        field: string,
        dir: string,
        filtro: string
    ): Observable<IPage<ICurso>> {
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
        return this.oHttp.get<IPage<ICurso>>(URL, httpOptions);
    }

    get(id: number): Observable<ICurso> {
        let URL: string = '';
        URL += this.serverURL;
        URL += '/' + id;
        return this.oHttp.get<ICurso>(URL);
    }

    getOne(id: number): Observable<ICurso> {
        let URL: string = '';
        URL += this.serverURL;
        URL += '/' + id;
        return this.oHttp.get<ICurso>(URL);
    }

    create(oCurso: ICurso): Observable<ICurso> {
        oCurso.inscripciones = [];
        oCurso.temas = [];

        let URL: string = '';
        URL += this.serverURL;
        return this.oHttp.post<ICurso>(URL, oCurso);
    }

    update(oCurso: ICurso): Observable<ICurso> {
        oCurso.inscripciones = [];
        oCurso.temas = [];

        let URL: string = '';
        URL += this.serverURL;
        return this.oHttp.put<ICurso>(URL, oCurso);
    }

    delete(id: number) {
        let URL: string = '';
        URL += this.serverURL;
        URL += '/' + id;
        return this.oHttp.delete(URL);
    }

}