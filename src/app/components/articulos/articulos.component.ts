import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { Profesor } from 'src/app/models/profesor.model';
import { Articulo } from 'src/app/models/articulo.model';
import { ActivatedRoute } from '@angular/router';
import { ArticuloyProfesor } from 'src/app/models/articuloyprofesor.model';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ProfesorValido } from 'src/app/models/profesorValido.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
	selector: 'app-articulos',
	templateUrl: './articulos.component.html',
	styleUrls: ['./articulos.component.css', '../../../styles.css']
})

export class ArticulosComponent implements OnInit {
	environment: any = environment;
	posicionAutores: any;
	autorChecked: any = [];
	idProfesor: any;
	articuloyProfesorActual: ArticuloyProfesor;
	idArticuloActual: any;
	idProfesoresPos: any = [];
	idAutoresPos: any = [];
	prioridades: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	articulos: any;
	articulosArchivos: any = [];
	articulo: Articulo;
	articuloActual: any;
	posArticulo: any;
	institutos: any;
	carreras: any;
	institutoActual: any;
	carreraActual: any;
	numCarByInst: any;
	profesores: any;
	profesor: Profesor;
	autores: any = [];
	ini: any;
	fin: any;
	fileToUpload: any;
	constructor(private route: ActivatedRoute, private articuloService: ArticuloService, private profesorService: ProfesorService, private institutoService: InstitutoService, private carreraService: CarreraService, private cambioInfoService: CambioInfoService, private imagenesService: ImagenesService) {
		this.fileToUpload = null;
		let hoy = new Date();
		this.articulo = new Articulo;
		this.profesor = new Profesor;
		this.articuloyProfesorActual = new ArticuloyProfesor;
		console.log(hoy);
		this.ini = (hoy.getFullYear() - 3) + '-01-01';
		this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
		console.log(this.ini);
		this.cambioInfoService.currentMsg$.subscribe(
			(msg) => {
				console.log('Llegando informacion');
				console.log("msg", msg);
				this.articuloService.listArticulosByProfesorByPeriodo(this.idProfesor, this.ini, this.fin).subscribe((resArticulos: any) => {
					this.articulos = resArticulos;
					this.articulos.forEach((elemento: any) => {
						this.articuloActual = elemento.idArticulo;
						this.profesorService.listAutorByArticulo(this.articuloActual).subscribe((resAutores: any) => {
							this.autores.push(resAutores);
						},
							err => console.error(err));
						console.log('obtenerArchivo');
						this.imagenesService.obtenerArchivo(this.articuloActual).subscribe((resArchivo: any) => {
							console.log('obtenerArchivo',resArchivo);
							this.articulosArchivos.push(resArchivo);
						},
							err => console.error(err));
					});
				},
					err => console.error(err));
			});
	}
	openPDF(nombreArchivo:any) {
		window.open(nombreArchivo,"_blank");
	}
	ngOnInit(): void {
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		this.articuloService.listArticulosByProfesorByPeriodo(this.idProfesor, this.ini, this.fin).subscribe((resArticulos: any) => {
			this.articulos = resArticulos;
			this.articulo = this.articulos[0];
			this.articulos.forEach((elemento: any) => {
				this.articuloActual = elemento.idArticulo;
				this.profesorService.listAutorByArticulo(this.articuloActual).subscribe((resAutores: any) => {
					this.autores.push(resAutores);
				},
					err => console.error(err));
				console.log('obtenerArchivo');
				this.imagenesService.obtenerArchivo(this.articuloActual).subscribe((resArchivo: any) => {
					console.log('obtenerArchivo',resArchivo);
					this.articulosArchivos.push(resArchivo);
				},
					err => console.error(err));
			});
		},
			err => console.error(err));
		this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
			console.log(resInstitutos);
			this.institutos = resInstitutos;
			this.institutoActual = this.institutos[1].idInstituto;
			let dato = {
				'value': this.institutoActual
			}
			this.cambioInstituto(dato);
		},
			err => console.error(err)
		);
	}
	CambioFecha() {
		console.log("Probando cambio ini")
		this.ini = $('#fechaIni').val();
		console.log(this.ini)
		this.articuloService.listArticulosByProfesorByPeriodo(this.idProfesor, this.ini, this.fin).subscribe((resArticulos: any) => {
			this.articulos = resArticulos;
			this.articulos.forEach((element: any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => {
					this.autores.push(resAutores);
				},
					err => console.error(err));
			});

		},
			err => console.error(err));
	}

	cambioInstituto(op: any) {
		console.log('cambioInstituto ', op.value);
		this.institutoActual = op.value;
		this.carreraService.listCarreraByInstitutos(this.institutoActual).subscribe((resCarreras: any) => {
			console.log('resCarreras', resCarreras);
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
			err => console.error(err)
		);
	}
	cambioCarrera(op: any) {
		console.log('cambioCarrera ', op.value);
		this.carreraActual = op.value;
		this.profesorService.listProfesorByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
			console.log('profesores', resProfesores);
			this.profesores = resProfesores;
			//codigo para el arreglo
			//this.idProfesoresPos = [];
			this.profesores.forEach((element: ProfesorValido) => {
				if (this.idProfesoresPos.find((profesor: ArticuloyProfesor) => profesor.idProfesor == element.idProfesor) === undefined) {
					let articuloyProfesorActual = new ArticuloyProfesor;
					articuloyProfesorActual.idArticulo = this.articulo.idArticulo;
					articuloyProfesorActual.idProfesor = element.idProfesor;
					this.idProfesoresPos.push(articuloyProfesorActual);
				}
				let idProfesoresPosAtual = this.idProfesoresPos.find((profesor: ArticuloyProfesor) => profesor.idProfesor == element.idProfesor);
				if (idProfesoresPosAtual.valido === "si")
					this.autorChecked[element.idProfesor] = "checked";
				else
					this.autorChecked[element.idProfesor] = "";

				this.autores.forEach((element2: any) => {

					if (element2.find((profesor: Profesor) => profesor.idProfesor == element.idProfesor) !== undefined) {
						element.valido = "no";
					}
					else
						element.valido = "si";

				});
			});
			console.log('cambioCarrera 2', this.idProfesoresPos)
		},
			err => console.error(err)
		);
	}
	cambioPrioridad(op: any, idProfesor: number) {
		console.log('cambioCarrera ', op.value, idProfesor);
		let idProfesoresPosAtual = new ArticuloyProfesor;
		idProfesoresPosAtual = this.idProfesoresPos.find((profesor: ArticuloyProfesor) => profesor.idProfesor == idProfesor);
		idProfesoresPosAtual.pos = op.value;
	}
	modificarArticulo(idArticulo: any) {
		this.articulo = this.articulos[idArticulo];
		$('#modificarArticulo').modal({ dismissible: false });
		$('#modificarArticulo').modal('open');
	}
	modificarPrioridad(idArticulo: any) {
		this.articulo = this.articulos[idArticulo];
		console.log("modificarPrioridad", idArticulo, this.articulo, this.autores[idArticulo]);
		this.posArticulo = idArticulo;

		$('#modificarPrioridad').modal({ dismissible: false });
		$('#modificarPrioridad').modal('open');
	}
	agregarProfesoresArticulo(idArticulo: any) {
		let dato = {
			'value': this.institutoActual
		}
		this.cambioInstituto(dato);
		this.articulo = this.articulos[idArticulo];
		this.posicionAutores = idArticulo;
		console.log('agregarProfesoresArticulo ', this.articulo.idArticulo);
		console.log('agregarProfesoresArticulo 2', this.idProfesoresPos)
		$('#agregarProfesoresArticulo').modal({ dismissible: false });
		$('#agregarProfesoresArticulo').modal('open');
	}
	agregarAutor(idProfesor: number) {
		console.log('agregarAutor ', idProfesor);
		let idProfesoresPosAtual = new ArticuloyProfesor;
		idProfesoresPosAtual = this.idProfesoresPos.find((profesor: ArticuloyProfesor) => profesor.idProfesor == idProfesor);
		if (idProfesoresPosAtual.valido === "si")
			idProfesoresPosAtual.valido = "no";
		else
			idProfesoresPosAtual.valido = "si";

		console.log('agregarAutor 2', this.idProfesoresPos.find((profesor: ArticuloyProfesor) => profesor.idProfesor == idProfesor));
	}
	altaProfesoresArticulo() {
		this.idProfesoresPos.forEach((element: ArticuloyProfesor) => {
			if (element.valido === "si") {
				this.articuloService.createArticuloYprofesor(element).subscribe((resAutores: any) => {
					console.log("altaProfesoresArticulo", resAutores);
				},
					err => console.error(err));
			}
		})
		location.reload();
	}
	actualizarPrioridad() {
		this.autores[this.posArticulo].forEach((element: any) => {
			let dato = {
				'pos': element.pos
			}
			console.log("autorPosicion", element.pos, dato);
			this.articuloService.actualizarPosicionofArticuloYProfesor(dato, element.idProfesor, this.articulo.idArticulo).subscribe((resAutores: any) => {
				console.log("actualizarPosicionofArticuloYProfesor", resAutores);
			},
				err => console.error(err));
			location.reload();
		});
	}
	eliminarAutor(idProfesor: any, idArticulo: any) {
		console.log("Probando eliminar Autor", idProfesor, idArticulo);
		Swal.fire({
			title: '¿Estas seguro de querer eliminar?',
			position: 'center',
			icon: 'question',
			showDenyButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Sí'
		  })
		  .then(respuesta => {
			if (respuesta.isConfirmed){
				console.log('dijo que sí')
				this.articuloService.eliminarProfesorByArticulo(idProfesor, idArticulo).subscribe((resProfesorEliminado: any) => {
					console.log('resProfesorEliminado', resProfesorEliminado)
				},
					err => console.error(err));
				location.reload();
			} else if(respuesta.isDenied) {
			  	console.log('dijo que no')
			}
		  })
		
	}
	actualizarArticulo() {
		this.articuloService.actualizarArticulo(this.articulo).subscribe((resArticulos: any) => {
			console.log(resArticulos);
		},
			err => console.error(err));
		location.reload();
	}
	cargarArchivo(archivos: any, idArticulo: any) {//event
		let archivo = archivos.files;//asignamos los archivos que metimos por el boton
		console.log("cambiando el nombre del archivo:", archivo, idArticulo);
		for(let i = 0; i < archivo.length; i++) {
			console.log("archivo.item(i)",archivo.item(i));
			this.fileToUpload = archivo.item(i);//toma el primer archivo , nombre del archivo,tama,src:imagen, tipo de archivo //json con la informacion del archivo
			console.log("this.fileToUpload", this.fileToUpload);
			let imgPromise = this.getFileBlob(this.fileToUpload);
			imgPromise.then(blob => {//espera a que se cumplia la promesa y entra
				console.log(blob);// blob tiene la imagen codificada
				this.imagenesService.guardarArchivo(blob, idArticulo,i).subscribe((resArchivo: any) => {
					console.log(resArchivo);
				},
					err => console.error(err));
				})
			}
		
		
	}
	getFileBlob(file: any)//metodo para subir la imagen
	{
		var reader = new FileReader();
		return new Promise(function (resolve, reject) {
			reader.onload = (function (thefile) {
				return function (e:any) {
					resolve(e.target.result);
				};
			})(file);
			reader.readAsDataURL(file);
		});

	}
	limpiarProfesoresArticulo() {
		this.idProfesoresPos = [];
	}
}