import { ICurso } from "./curso.interface";

export interface ITema {
    id: number;
    titulo: string;
    descripcion: string;
    curso:ICurso;
    calificaciones?: any;
  }
  