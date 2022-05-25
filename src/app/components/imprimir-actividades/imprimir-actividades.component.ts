import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { InstitutoService } from 'src/app/services/instituto.service';
declare var $: any;

@Component({
  selector: 'app-imprimir-actividades',
  templateUrl: './imprimir-actividades.component.html',
  styleUrls: ['./imprimir-actividades.component.css']
})
export class ImprimirActividadesComponent implements OnInit {
    ini: any;
    fin: any;
    actividades: any = [];
    actividadesAux: any = [];
    idProfesor: any;
    institutoActual: any;
    profesorActual: any;
    carreras: any;
    numCarByInst: any;
    carreraActual: any;
    profesores: any = [];
    profesoresAux : any;
    profesores2 : any;
    institutos: any;
    institutosAux: any;
    constructor(private actividadesService: ActividadesService, private carreraService: CarreraService, private profesorService: ProfesorService, private institutoService: InstitutoService) {
        let hoy = new Date();
        this.ini = (hoy.getFullYear() - 3) + '-01-01';
        this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
    }

    ngOnInit(): void {
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
        let instituto = {
            'idInstituto': -1,
            'nombreInstituto': "Todos"
        }
        this.institutos = [];
        this.institutosAux = [];
        this.institutos.push(instituto);
        this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
            console.log(resInstitutos);
            resInstitutos.forEach((instituto : any) => {
                this.institutos.push(instituto);
                this.institutosAux[instituto.idInstituto] = instituto;
            })
            let dato = {
                'value': -1
            }
            this.cambioInstituto(dato);
        },
            err => console.error(err));

    }
    cambioInstituto(op: any) {
        console.log('cambioInstituto ', +op.value);
        this.institutoActual = +op.value;
        let profesorA = {
            'idProfesor': -1,
            'nombresP': "Todos"
        }
        this.profesores = [];
        this.profesores.push(profesorA);
        if( this.institutoActual !== -1 ) {
            this.profesorService.listProfesorByInstituto(this.institutoActual).subscribe((resProfesores: any) => {
                console.log('listProfesorByInstituto,resProfesores', resProfesores);
                this.profesoresAux = []
                resProfesores.forEach((profesor: any) => {
                    this.profesores.push(profesor);
                });
                this.profesores2 = resProfesores;
                let dato = {
                    'value': -1
                }
                this.cambioProfesor(dato);
            },
                err => console.error(err));
        }
        else{
            this.profesorService.list().subscribe((resProfesores : any) =>{
                console.log('list,resProfesores', resProfesores);
                this.profesoresAux = []
                resProfesores.forEach((profesor: any) => {
                    if(this.profesoresAux[profesor.idInstituto] == undefined){
                        this.profesoresAux[profesor.idInstituto] = [];
                    }
                    this.profesores.push(profesor);
                    this.profesoresAux[profesor.idInstituto].push(profesor);
                });
                let dato = {
                    'value': -1,
                }
                this.cambioProfesor(dato);
            },
                err => console.error(err));
        }
    }
    cambioProfesor(op: any) {
        this.profesorActual = +op.value;
        console.log('cambioProfesor ', this.profesorActual);
        if (this.profesorActual === -1){
            this.CambioFecha();
        }
        else {
            this.profesores2 = this.profesores.filter((elemento: any) => elemento.idProfesor === this.profesorActual);
            this.CambioFecha();
        }
    }
    CambioFecha() {
        console.log("Probando cambio ini")
        this.ini = $('#fechaIni').val();
        this.actividades = [];
        let profesores;
        if (this.profesorActual === -1 && this.institutoActual === -1){
            this.actividadesAux = [];
            for (let i = 0; i < this.profesoresAux.length; i++){
                profesores = this.profesoresAux[i];
                if(profesores !== null){
                    for (let j = 0; j < profesores.length; j++) {
                        let elemento = profesores[j];
                        this.actividadesService.listActividadessByProfesorByPeriodo(elemento.idProfesor, this.ini, this.fin).subscribe((resActividades: any) => {
                            this.actividadesAux[elemento.idProfesor] = resActividades;
                            
                        },
                        err => console.error(err));
                    }
                }
            }
        }
        else{
            console.log('this.profesores2.length',this.profesores2.length)
            for (let i = 0; i < this.profesores2.length; i++) {
                let elemento = this.profesores2[i];
                this.actividadesService.listActividadessByProfesorByPeriodo(elemento.idProfesor, this.ini, this.fin).subscribe((resActividades: any) => {
                    this.actividades[i] = resActividades;
                },
                    err => console.error(err));
            }
        }
    }
}
