export interface IUsuario {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  foto: string;
  tipousuario: string;
  password: string;
  inscripciones?:any;
  calificaciones?:any;
}
