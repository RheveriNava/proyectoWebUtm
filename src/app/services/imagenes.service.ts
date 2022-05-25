import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { headers } from '../models/Header';

@Injectable({
    providedIn: 'root'
})
export class ImagenesService {

    constructor(private http: HttpClient) { }
    guardarArchivo(src : any,idArticulo : number, indice : any){
        return this.http.post(`${environment.API_URI_IMAGENES}/guardarArchivo/`,{'src':src,'idArticulo':idArticulo,'indice':indice},{headers: headers});
    }
    obtenerArchivo(idArticulo : number){
        return this.http.post(`${environment.API_URI_IMAGENES}/obtenerArchivo/`,{'idArticulo':idArticulo},{headers: headers});
    }
}
