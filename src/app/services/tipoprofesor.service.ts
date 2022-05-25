import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { headers } from '../models/Header';
@Injectable({
  providedIn: 'root'
})
export class TipoprofesorService {

  constructor(private http: HttpClient) { }
  listTipoProfesor(){
		return this.http.get(`${environment.API_URI}/tipoprofesor`,{headers: headers});
	}
}
