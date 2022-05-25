import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Articulo } from 'src/app/models/articulo.model';
import { InstitutoService } from 'src/app/services/instituto.service';
import { Profesor } from 'src/app/models/profesor.model';

declare var $:any;

@Component({
  selector: 'app-imprimir-articulos',
  templateUrl: './imprimir-articulos.component.html',
  styleUrls: ['./imprimir-articulos.component.css']
})
export class ImprimirArticulosComponent implements OnInit {
    institutos : any = [];
    institutos2 : any = [];
	idInstituto : any = -1;
	institutoAux : any;
	articulos2 : any = [];
	articulos : any;
	articulo : Articulo;
	articuloActual : any;
	autores : any = [];
	ini : any;
	fin : any;
    carreraActual: any;
    profesores: any = [];
    autores2: any = [];
    profesoresAux : any;
    profesor: Profesor = new Profesor;
	constructor(private articuloService: ArticuloService, private profesorService:ProfesorService, private institutoService:InstitutoService) { 
		this.articulo = new Articulo;
		let hoy = new Date();
        this.ini = (hoy.getFullYear() - 3) + '-01-01';
        this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
	}

	ngOnInit(): void {
		//console.log("Iniciado componente")
        let instituto = {
            'idInstituto': -1,
            'nombreInstituto': "Todos"
        }
        this.institutos.push(instituto);
		this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
            resInstitutos.forEach((instituto: any) => {
                if(instituto.idInstituto !== 1)
                    this.institutos.push(instituto);
                    this.institutos2[instituto.idInstituto] = instituto;
            });
			let dato = {
				'value': -1
			}
			this.cambioInstituto(dato);
            
        },
            err => console.error(err)
        );
	}
	cambioInstituto(op: any) {
        this.idInstituto = +op.value;
        console.log('cambioInstituto', this.idInstituto);
        this.institutoAux = this.institutos.filter((elemento: any) => elemento.idInstituto === this.idInstituto)[0];
        console.log('institutoAux', this.institutoAux);
        if(this.idInstituto === -1){
            let profesor = {
                'idProfesor': -1,
                'nombresP': "Todos"
            }
            this.profesores = [];
            this.profesores.push(profesor);
            this.profesorService.list().subscribe((resProfesores: any) => {
                console.log('list,resProfesores', resProfesores);
                resProfesores.forEach((profesor: any) => {
                    this.profesores.push(profesor);
                })
                let dato = {
                    'value': -1,
                }
                this.cambioProfesor(dato);
            },
                err => console.error(err));
        }
        else{
            let profesor = {
                'idProfesor': -1,
                'nombresP': "Todos"
            }
            this.profesores = [];
            this.profesores.push(profesor);
            this.profesorService.listProfesorByInstituto(this.idInstituto).subscribe((resProfesores: any) => {
                console.log('profesores,resProfesores', resProfesores);
                resProfesores.forEach((profesor: any) => {
                    this.profesores.push(profesor);
                })
                let dato = {
                    'value': -1,
                }
                this.cambioProfesor(dato);
            },
                err => console.error(err));
        }
        
    }
    cambioProfesor(op: any) {
        let idProfesor :number = +op.value;
        console.log('cambioProfesor ', idProfesor);
        if (idProfesor === -1){
            this.profesor.idProfesor = -1;this.profesor.nombresP = "Todos";
            this.CambioFecha();
        }
        else{
            this.profesor = this.profesores.filter((elemento: any) => elemento.idProfesor === idProfesor)[0];
            console.log('cambioProf else ', this.profesor)
            this.CambioFecha();
        }
    }
    CambioFecha() {
        console.log("CambioFecha.idProfesor:",+this.profesor.idProfesor,"CambioFecha.Profesor:",this.profesor);
        this.ini = $('#fechaIni').val();
        this.fin = $('#fechaFin').val();
        this.articulos = [];
        if(this.profesor.idProfesor !== -1){
            this.articuloService.listArticulosByProfesorByPeriodo(this.profesor.idProfesor, this.ini, this.fin).subscribe((resArticulos: any) => {
                this.articulos = resArticulos;
                console.log("resArticulos",resArticulos);

                this.autores = [];
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
        else{
            if(this.idInstituto === -1){
                this.articuloService.listArticulosAllByInstitutoByPeriodo(this.ini, this.fin).subscribe((resArticulos: any) => {
                    console.log('resArticulos',resArticulos);
                    this.articulos2 = [];
                    this.autores2 = [];

                    resArticulos.forEach((elemento:any) => {
                        if (this.articulos2[elemento.idInstituto] == undefined) {
                            this.articulos2[elemento.idInstituto] = [];
                            this.autores2[elemento.idInstituto] = [];
                        }
                        this.articulos2[elemento.idInstituto].push(elemento);

                        this.profesorService.listAutorByArticulo(elemento.idArticulo).subscribe((resAutores: any) => 
                        {
                            this.autores2[elemento.idInstituto].push(resAutores);
                        },
                        err => console.error(err));
                    });
                },
                    err => console.error(err));
            }
            else{
                this.articuloService.listArticulosByInstitutoByPeriodo(this.idInstituto, this.ini, this.fin).subscribe((resArticulos: any) => 
                {
                    this.articulos = resArticulos;
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
                for (let i = 0; i < this.profesores.length; i++) {
                    let elemento = this.profesores[i];
                } 
            }
        }
    }
}