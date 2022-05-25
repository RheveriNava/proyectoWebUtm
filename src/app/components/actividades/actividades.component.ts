import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
declare var $: any;

@Component({
    selector: 'app-actividades',
    templateUrl: './actividades.component.html',
    styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
    
    ini: any;
    fin: any;
    actividades: any;
    idProfesor: any;
    constructor(private actividadesService: ActividadesService) { 
        let hoy = new Date();
        this.ini = (hoy.getFullYear() - 3) + '-01-01';
		this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
    }

    ngOnInit(): void {
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
        this.actividadesService.listActividadessByProfesorByPeriodo(this.idProfesor, this.ini, this.fin).subscribe((resActividades: any) => {
			this.actividades = resActividades;
		},
			err => console.error(err));
    }
    CambioFecha() {
        console.log("Probando cambio ini")
        this.ini = $('#fechaIni').val();
        this.actividadesService.listActividadessByProfesorByPeriodo(this.idProfesor, this.ini, this.fin).subscribe((resActividades: any) => {
			this.actividades = resActividades;
		},
			err => console.error(err));
        
    }
}
