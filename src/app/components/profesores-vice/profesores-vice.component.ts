import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { TipoprofesorService  } from '../../services/tipoprofesor.service'
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorSinPassword } from 'src/app/models/profesorSinPassword.model';
import { Articulo } from 'src/app/models/articulo.model';
declare var $:any;

@Component({
    selector: 'app-profesores-vice',
    templateUrl: './profesores-vice.component.html',
    styleUrls: ['./profesores-vice.component.css']
})
export class ProfesoresViceComponent implements OnInit {
    articulos: any;
    profesores: any;
    ini: any;
    fin: any;
    profesor: Profesor;
    profesor2: Profesor;
    articulito: Articulo;
    institutos: any;
    carreras: any;
    institutoActual: any;
    carreraActual: any;
    nivelesProfesor: any;
    numCarByInst: any;
    tipCLR: any[] = ['Revista', 'Congreso', 'Libro'];
    tipoP: any;
    constructor(private articuloService: ArticuloService, private profesorService: ProfesorService, private institutoService: InstitutoService, private carreraService: CarreraService,private tipoprofesorService : TipoprofesorService) {
        this.profesor = new Profesor;
        this.profesor2 = new Profesor;
        this.articulito = new Articulo;
    }

    ngOnInit(): void {

        console.log("Iniciado componente")
        this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
            console.log(resInstitutos);
            this.institutos = resInstitutos;
            this.institutoActual = this.institutos[1].idInstituto;
            console.log(this.institutoActual, 'hola ');
            this.carreraService.listCarreraByInstitutos(this.institutoActual).subscribe((resCarreras: any) => {
                console.log(resCarreras);
                this.carreras = resCarreras;
                this.numCarByInst = this.carreras.length;
                if (this.numCarByInst == 0)
                    this.carreraActual = 0
                else {
                    this.carreraActual = this.carreras[0].idCarrera;
                    let dato = {
                        'value': this.carreraActual
                    }
                    this.cambioCarrera(dato);
                }

            },
                err => console.error(err)
            );
        },
            err => console.error(err)
        );
        this.tipoprofesorService.listTipoProfesor().subscribe((resTipoProfesor: any) => {
			this.tipoP = resTipoProfesor;
			let dato = {
				'value': this.tipoP[0].idTipoProfesor
			}
			this.cambioTipoProfesor(dato);
		},
			err => console.error(err));
        console.log("Probando tiempo")
    }
    modificarProfesor(posicionProfesor: any) {
        console.log('modificarProfesor', posicionProfesor);
        console.log(this.profesores[posicionProfesor])
        var profesorActual = this.profesores[posicionProfesor];
        this.profesor = profesorActual;
        delete profesorActual.password;
        console.log('modificarProfesor profesor', this.profesor,profesorActual);
        $('#modificarProfesor').modal({ dismissible: false });
        $('#modificarProfesor').modal('open');


    }
    eliminarProfesor(posicionProfesor : any){
        console.log('eliminarProfesor ', posicionProfesor);
        var profesorActual = this.profesores[posicionProfesor];
        this.profesorService.eliminarProfesor(profesorActual.idProfesor).subscribe((resProfesor : any) => {
            console.log('Profesor eliminado ',resProfesor)
        },
        err => console.error(err));
        location.reload();

    }
    cambioInstituto(op: any) {
        console.log('cambioInstituto ', op.value);
        this.institutoActual = op.value;
        this.carreraService.listCarreraByInstitutos(this.institutoActual).subscribe((resCarreras: any) => {
            console.log('resCarreras',resCarreras);
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
        this.profesorService.listProfesorByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
            console.log('profesores', resProfesores);
            this.profesores = resProfesores;
        },
            err => console.error(err)
        );
    }
    cambioTipoProfesor(op: any) {
        this.profesor.idTipoProfesor = op.value;
        console.log('cambioTipoProfesor ', this.profesor)
    }
    actualizarProfesor() {
        this.profesor.idInstituto = this.institutoActual;
        this.profesor.idCarrera = this.carreraActual;
        console.log(this.profesor)
        this.profesorService.actualizarProfesorSinContrasena(this.profesor.idProfesor,this.profesor).subscribe((resProfesor: any) => {
            console.log(resProfesor);
        },
            err => console.error(err)
        );
        location.reload();
    }
    
}
