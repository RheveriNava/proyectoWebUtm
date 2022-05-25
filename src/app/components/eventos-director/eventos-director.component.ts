import { Component, OnInit } from '@angular/core';
import { CarreraService } from 'src/app/services/carrera.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { Profesor } from 'src/app/models/profesor.model';
declare var $: any;

@Component({
  selector: 'app-eventos-director',
  templateUrl: './eventos-director.component.html',
  styleUrls: ['./eventos-director.component.css']
})
export class EventosDirectorComponent implements OnInit {
    ini: any;
    fin: any;
    eventos: any = [];
    idProfesor: any;
    institutoActual: any;
    carreras: any;
    numCarByInst: any;
    carreraActual: any;
    profesores: any;
    profesor: Profesor;
    profesorActual : Profesor;
    constructor( private eventosService : EventosService ,private carreraService : CarreraService, private profesorService : ProfesorService, private institutoService : InstitutoService) {
        this.profesor = new Profesor();
        this.profesorActual = new Profesor();
        let hoy = new Date();
        this.ini = (hoy.getFullYear() - 3) + '-01-01';
        this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
    }

    ngOnInit(): void {
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
        this.profesorService.listOne(this.idProfesor).subscribe((resProfesor: any) => {
            console.log("resProfesor",resProfesor);
            this.profesor = resProfesor;
            this.carreraService.listCarreraByInstitutos(this.profesor.idInstituto).subscribe((resCarreras: any) => {
                console.log('resCarreras', resCarreras);
                this.carreras = resCarreras;
                this.numCarByInst = this.carreras.length;
                if (this.numCarByInst == 0)
                    this.carreraActual = 0
                else {
                    this.carreraActual = resCarreras[0].idCarrera;
                    let dato = {
                        'value': this.carreraActual
                    }
                    this.cambioCarrera(dato);
                }
            },
                err => console.error(err));
        },
            err => console.error(err));
            
    }
    cambioCarrera(op: any) {
        console.log('cambioCarrera ', op.value);
        this.carreraActual = op.value;
        this.profesorService.listProfesorByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
            console.log('profesores', resProfesores);
            this.profesores = resProfesores;
            let dato = {
                'value': this.profesores[0].idProfesor
            }
            this.cambioProfesor(dato);
        },
            err => console.error(err)
        );
    }
    cambioProfesor(op: any) {
        let idProfesor :number = +op.value;
        this.profesorActual = this.profesores.filter((elemento: any) => elemento.idProfesor === idProfesor)[0];
        console.log('cambioProfesor profesorActual', this.profesorActual);
        console.log('cambioProfesor profesorActual.nombresP', this.profesorActual.nombresP);
        this.CambioFecha();
    }
    CambioFecha() {
        console.log("Probando cambio ini")
        this.ini = $('#fechaIni').val();
        this.eventos.clear;
        this.eventosService.listEventosByProfesorByPeriodo(this.profesorActual.idProfesor, this.ini, this.fin).subscribe((resEventos: any) => {
            this.eventos = resEventos;
            console.log('resEventos',resEventos)
        },
            err => console.error(err));
    }
}
