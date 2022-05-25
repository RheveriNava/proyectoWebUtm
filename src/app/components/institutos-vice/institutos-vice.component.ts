import { Component, OnInit } from '@angular/core';
import { InstitutoService } from 'src/app/services/instituto.service';
import { Instituto } from 'src/app/models/instituto.model';
declare var $: any;
@Component({
    selector: 'app-institutos-vice',
    templateUrl: './institutos-vice.component.html',
    styleUrls: ['./institutos-vice.component.css']
})
export class InstitutosViceComponent implements OnInit {
    institutos: any;
    institutoActual: Instituto;
    constructor(private institutosService: InstitutoService) {
        this.institutoActual = new Instituto;
    }

    ngOnInit(): void {
        this.institutosService.listInstitutos().subscribe(resInstitutos => {
            console.log(resInstitutos);
            this.institutos = resInstitutos;
        },
            err => console.error(err));
    }
    modificarIntituto(posicionIntituto: any) {
        console.log("modificarIntituto", posicionIntituto);
        this.institutoActual = this.institutos[posicionIntituto];
        $('#modificarIntituto').modal({ dismissible: false });
        $('#modificarIntituto').modal('open');
    }
    actualizarInstituto(){
        this.institutosService.actualizarInstituto(this.institutoActual.idInstituto,this.institutoActual).subscribe(resInstitutos =>{
            console.log(resInstitutos)
        },
        err => console.error(err));
        location.reload();
    }
    eliminarIntituto(posicionIntituto: any) {
        console.log("eliminarIntituto", posicionIntituto);
        var institutoActual = this.institutos[posicionIntituto];
        this.institutosService.eliminarInstituto(institutoActual.idInstituto).subscribe(resInstitutos =>{
            console.log(resInstitutos)
        },
        err => console.error(err));
        location.reload();
    }
}
