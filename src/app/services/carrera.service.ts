import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { headers } from '../models/Header';
import { Carrera } from '../models/carrera.model';
@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(private http: HttpClient) { }
  listCarreraByInstitutos(idInstitutos: number) {
		return this.http.get(`${environment.API_URI}/Carreras/getCarrerasByInstituto/${idInstitutos}`, {headers: headers});
	}
  listCarreraOne(idCarrera: number) {
    return this.http.get(`${environment.API_URI}/Carreras/${idCarrera}`, {headers: headers});
  }
  guardarCarrera(carrera : Carrera){
    return this.http.post(`${environment.API_URI}/Carreras/create`,carrera, {headers: headers});
  }
  actualizarCarrera(idCarrera : number, carrera : any){
    return this.http.put(`${environment.API_URI}/Carreras/actualizar/${idCarrera}`,carrera, {headers: headers});
  }
  eliminarCarrera(idCarrera : number){
    return this.http.delete(`${environment.API_URI}/Carreras/eliminar/${idCarrera}`, {headers: headers});
  }
}
