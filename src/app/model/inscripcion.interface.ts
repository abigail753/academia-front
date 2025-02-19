import { ICurso } from "./curso.interface";
import { IUsuario } from "./usuario.interface";

export interface IInscripcion {
    id: number;
    usuario: IUsuario;
    curso: ICurso;
}
  