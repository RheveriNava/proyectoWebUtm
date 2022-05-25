import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { MateriasComponent } from './components/materias/materias.component';
import { ProfesoresViceComponent } from './components/profesores-vice/profesores-vice.component';
import { InstitutosViceComponent } from './components/institutos-vice/institutos-vice.component';
import { CarrerasViceComponent } from './components/carreras-vice/carreras-vice.component';
import { ProfesoresJefeComponent } from './components/profesores-jefe/profesores-jefe.component';
import { ArticulosDirectorComponent } from './components/articulos-director/articulos-director.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { EventosViceComponent } from './components/eventos-vice/eventos-vice.component';
import { ActividadesViceComponent } from './components/actividades-vice/actividades-vice.component';
import { ActividadesDirectorComponent } from './components/actividades-director/actividades-director.component';
import { EventosDirectorComponent } from './components/eventos-director/eventos-director.component';
import { ImprimirArticulosComponent } from './components/imprimir-articulos/imprimir-articulos.component';
import { ImprimirActividadesComponent } from './components/imprimir-actividades/imprimir-actividades.component'
import { ImprimirEventosComponent } from './components/imprimir-eventos/imprimir-eventos.component';

const routes: Routes = [
	{
		path: "",
		redirectTo: "/login",
		pathMatch: "full"
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'recuperar/:token',
		component: RecuperarComponent,
	},
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{
				path: 'generales/:idProfesor',
				component: GeneralesComponent,
			},{
				path: 'articulos/:idProfesor', /*dos puntos es para un atributo*/ 
				component: ArticulosComponent,
			},{
				path: 'articulosVice/:idProfesor',
				component: ArticulosViceComponent,
			},{
				path: 'articulosDirector/:idProfesor',
				component: ArticulosDirectorComponent,
			},{
				path: 'profesoresVice/:idProfesor',
				component: ProfesoresViceComponent,
			},{
				path: 'profesoresJefe/:idProfesor',
				component: ProfesoresJefeComponent,
			},{
				path: 'carrerasVice/:idProfesor',
				component: CarrerasViceComponent,
			},{
				path: 'institutosVice/:idProfesor',
				component: InstitutosViceComponent,
			},{
				path: 'materias/:idProfesor',
				component: MateriasComponent,
			},{
				path: 'eventos/:idProfesor',
				component: EventosComponent,
			},{
				path: 'eventosVice/:idProfesor',
				component: EventosViceComponent,
			},{
				path: 'eventosDirector/:idProfesor',
				component: EventosDirectorComponent,
			},{
				path: 'actividades/:idProfesor',
				component: ActividadesComponent,
			},{
				path: 'actividadesVice/:idProfesor',
				component: ActividadesViceComponent,
			},{
				path: 'actividadesDirector/:idProfesor',
				component: ActividadesDirectorComponent,
			},{
				path: 'imprimirArticulos/:idProfesor',
				component: ImprimirArticulosComponent,
			},{
				path: 'imprimirActividades/:idProfesor',
				component: ImprimirActividadesComponent,
			},{
				path: 'imprimirEventos/:idProfesor',
				component: ImprimirEventosComponent,
			}
		]
	},
	{
		path: 'profesor',
		component: ProfesorComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
