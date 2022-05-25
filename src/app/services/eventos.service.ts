import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { headers } from '../models/Header';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http: HttpClient) { }
  create(eventos : any,idProfesor: number){
		return this.http.post(`${environment.API_URI}/Eventos/create/${idProfesor}`,eventos, {headers: headers});
	}
	actualizarEventos(eventos : any){ 
		return this.http.put(`${environment.API_URI}/Eventos/actualizar/${eventos.idActividad}`,eventos, {headers: headers});
	}
	listEventosByProfesorByPeriodo(idProfesor: number,ini : any, fin : any){
		return this.http.get(`${environment.API_URI}/Eventos/listEventosByProfesorByPeriodo/${idProfesor}/${ini}/${fin}`, {headers: headers});
	}
}
