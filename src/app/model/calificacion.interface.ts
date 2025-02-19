import { IExamen } from "./examen.interface";
import { ITema } from "./tema.interface";
import { IUsuario } from "./usuario.interface";

export interface ICalificacion {
    id: number,
    calificacion: number,
    fecha_evaluacion: Date,
    usuario: IUsuario,
    examen: IExamen,
    tema: ITema
}