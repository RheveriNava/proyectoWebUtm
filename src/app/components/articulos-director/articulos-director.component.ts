import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Articulo } from 'src/app/models/articulo.model';

@Component({
  selector: 'app-articulos-director',
  templateUrl: './articulos-director.component.html',
  styleUrls: ['./articulos-director.component.css']
})
export class ArticulosDirectorComponent implements OnInit {
    idProfesor : any;
    articulos : any;
	articulo : Articulo;
	articuloActual : any;
	autores : any = [];
    pageSize: number = 12;
	p : number = 1;
  constructor(private articuloService: ArticuloService, private profesorService:ProfesorService) {
    this.articulo = new Articulo;
  }

  ngOnInit(): void {
    this.idProfesor = Number(localStorage.getItem('idProfesor'));
    this.profesorService.listOne(this.idProfesor).subscribe((resProfesro : any) =>{
        this.articuloService.listArticulosByInsituto(resProfesro.idInstituto).subscribe((resArticulos: any) => {
                this.articulos = resArticulos;
                this.autores.clear;
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
    },
        err => console.error(err));
  }

}
