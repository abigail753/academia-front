import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionService } from "../service/session.service";
import { UsuarioService } from "../service/usuario.service";
import { IUsuario } from "../model/usuario.interface";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProfesorGuard implements CanActivate {

    constructor(private oSessionService: SessionService,
        private oUsuarioService: UsuarioService,
        private oRouter: Router) { }

    canActivate(): Observable<boolean> {
        if (this.oSessionService.isSessionActive()) {
            let correo: string = this.oSessionService.getSessionCorreo();
            // llamar al servidor para obtener el rol del usuario
            return this.oUsuarioService.getUsuarioByCorreo(correo).pipe(
                map((usuario: IUsuario) => {
                    if (usuario.tipousuario === 'Profesor') {
                        return true;
                    } else {
                        this.oRouter.navigate(['/login']);
                        return false;
                    }
                })
            );        
        } else {
            this.oRouter.navigate(['/login']);
            return new Observable<boolean>(observer => {
                observer.next(false);
                observer.complete();
            });
        }
    }

}
