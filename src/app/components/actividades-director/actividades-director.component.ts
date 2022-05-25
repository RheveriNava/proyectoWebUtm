import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { Profesor } from 'src/app/models/profesor.model';
declare var $: any;

@Component({
    selector: 'app-actividades-director',
    templateUrl: './actividades-director.component.html',
    styleUrls: ['./actividades-director.component.css']
})
export class ActividadesDirectorComponent implements OnInit {
    ini: any;
    fin: any;
    actividades: any = [];
    idProfesor: any;
    institutoActual: any;
    carreras: any;
    numCarByInst: any;
    carreraActual: any;
    profesores: any;
    profesor: any;
    profesorActual: Profesor;
    institutos: any;
    constructor(private actividadesService: ActividadesService, private carreraService: CarreraService, private profesorService: ProfesorService, private institutoService: InstitutoService) {
        let hoy = new Date();
        this.profesorActual = new Profesor();
        this.ini = (hoy.getFullYear() - 3) + '-01-01';
        this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
    }

    ngOnInit(): void {
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
        this.profesorService.listOne(this.idProfesor).subscribe((resProfesor:any) => {
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
        console.log('cambioProfesor ', idProfesor);
        this.profesorActual = this.profesores.filter((elemento: any) => elemento.idProfesor === idProfesor)[0];
        console.log('cambioProf else ', this.profesores)
        this.CambioFecha();
    }
    CambioFecha() {
        console.log("Probando cambio ini")
        this.ini = $('#fechaIni').val();
        this.actividadesService.listActividadessByProfesorByPeriodo(this.profesorActual.idProfesor, this.ini, this.fin).subscribe((resActividades: any) => {
            this.actividades = resActividades;
        },
            err => console.error(err));
    }
}
