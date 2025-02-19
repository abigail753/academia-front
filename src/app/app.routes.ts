import { Routes } from '@angular/router';

//Compartido
import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';
import { SharedLoginRoutedComponent } from './component/shared/shared.login.routed/shared.login.routed.component';
import { SharedLogoutRoutedComponent } from './component/shared/shared.logout.routed/shared.logout.routed.component';

//Usuario
import { UsuarioPlistComponent } from  './component/usuario/admin/routed/usuario.plist/usuario.plist.component';
import { UsuarioCreateComponent } from './component/usuario/admin/routed/usuario.create/usuario.create.component';
import { UsuarioViewComponent } from './component/usuario/admin/routed/usuario.view/usuario.view.component';
import { UsuarioDeleteComponent } from './component/usuario/admin/routed/usuario.delete/usuario.delete.component';
import { UsuarioEditComponent } from './component/usuario/admin/routed/usuario.edit/usuario.edit.component';

import { UsuarioPlistCardComponent } from './component/usuario/admin/routed/usuario.plist.card/usuario.plist.card.component';

import { ProfUsuarioPlistComponent } from './component/usuario/profesor/routed/usuario.plist/usuario.plist.component';
import { ProfUsuarioEditComponent } from './component/usuario/profesor/routed/usuario.edit/usuario.edit.component';
import { ProfUsuarioViewComponent } from './component/usuario/profesor/routed/usuario.view/usuario.view.component';
import { ProfesorUsuarioPlistCardComponent } from './component/usuario/profesor/routed/usuario.plist.card/usuario.plist.card.component';

// Curso
import { CursoPlistComponent } from './component/curso/admin/routed/curso.plist/curso.plist.component';
import { CursoViewComponent } from './component/curso/admin/routed/curso.view/curso.view.component';
import { CursoDeleteComponent } from './component/curso/admin/routed/curso.delete/curso.delete.component';
import { CursoCreateComponent } from './component/curso/admin/routed/curso.create/curso.create.component';
import { CursoEditComponent } from './component/curso/admin/routed/curso.edit/curso.edit.component';

import { ProfCursoPlistComponent } from './component/curso/profesor/routed/curso.plist/curso.plist.component';
import { ProfCursoViewComponent } from './component/curso/profesor/routed/curso.view/curso.view.component';
import { ProfCursoEditComponent } from './component/curso/profesor/routed/curso.edit/curso.edit.component';

import { EstudianteCursoPlistComponent } from './component/curso/estudiante/curso.plist/curso.plist.component';
import { EstudianteCursoViewComponent } from './component/curso/estudiante/curso.view/curso.view.component';

// Examen
import { ExamenPlistComponent } from './component/examen/admin/routed/examen.plist/examen.plist.component';
import { ExamenViewComponent } from './component/examen/admin/routed/examen.view/examen.view.component';
import { ExamenCreateComponent } from './component/examen/admin/routed/examen.create/examen.create.component';
import { ExamenEditComponent } from './component/examen/admin/routed/examen.edit/examen.edit.component';
import { ExamenDeleteComponent } from './component/examen/admin/routed/examen.delete/examen.delete.component';

import { ProfExamenPlistComponent } from './component/examen/profesor/examen.plist/examen.plist.component';
import { ProfExamenCreateComponent } from './component/examen/profesor/examen.create/examen.create.component';
import { ProfExamenDeleteComponent } from './component/examen/profesor/examen.delete/examen.delete.component';
import { ProfExamenEditComponent } from './component/examen/profesor/examen.edit/examen.edit.component';
import { ProfExamenViewComponent } from './component/examen/profesor/examen.view/examen.view.component';

// Inscripcion
import { InscripcionPlistComponent } from './component/inscripcion/admin/routed/inscripcion.plist/inscripcion.plist.component';
import { InscripcionViewComponent } from './component/inscripcion/admin/routed/inscripcion.view/inscripcion.view.component';
import { InscripcionCreateComponent } from './component/inscripcion/admin/routed/inscripcion.create/inscripcion.create.component';
import { InscripcionEditComponent } from './component/inscripcion/admin/routed/inscripcion.edit/inscripcion.edit.component';
import { InscripcionDeleteComponent } from './component/inscripcion/admin/routed/inscripcion.delete/inscripcion.delete.component';

