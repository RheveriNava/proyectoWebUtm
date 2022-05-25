import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { InstitutoService } from 'src/app/services/instituto.service';
declare var $: any;

@Component({
    selector: 'app-actividades-vice',
    templateUrl: './actividades-vice.component.html',
    styleUrls: ['./actividades-vice.component.css']
})
export class ActividadesViceComponent implements OnInit {

    ini: any;
    fin: any;
    actividades: any = [];
    idProfesor: any;
    institutoActual: any;
    carreras: any;
    numCarByInst: any;
    carreraActual: any;
    profesores: any = [];
    profesoresAux : any;
    profesores2 : any;
    institutos: any;
    constructor(private actividadesService: ActividadesService, private carreraService: CarreraService, private profesorService: ProfesorService, private institutoService: InstitutoService) {
        let hoy = new Date();
        this.ini = (hoy.getFullYear() - 3) + '-01-01';
        this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
    }

    ngOnInit(): void {
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
        this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
            console.log(resInstitutos);
            this.institutos = resInstitutos;
            this.institutoActual = this.institutos[1].idInstituto;
            let dato = {
                'value': this.institutoActual
            }
            this.cambioInstituto(dato);
        },
            err => console.error(err));

    }
    cambioInstituto(op: any) {
        console.log('cambioInstituto ', op.value);
        this.institutoActual = op.value;
        this.carreraService.listCarreraByInstitutos(this.institutoActual).subscribe((resCarreras: any) => {
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
    }
    cambioCarrera(op: any) {
        console.log('cambioCarrera ', op.value);
        this.carreraActual = op.value;
        let profesor = {
            'idProfesor': -1,
            'nombresP': "Todos"
        }
        this.profesores = [];
        this.profesores.push(profesor);
        this.profesorService.listProfesorByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
            console.log('profesores,resProfesores', resProfesores);
            resProfesores.forEach((profesor: any) => {
                this.profesores.push(profesor);
            });
            let dato = {
                'value': -1,
            }
            this.cambioProfesor(dato);
        },
            err => console.error(err)
        );
    }
    cambioProfesor(op: any) {
        let idProfesor :number = +op.value;
        console.log('cambioProfesor ', idProfesor);
        if (idProfesor === -1){
            this.profesores2 = this.profesores;
            this.CambioFecha();
        }
        else{
            this.profesores2 = this.profesores.filter((elemento: any) => elemento.idProfesor === idProfesor);
            console.log('cambioProf else ', this.profesores2)
            this.CambioFecha();
        }
    }
    CambioFecha() {
        console.log("Probando cambio ini")
        this.ini = $('#fechaIni').val();
        this.actividades = [];
        for (let i = 0; i < this.profesores2.length; i++) {
            let elemento = this.profesores2[i];
            this.actividadesService.listActividadessByProfesorByPeriodo(elemento.idProfesor, this.ini, this.fin).subscribe((resActividades: any) => {
                this.actividades[i] = resActividades;
            },
                err => console.error(err));

        }
    }
}
