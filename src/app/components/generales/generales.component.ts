import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';
import { Carrera } from 'src/app/models/carrera.model'
import { Instituto } from 'src/app/models/instituto.model';
import { ProfesorService } from 'src/app/services/profesor.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { TranslateService } from "@ngx-translate/core";

declare var $: any;
@Component({
	selector: 'app-generales',
	templateUrl: './generales.component.html',
	styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {
	idProfesor: number = 0; /* any para cuando no sabemos el tipo de dato */
	profesor: Profesor;
	instituto: Instituto;
	carrera: Carrera;
	numCarByInst: number = 1;
	constructor(private route: ActivatedRoute, private profesorService: ProfesorService, private carreraService: CarreraService, private institutoService: InstitutoService, private translate: TranslateService) {
		this.profesor = new Profesor();
		this.instituto = new Instituto();
		this.carrera = new Carrera();
		/* this.translate.addLangs(["es", "en"]);
		this.translate.setDefaultLang("es"); */
	}

	ngOnInit(): void {
		/*$(document).ready(function(){
			$('.fixed-action-btn').floatingActionButton({
				direction: 'left',
				hoverEnabled: false
			});
		  });*/
		this.route.paramMap.subscribe(params => {
			this.idProfesor = Number(params.get('idProfesor'));
			this.profesorService.listOne(this.idProfesor).subscribe((resProfesor: any) => {
				console.log('listOneProfesor', resProfesor);
				this.profesor = resProfesor;
				this.institutoService.listInstitutoOne(this.profesor.idInstituto).subscribe((resInstituto: any) => {
					console.log('listInstitutoOne', resInstituto);
					this.instituto = resInstituto;
				},
					err => console.error(err));
				if (this.profesor.idCarrera == 0 || this.profesor.nivel == 1)
					this.numCarByInst = 0
				else {
					this.carreraService.listCarreraOne(this.profesor.idCarrera).subscribe((resCarrera: any) => {
						console.log('listCarreraOne', resCarrera);
						this.carrera = resCarrera;
					},
						err => console.error(err));
				}
			},
				err => console.error(err));
			console.log(this.idProfesor);
		});
	}
	guardarCambios() {
		this.profesorService.actualizarProfesor(this.idProfesor, this.profesor).subscribe((resProfesor: any) => {
			console.log('actualizarProfesor', resProfesor)
		},
			err => console.error(err));
	}
}
