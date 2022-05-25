import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { headers } from '../models/Header';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http: HttpClient) { }
  	create(actividades : any,idProfesor: number){
		return this.http.post(`${environment.API_URI}/Actividades/create/${idProfesor}`,actividades, {headers: headers});
	}
	actualizarActividades(actividades : any){ 
		return this.http.put(`${environment.API_URI}/Actividades/actualizar/${actividades.idActividad}`,actividades, {headers: headers});
	}
	listActividadessByProfesorByPeriodo(idProfesor: number,ini : any, fin : any){
		return this.http.get(`${environment.API_URI}/Actividades/listActividadesByProfesorByPeriodo/${idProfesor}/${ini}/${fin}`, {headers: headers});
	}
	actividadesByInsituto(idInstituto: number){
	  return this.http.post(`${environment.API_URI}/Actividades/actividadesByInsituto/${idInstituto}`,{headers: headers});
  }
}
