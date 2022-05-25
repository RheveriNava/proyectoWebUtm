import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { headers } from '../models/Header';
@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	constructor(private http: HttpClient) { }
	existe(usuario : any) {
		console.log("Entrando a servicio existe", usuario,{headers: headers});
		return this.http.post(`${environment.API_URI}/profesores/existe`,usuario,{headers: headers});
	}
}