import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { ActivatedRoute } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';

@Component({
    selector: 'app-profesores-jefe',
    templateUrl: './profesores-jefe.component.html',
    styleUrls: ['./profesores-jefe.component.css']
})
export class ProfesoresJefeComponent implements OnInit {
    idProfesor : any;
    profesores : any;
    autores : any = [];
    articuloActual : any;
    pageSize : number = 13;
	p : number = 1;
    constructor(private route: ActivatedRoute, private profesorService: ProfesorService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
			this.idProfesor = Number(params.get('idProfesor'));
		});
        this.profesorService.listOne(this.idProfesor).subscribe((resProfesro : any) =>{
            this.profesorService.listProfesorByCarrera(resProfesro.idCarrera).subscribe((resProfesores : any) => {
                this.profesores = resProfesores;
            },
                err => console.error(err));
        });
    }

}
