import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { headers } from '../models/Header';

@Injectable({
	providedIn: 'root'
})
export class ArticuloService {

	constructor(private http: HttpClient) { }
	listArticulosByInsituto(idInstituto: number) {
		return this.http.get(`${environment.API_URI}/Articulo/articulosByInsituto/${idInstituto}`, {headers: headers});
	}
	listarticulosByCarrera(idCarrera: number) {
		return this.http.get(`${environment.API_URI}/Articulo/articulosByCarrera/${idCarrera}`, {headers: headers});
	}
	listByPeriodo(ini : any, fin : any){
		console.log(ini,fin)
		return this.http.get(`${environment.API_URI}/Articulo/listByPeriodo/${ini}/${fin}`, {headers: headers});
	}
	create(articulo : any,idProfesor: number){
		return this.http.post(`${environment.API_URI}/Articulo/create/${idProfesor}`,articulo, {headers: headers});
	}
	actualizarArticulo(articulo : any){ 
		return this.http.put(`${environment.API_URI}/Articulo/actualizar/${articulo.idArticulo}`,articulo, {headers: headers});
	}
	listArticulosByProfesorByPeriodo(idProfesor: number,ini : any, fin : any){
		return this.http.get(`${environment.API_URI}/Articulo/listArticulosByProfesorByPeriodo/${idProfesor}/${ini}/${fin}`, {headers: headers});
	}
	listArticulosByInstitutoByPeriodo(idInstituto: number,ini : any, fin : any){
		return this.http.get(`${environment.API_URI}/Articulo/listArticulosByInstitutoByPeriodo/${idInstituto}/${ini}/${fin}`, {headers: headers});
	}
	listArticulosAllByInstitutoByPeriodo(ini : any, fin : any){
		return this.http.get(`${environment.API_URI}/Articulo/listArticulosAllByInstitutoByPeriodo/${ini}/${fin}`, {headers: headers});
	}
	eliminarProfesorByArticulo(idProfesor: number,idArticulo:number){
		return this.http.delete(`${environment.API_URI}/articuloYprofesor/eliminarProfesorByArticulo/${idProfesor}/${idArticulo}`, {headers: headers});
	}
	createArticuloYprofesor(articuloYprofesor : any){
		return this.http.post(`${environment.API_URI}/articuloYprofesor/create`,articuloYprofesor, {headers: headers});
	}
	/*listOneByNombre(titulo : any){
		return this.http.get(`${environment.API_URI}/Articulo/listOneByNombre/${titulo}`, {headers: headers});
	}*/
	actualizarPosicionofArticuloYProfesor(pos : any,idProfesor: number,idArticulo:number){
		return this.http.put(`${environment.API_URI}/articuloYprofesor/actualizarPosicionofArticuloYProfesor/${idProfesor}/${idArticulo}`,pos, {headers: headers});
	}
}