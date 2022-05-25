import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Articulo } from 'src/app/models/articulo.model';
import { InstitutoService } from 'src/app/services/instituto.service';
declare var $:any;

@Component({
	selector: 'app-articulos-vice',
	templateUrl: './articulos-vice.component.html',
	styleUrls: ['./articulos-vice.component.css']
})
export class ArticulosViceComponent implements OnInit {
	institutos : any;
	institutoActual : any;
	institutosAux : any;
	articulosAux : any;
	autoresAux : any = [];
	articulos : any;
	articulo : Articulo;
	articuloActual : any;
	autores : any = [];
	ini : any;
	fin : any;
	pageSize: number = 12;
	p : number = 1;
	constructor(private articuloService: ArticuloService, private profesorService:ProfesorService, private institutoService:InstitutoService) { 
		this.articulo = new Articulo;
		
	}

	ngOnInit(): void {
		console.log("Iniciado componente")
		this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
            console.log(resInstitutos);
            this.institutos = resInstitutos;
            this.institutoActual = this.institutos[1].idInstituto;
            console.log(this.institutoActual, 'hola ');
			let dato = {
				'value': this.institutoActual
			}
			this.cambioInstituto(dato);
            
        },
            err => console.error(err)
        );
	}
	cambioInstituto(op: any) {
        this.institutoActual = op.value;
        console.log('cambioInstituto3', op.value,this.institutoActual);
		this.articuloService.listArticulosByInsituto(this.institutoActual).subscribe((resArticulos: any) => 
		{
			this.articulos = resArticulos;
			this.autores= [];
			this.articulos.forEach((elemento:any) => {
				this.articuloActual = elemento.idArticulo;
				this.profesorService.listAutorByArticulo(this.articuloActual).subscribe((resAutores: any) => 
				{
					this.autores.push(resAutores);
				},
				err => console.error(err));
			});
			
		},
			err => console.error(err));
    }
}
