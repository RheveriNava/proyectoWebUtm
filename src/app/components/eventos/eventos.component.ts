import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
declare var $: any;

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

    ini: any;
    fin: any;
    eventos: any;
    idProfesor: any;
    constructor(private eventosService: EventosService) {
        let hoy = new Date();
        this.ini = (hoy.getFullYear() - 3) + '-01-01';
        this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
    }

    ngOnInit(): void {
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
        this.eventosService.listEventosByProfesorByPeriodo(this.idProfesor, this.ini, this.fin).subscribe((resEventos: any) => {
            this.eventos = resEventos;
        },
            err => console.error(err));
    }
    CambioFecha() {
        console.log("Probando cambio ini")
        this.ini = $('#fechaIni').val();
        this.eventosService.listEventosByProfesorByPeriodo(this.idProfesor, this.ini, this.fin).subscribe((resEventos: any) => {
            this.eventos = resEventos;
        },
            err => console.error(err));

    }
}
