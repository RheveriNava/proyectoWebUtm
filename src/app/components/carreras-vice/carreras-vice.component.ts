import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
declare var $: any;

@Component({
    selector: 'app-carreras-vice',
    templateUrl: './carreras-vice.component.html',
    styleUrls: ['./carreras-vice.component.css']
})
export class CarrerasViceComponent implements OnInit {
    institutos: any;
    institutoActual: number = 0;
    carreras: any;
    carreraActual: Carrera;
    constructor(private institutoService: InstitutoService, private carreraService: CarreraService) {
        this.carreraActual = new Carrera;
    }

    ngOnInit(): void {
        this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
            console.log(resInstitutos);
            this.institutos = resInstitutos;
            this.institutoActual = this.institutos[1].idInstituto;
            console.log(this.institutoActual, 'hola ');
            this.carreraService.listCarreraByInstitutos(this.institutoActual).subscribe((resCarreras: any) => {
                console.log(resCarreras);
                this.carreras = resCarreras;

            },
                err => console.error(err)
            );
        },
            err => console.error(err)
        );
    }
    modificarCarrera(posicionCarrera: any) {
        console.log('modificarProfesor', posicionCarrera);
        console.log(this.carreras[posicionCarrera])
        this.carreraActual = this.carreras[posicionCarrera];;
        $('#modificarCarrera').modal({ dismissible: false });
        $('#modificarCarrera').modal('open');
    }
    cambioInstituto(op: any) {
        console.log('cambioInstituto ', op.value);
        this.institutoActual = op.value;
        this.carreraService.listCarreraByInstitutos(this.institutoActual).subscribe((resCarreras: any) => {
            console.log('resCarreras',resCarreras);
            this.carreras = resCarreras;
        },
            err => console.error(err));
    }
    cambioInstituto2(op: any) {
        console.log('cambioInstituto ', op.value);
        this.carreraActual.idInstituto = op.value;
    }
    actualizarCarrera() {
        console.log("actualizarCarrera", this.carreraActual);
        this.carreraService.actualizarCarrera(this.carreraActual.idCarrera,this.carreraActual).subscribe((resCarrera : any) => {
            console.log('resCarreras',resCarrera);
        },
            err => console.error(err));
            location.reload();
    }
    eliminarCarrera(posicionCarrera: any) {
        console.log('eliminarCarrera',posicionCarrera);
        this.carreraActual = this.carreras[posicionCarrera];
        this.carreraService.eliminarCarrera(this.carreraActual.idCarrera).subscribe((resCarrera : any) => {
            console.log('resCarreras',resCarrera);
        },
            err => console.error(err));
        location.reload();
    }

}
