import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { headers } from '../models/Header';
import { Instituto } from '../models/instituto.model';
@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  constructor(private http: HttpClient) { }
  listInstitutos() {
    return this.http.get(`${environment.API_URI}/Institutos/all`,{headers: headers});
  }
  listInstitutoOne(idInstituto: number){
    return this.http.get(`${environment.API_URI}/Institutos/${idInstituto}`,{headers: headers});
  }
  actualizarInstituto(idInstituto : number,instituto: any){
    return this.http.put(`${environment.API_URI}/Institutos/actualizar/${idInstituto}`,instituto,{headers: headers});
  }
  eliminarInstituto(idInstituto : number){
    return this.http.delete(`${environment.API_URI}/Institutos/eliminar/${idInstituto}`,{headers: headers});
  }
  guardarInstituto(instituto: Instituto) {
		return this.http.post(`${environment.API_URI}/Institutos/create`, instituto,{headers: headers});
	}
}
