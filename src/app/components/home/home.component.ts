import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TipoprofesorService } from 'src/app/services/tipoprofesor.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { Articulo } from './../../models/articulo.model';
import { Profesor } from 'src/app/models/profesor.model';
import { TranslateService } from "@ngx-translate/core";

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    idProfesor: any;
    articulito: Articulo;
    tipCLR: any[] = ['Revista', 'Congreso', 'Libro'];
    tipoP: any;
    location: any;
    
    institutos: any;
    constructor(private articuloService: ArticuloService, private profesorService: ProfesorService, private tipoprofesorService: TipoprofesorService, private institutoService: InstitutoService, private carreraService: CarreraService, private cambioInfoService: CambioInfoService, private translate: TranslateService) {
        this.articulito = new Articulo();
        this.translate.addLangs(["es", "en"]);
		this.translate.setDefaultLang("en");
    }

    ngOnInit(): void {
        this.location = location.href;//Obten la direccion donde esta el profesor
        console.log(this.location,);
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
        $(document).ready(function () {
            $('.fixed-action-btn').floatingActionButton({
                direction: 'left',
                hoverEnabled: false
            });
            $('select').formSelect({});
        });

    }
    agregarArticulo() {
        console.log("articulo");
        $('#agregarArticulo').modal({ dismissible: false });
        $('#agregarArticulo').modal('open');
    }
    darAltaArticulo() {
        console.log(this.articulito)
        this.articuloService.create(this.articulito, this.idProfesor).subscribe((resArticulo: any) => {
            console.log('articuloService', resArticulo);
            console.log('Enviar mensaje');
            this.enviarMensajeArticulo();
        },
            err => console.error(err));
    }
    enviarMensajeArticulo() {
        console.log('Ejecutando el servicio de cambio info');
        this.cambioInfoService.enviar();
    }
    
}