// Tema
import { TemaPlistComponent } from './component/tema/admin/routed/tema.plist/tema.plist.component';
import { TemaCreateComponent } from './component/tema/admin/routed/tema.create/tema.create.component';
import { TemaDeleteComponent } from './component/tema/admin/routed/tema.delete/tema.delete.component';
import { TemaEditComponent } from './component/tema/admin/routed/tema.edit/tema.edit.component';
import { TemaViewComponent } from './component/tema/admin/routed/tema.view/tema.view.component';

// Calificacion
import { CalificacionPlistComponent } from './component/calificacion/admin/routed/calificacion.plist/calificacion.plist.component';
import { CalificacionCreateComponent } from './component/calificacion/admin/routed/calificacion.create/calificacion.create.component';
import { CalificacionDeleteComponent } from './component/calificacion/admin/routed/calificacion.delete/calificacion.delete.component';
import { CalificacionEditComponent } from './component/calificacion/admin/routed/calificacion.edit/calificacion.edit.component';
import { CalificacionViewComponent } from './component/calificacion/admin/routed/calificacion.view/calificacion.view.component';
import { CalificacionXusuarioPlistComponent } from './component/calificacion/admin/routed/calificacion.xusuario.plist/calificacion.xusuario.plist.component';

import { ProfCalificacionPlistComponent } from './component/calificacion/profesor/routed/calificacion.plist/calificacion.plist.component';
import { ProfCalificacionCreateComponent } from './component/calificacion/profesor/routed/calificacion.create/calificacion.create.component';

import { EstudianteCalificacionPlistComponent } from './component/calificacion/estudiante/calificacion.plist/calificacion.plist.component';

// Guards
import { AdminGuard } from './guards/admin.guard';
import { ProfesorGuard } from './guards/profesor.guard';
import { EstudianteGuard } from './guards/estudiante.guard';
import { AdminOrProfesorGuard } from './guards/admin-or-profesor.guard';

