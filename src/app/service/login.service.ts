import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  serverURL: string = serverURL + '/auth';

  constructor(private oHttp: HttpClient) { }

  login(correo: string, password: string): Observable<string> {
    const loginData = { correo: correo, password: password };
    return this.oHttp.post<string>(this.serverURL + '/login', loginData);
  }
}