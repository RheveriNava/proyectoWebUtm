import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { headers } from '../models/Header';
import { Profesor } from '../models/profesor.model';

@Injectable({
	providedIn: 'root'
})
export class ProfesorService {

	constructor(private http: HttpClient) { }

	list(){
		return this.http.get(`${environment.API_URI}/Profesores/`,{headers: headers});
	}
	guardarProfesor(profesor: Profesor) {
		return this.http.post(`${environment.API_URI}/profesores/create`, profesor,{headers: headers});
	}

	listOne(idProfesor: number) {
		return this.http.get(`${environment.API_URI}/Profesores/${idProfesor}`,{headers: headers});
	}

	listAutorByArticulo(idArticulo: number) {
		return this.http.get(`${environment.API_URI}/Profesores/listAutorByArticulo/${idArticulo}`,{headers: headers});
	}
	listProfesorByInstituto(idInstitutos: number){
		return this.http.get(`${environment.API_URI}/profesores/listProfesorByInstituto/${idInstitutos}`,{headers: headers});
	}
	listProfesorByCarrera(idCarrera: number){
		return this.http.get(`${environment.API_URI}/profesores/listProfesorByCarrera/${idCarrera}`,{headers: headers});
	}
	actualizarProfesor(idProfesor: number,profesor: any){
		return this.http.put(`${environment.API_URI}/Profesores/actualizar/${idProfesor}`,profesor,{headers: headers});
	}
	actualizarProfesorSinContrasena(idProfesor: number,profesor: any){
		return this.http.put(`${environment.API_URI}/Profesores/actualizarProfesorSinContrasena/${idProfesor}`,profesor,{headers: headers});
	}
	eliminarProfesor(idProfesor: number){
		return this.http.delete(`${environment.API_URI}/Profesores/eliminar/${idProfesor}`,{headers: headers});
	}
}