export const routes: Routes = [
    // Compartido
    { path: '', component: SharedHomeRoutedComponent },
    { path: 'home', component: SharedHomeRoutedComponent },
    { path: 'login', component: SharedLoginRoutedComponent },
    { path: 'logout', component: SharedLogoutRoutedComponent },

    // Usuario - Admin
    { path: 'admin/usuario/plist', component: UsuarioPlistComponent, canActivate: [AdminGuard] },
    { path: 'admin/usuario/create', component: UsuarioCreateComponent, canActivate: [AdminGuard] },
    { path: 'admin/usuario/view/:id' , component: UsuarioViewComponent, canActivate: [AdminGuard] },
    { path: 'admin/usuario/delete/:id' , component: UsuarioDeleteComponent, canActivate: [AdminGuard] },
    { path: 'admin/usuario/edit/:id' , component: UsuarioEditComponent, canActivate: [AdminGuard] },

    { path: 'admin/usuario/plist/card', component: UsuarioPlistCardComponent, canActivate: [AdminGuard] },

    // Usuario - Profesor
    { path: 'profesor/usuario/plist', component: ProfUsuarioPlistComponent, canActivate: [ProfesorGuard] },
    { path: 'profesor/usuario/view/:id' , component: ProfUsuarioViewComponent, canActivate: [ProfesorGuard] },
    { path: 'profesor/usuario/edit/:id' , component: ProfUsuarioEditComponent, canActivate: [ProfesorGuard] },
    { path: 'profesor/usuario/plist/card', component:ProfesorUsuarioPlistCardComponent, canActivate: [ProfesorGuard] },

    // Curso - Administrador
    { path: 'admin/curso/plist', component: CursoPlistComponent, canActivate: [AdminGuard] },
    { path: 'admin/curso/view/:id' , component: CursoViewComponent, canActivate: [AdminGuard] },
    { path: 'admin/curso/create', component: CursoCreateComponent, canActivate: [AdminGuard] },
    { path: 'admin/curso/edit/:id' , component: CursoEditComponent, canActivate: [AdminGuard]  },
    { path: 'admin/curso/delete/:id' , component: CursoDeleteComponent, canActivate: [AdminGuard] },

    // Curso - Profesor
    { path: 'profesor/curso/plist', component: ProfCursoPlistComponent, canActivate: [ProfesorGuard] },
    { path: 'profesor/curso/view/:id' , component: ProfCursoViewComponent, canActivate: [ProfesorGuard] },
    { path: 'profesor/curso/edit/:id' , component: ProfCursoEditComponent, canActivate: [ProfesorGuard] },

    // Curso - Estudiante
    { path: 'estudiante/curso/plist', component: EstudianteCursoPlistComponent, canActivate: [EstudianteGuard] },
    { path: 'estudiante/curso/view/:id', component: EstudianteCursoViewComponent, canActivate: [EstudianteGuard] },

    // Examen
    { path: 'admin/examen/plist', component: ExamenPlistComponent, canActivate: [AdminGuard] },
    { path: 'admin/examen/view/:id' , component: ExamenViewComponent, canActivate: [AdminGuard] },
    { path: 'admin/examen/create', component: ExamenCreateComponent, canActivate: [AdminGuard] },
    { path: 'admin/examen/edit/:id' , component: ExamenEditComponent, canActivate: [AdminOrProfesorGuard] },
    { path: 'admin/examen/delete/:id' , component: ExamenDeleteComponent, canActivate: [AdminGuard] },

    { path: 'profesor/examen/plist', component: ProfExamenPlistComponent, canActivate: [ProfesorGuard] },
    { path: 'profesor/examen/create', component: ProfExamenCreateComponent, canActivate: [ProfesorGuard] },
    { path: 'profesor/examen/delete/:id', component: ProfExamenDeleteComponent, canActivate: [ProfesorGuard] },
    { path: 'profesor/examen/view/:id', component: ProfExamenViewComponent, canActivate: [ProfesorGuard] },
    { path: 'profesor/examen/edit/:id', component: ProfExamenEditComponent, canActivate: [ProfesorGuard] },

    // Inscripcion
    { path: 'admin/inscripcion/plist', component: InscripcionPlistComponent, canActivate: [AdminGuard] },
    { path: 'admin/inscripcion/view/:id' , component: InscripcionViewComponent, canActivate: [AdminGuard] },
    { path: 'admin/inscripcion/create', component: InscripcionCreateComponent, canActivate: [AdminGuard] },
    { path: 'admin/inscripcion/edit/:id' , component: InscripcionEditComponent, canActivate: [AdminGuard] },
    { path: 'admin/inscripcion/delete/:id' , component: InscripcionDeleteComponent, canActivate: [AdminGuard] },
    
    // Tema
    { path: 'admin/tema/plist', component: TemaPlistComponent, canActivate: [AdminOrProfesorGuard] },
    { path: 'admin/tema/view/:id' , component: TemaViewComponent, canActivate: [AdminOrProfesorGuard] },
    { path: 'admin/tema/create', component: TemaCreateComponent, canActivate: [AdminOrProfesorGuard] },
    { path: 'admin/tema/edit/:id' , component: TemaEditComponent, canActivate: [AdminOrProfesorGuard] },
    { path: 'admin/tema/delete/:id' , component: TemaDeleteComponent, canActivate: [AdminOrProfesorGuard] },
    
    // Calificacion
    { path: 'admin/calificacion/plist', component: CalificacionPlistComponent, canActivate: [AdminGuard] },
    { path: 'admin/calificacion/view/:id' , component: CalificacionViewComponent, canActivate: [AdminOrProfesorGuard] },
    { path: 'admin/calificacion/create', component: CalificacionCreateComponent, canActivate: [AdminOrProfesorGuard] },
    { path: 'admin/calificacion/edit/:id' , component: CalificacionEditComponent, canActivate: [AdminOrProfesorGuard] },
    { path: 'admin/calificacion/delete/:id' , component: CalificacionDeleteComponent, canActivate: [AdminOrProfesorGuard] },

    { path: 'admin/calificacion/xusuario/:id', component: CalificacionXusuarioPlistComponent, canActivate: [AdminOrProfesorGuard] },

    { path: 'profesor/calificacion/plist', component: ProfCalificacionPlistComponent, canActivate: [ProfesorGuard] },
    { path: 'profesor/calificacion/create', component: ProfCalificacionCreateComponent, canActivate: [ProfesorGuard] },

    { path: 'estudiante/calificacion/plist', component: EstudianteCalificacionPlistComponent, canActivate: [EstudianteGuard] },

];
