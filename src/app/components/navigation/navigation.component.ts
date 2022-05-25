import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesorService } from '../../services/profesor.service'
import { TipoprofesorService } from '../../services/tipoprofesor.service'
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ActividadesService } from 'src/app/services/actividades.service';

import { Profesor } from '../../models/profesor.model'
import { Instituto } from 'src/app/models/instituto.model';
import { Carrera } from 'src/app/models/carrera.model';
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2';

import { Packer, Document, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, VerticalAlign, WidthType, HeightRule, ShadingType } from 'docx'
import { saveAs } from 'file-saver'

const margenes = {
	top: 100,
	bottom: 100,
	left: 100,
	right: 100
}
const rellenoVerdeClaro = {
	type: ShadingType.CLEAR,
	color: 'e8f5e9',
	fill: 'e8f5e9'
}
const rellenoVerdeFuerte = {
	type: ShadingType.CLEAR,
	color: 'a5d6a7',
	fill: 'a5d6a7'
}
declare var $: any;

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	file: any;
	arrayBuffer: any;
	uploadEvent: any;
	exceljsondata: any;
	idProfesor: number = 0;
	profesores: number = 0;
	nivelProfesor: any;
	profesor: Profesor;
	profesorNuevo: Profesor;
	institutoNuevo: Instituto;
	institutoActual: any;
	carreraActual: Carrera;
	carrera: any;
	carreras: any;
	institutos: any;
	numCarByInst: any;
	tipoP: any;
	indexInstitutoArticulosExportar: number;
	constructor(private router: Router, private profesorService: ProfesorService, private tipoprofesorService: TipoprofesorService, private carreraService: CarreraService, private institutoService: InstitutoService, private eventosService: EventosService, private actividadesService: ActividadesService, private articuloService: ArticuloService) {
		this.profesor = new Profesor;
		this.profesorNuevo = new Profesor;
		this.institutoNuevo = new Instituto;
		this.carreraActual = new Carrera;
		this.indexInstitutoArticulosExportar = 0;
	}

	ngOnInit(): void {
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		this.nivelProfesor = Number(localStorage.getItem('nivel'));
		this.profesorService.listOne(this.idProfesor).subscribe((resProfesro: any) => {
			this.profesor = resProfesro;
		},
			err => console.error(err));
		console.log(this.idProfesor);
		$(document).ready(function () {
			$('.sidenav').sidenav();
			$(".dropdown-trigger").dropdown({ coverTrigger: false });
		});
		this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
			console.log(resInstitutos);
			this.institutos = resInstitutos;
			this.institutoActual = this.institutos[1].idInstituto;
			let dato = {
				'value': this.institutoActual
			}
			this.cambioInstituto(dato);
			this.cambioInstituto2(dato);
			this.carreraService.listCarreraByInstitutos(this.institutoActual).subscribe((resCarreras: any) => {
				console.log(resCarreras);
				this.carreras = resCarreras;
				this.numCarByInst = this.carreras.length;
				if (this.numCarByInst == 0)
					this.carrera = 0
				else {
					this.carrera = resCarreras[0].idCarrera;
					let dato = {
						'value': this.carrera
					}
					this.cambioCarrera(dato);
				}
			},
				err => console.error(err));
		},
			err => console.error(err));
		this.tipoprofesorService.listTipoProfesor().subscribe((resTipoProfesor: any) => {
			this.tipoP = resTipoProfesor;
			let dato = {
				'value': this.tipoP[0].idTipoProfesor
			}
			this.cambioTipoProfesor(dato);
		},
			err => console.error(err));
	}
	logout() {
		console.log('logout');
		localStorage.removeItem('token');
		localStorage.removeItem('correo');
		localStorage.removeItem('idProfesor');
		localStorage.removeItem('nivel');
		this.router.navigateByUrl('/');

	}
	agregarProfesor() {
		console.log('agregarProfesor');
		$('#agregarProfesor').modal({ dismissible: false });
		$('#agregarProfesor').modal('open');
	}
	agregarProfesorJefe() {
		console.log('agregarProfesorJefe');
		$('#agregarProfesorJefe').modal({ dismissible: false });
		$('#agregarProfesorJefe').modal('open');
	}
	cambioInstituto(op: any) {
		console.log('cambioInstituto ', op.value);
		this.institutoActual = op.value;
		this.profesorNuevo.idInstituto = this.institutoActual;
		this.carreraService.listCarreraByInstitutos(this.institutoActual).subscribe((resCarreras: any) => {
			console.log('resCarreras', resCarreras);
			this.carreras = resCarreras;
			this.numCarByInst = this.carreras.length;
			if (this.numCarByInst == 0)
				this.carrera = 0
			else {
				this.carrera = resCarreras[0].idCarrera;
				let dato = {
					'value': this.carrera
				}
				this.cambioCarrera(dato);
			}
		},
			err => console.error(err)
		);
	}

	cambioCarrera(op: any) {
		console.log('cambioCarrera ', op.value);
		this.carrera = op.value;
		this.profesorNuevo.idCarrera = this.carrera;
	}
	cambioTipoProfesor(op: any) {
		this.profesorNuevo.idTipoProfesor = op.value;
		console.log('cambioTipoProfesor ', this.profesorNuevo)
	}
	darAltaProfesor() {
		this.profesorNuevo.idInstituto = this.institutoActual;
		this.profesorNuevo.idCarrera = this.carrera;
		console.log(this.profesorNuevo)
		this.profesorService.guardarProfesor(this.profesorNuevo).subscribe((resProfesor: any) => {
			console.log(resProfesor);
		},
			err => console.error(err)
		);
	}
	darAltaProfesorJefe() {
		this.profesorNuevo.idInstituto = this.profesor.idInstituto;
		this.profesorNuevo.idCarrera = this.profesor.idCarrera;
		console.log(this.profesorNuevo)
		this.profesorService.guardarProfesor(this.profesorNuevo).subscribe((resProfesor: any) => {
			console.log(resProfesor);
		},
			err => console.error(err)
		);
	}
	cambioInstituto2(op: any) {
		console.log('cambioInstituto2 ', op.value);
		this.carreraActual.idInstituto = op.value;
	}
	agregarInstituto() {
		console.log('agregarInstituto');
		$('#agregarInstituto').modal({ dismissible: false });
		$('#agregarInstituto').modal('open');
	}
	darAltaInstituto() {
		this.institutoService.guardarInstituto(this.institutoNuevo).subscribe((resProfesor: any) => {
			console.log(resProfesor);
		},
			err => console.error(err)
		);
	}
	agregarCarrera() {
		console.log('modificarProfesor');
		$('#agregarCarrera').modal({ dismissible: false });
		$('#agregarCarrera').modal('open');
	}
	darAltaCarrera() {
		console.log("darAltaCarrera", this.carreraActual);
		this.carreraService.guardarCarrera(this.carreraActual).subscribe((resCarrera: any) => {
			console.log('resCarreras', resCarrera);
		},
			err => console.error(err));
	}

	importarProfesor() {
		console.log('importarProfesor');
		$('#importarProfesor').modal({ dismissible: false });
		$('#importarProfesor').modal('open');
	}
	importarInstitutos() {
		console.log('importarInstitutos');
		$('#importarInstitutos').modal({ dismissible: false });
		$('#importarInstitutos').modal('open');
	}
	importarCarreras() {
		console.log('importarCarreras');
		$('#importarCarreras').modal({ dismissible: false });
		$('#importarCarreras').modal('open');
	}
	importarEventos() {
		console.log('importarEventos');
		$('#importarEventos').modal({ dismissible: false });
		$('#importarEventos').modal('open');
	}
	importarArticulos() {
		console.log('importarArticulos');
		$('#importarArticulos').modal({ dismissible: false });
		$('#importarArticulos').modal('open');
	}
	importarActividades() {
		console.log('importarActividades');
		$('#importarActividades').modal({ dismissible: false });
		$('#importarActividades').modal('open');
	}
	exportarArticulos() {
		console.log('exportarArticulos');
		$('#exportarArticulos').modal({ dismissible: false });
		$('#exportarArticulos').modal('open');
	}
	exportarActividades() {
		console.log('exportarActividades');
		$('#exportarActividades').modal({ dismissible: false });
		$('#exportarActividades').modal('open');
	}
	exportarEventos() {
		console.log('exportarEventos');
		$('#exportarEventos').modal({ dismissible: false });
		$('#exportarEventos').modal('open');
	}
	cargarExcel(event: any) {
		if (event.target.files.length > 0) {
			this.file = event.target.files[0];
			this.uploadEvent = event;
		}
		this.file = event.target.files[0];
		let fileReader = new FileReader();
		fileReader.readAsArrayBuffer(this.file);
		fileReader.onload = (e) => {
			this.arrayBuffer = fileReader.result;
			var data = new Uint8Array(this.arrayBuffer);
			var arr = new Array();
			for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");
			var workbook = XLSX.read(bstr, { type: "binary" });
			var first_sheet_name = workbook.SheetNames[0];
			var worksheet = workbook.Sheets[first_sheet_name];
			this.exceljsondata = XLSX.utils.sheet_to_json(worksheet, { raw: true })
		}
	}
	importar2DB(tipo: number) {
		if (tipo === 1) {
			this.exceljsondata.map((profesor: any) => {
				console.log(profesor);
				this.profesorService.guardarProfesor(profesor).subscribe((resProfesor) => { }, err => { console.log(err); });
			})
		}
		if (tipo === 2) {
			this.exceljsondata.map((Instituto: any) => {
				console.log(Instituto);
				this.institutoService.guardarInstituto(Instituto).subscribe((resInstitutos) => { }, err => { console.log(err); });
			})
		}
		if (tipo === 3) {
			this.exceljsondata.map((Carrera: any) => {
				console.log(Carrera);
				this.carreraService.guardarCarrera(Carrera).subscribe((resCarrera) => { }, err => { console.log(err); });
			})
		}
		if (tipo === 4) {
			this.exceljsondata.map((Evento: any) => {
				console.log("Evento", Evento);
				this.eventosService.create(Evento, Evento.idProfesor).subscribe((resEvento) => { }, err => { console.log(err); });
			})
		}
		if (tipo === 5) {
			this.exceljsondata.map((Actividades: any) => {
				console.log("Actividades", Actividades);
				this.actividadesService.create(Actividades, Actividades.idProfesor).subscribe((resActividades) => { }, err => { console.log(err); });
			})
		}
		if (tipo === 6) {
			this.exceljsondata.map((Articulos: any) => {
				console.log("Articulos", Articulos);
				this.articuloService.create(Articulos, Articulos.idProfesor).subscribe((resArticulos) => { }, err => { console.log(err); });
			})
		}
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Importados',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		})
	}
	arregloALista(elementos: any[]): Paragraph[] {
		console.log("elementos", elementos)
		let lista: Paragraph[] = []
		elementos.forEach(elemento => {
			lista.push(
				new Paragraph({
					text: `${elemento.nombresP} ${elemento.apellidoP} ${elemento.apellidoM}`,

					bullet: {
						level: 0
					},
					alignment: AlignmentType.LEFT
				})
			)
		})
		return lista
	}
	arregloAFilas(elemento: any[],tipo: number): TableRow[] {
		let filas: TableRow[] = []
		console.log('elemento', elemento)
		if (tipo === 0){
			elemento.forEach((articulo, i) => {
				const relleno = (i % 2 == 0 ? rellenoVerdeClaro : rellenoVerdeFuerte)
				let fila = new TableRow({
					children: [
						new TableCell({
							shading: relleno,
							margins: margenes,
							children: [
								new Paragraph({
									text: `${articulo.fechaEdicion}`,
									alignment: AlignmentType.CENTER
								})
							],
							verticalAlign: VerticalAlign.CENTER
						}),
						new TableCell({
							shading: relleno,
							margins: margenes,
							children: [
								new Paragraph({
									text: `${articulo.titulo}`,
									alignment: AlignmentType.CENTER
								})
							],
							verticalAlign: VerticalAlign.CENTER
						}),
						new TableCell({
							shading: relleno,
							margins: margenes,
							children: [
								...this.arregloALista(articulo.profesores)
							],
							verticalAlign: VerticalAlign.CENTER
						})
					]
				})
				filas.push(fila)
			})
			return filas
		}
		else if(tipo  === 1){
			elemento.forEach((articulo, i) => {
				const relleno = (i % 2 == 0 ? rellenoVerdeClaro : rellenoVerdeFuerte)
				let fila = new TableRow({
					children: [
						new TableCell({
							shading: relleno,
							margins: margenes,
							children: [
								new Paragraph({
									text: `${articulo.fechaEdicion}`,
									alignment: AlignmentType.CENTER
								})
							],
							verticalAlign: VerticalAlign.CENTER
						}),
						new TableCell({
							shading: relleno,
							margins: margenes,
							children: [
								new Paragraph({
									text: `${articulo.titulo}`,
									alignment: AlignmentType.CENTER
								})
							],
							verticalAlign: VerticalAlign.CENTER
						}),
						new TableCell({
							shading: relleno,
							margins: margenes,
							children: [
								...this.arregloALista(articulo.profesores)
							],
							verticalAlign: VerticalAlign.CENTER
						})
					]
				})
				filas.push(fila)
			})
			return filas
		}
		else {
			return filas
		}
	}
	exportarArticulosWord(tipo: any) {
		// Obtener Articulos
		let id = this.institutos[this.indexInstitutoArticulosExportar].idInstituto
		let nombre = this.institutos[this.indexInstitutoArticulosExportar].nombreInstituto
		if (tipo === 0) {
			this.articuloService.listArticulosByInsituto(id).subscribe((articulosRes: any) => {
				// Crear documento
				const documento = new Document({
					// Estilos globales
					styles: {
						default: {
							document: {
								run: {
									font: 'Arial'
								}
							}
						}
					},
					sections: [{
						children: [
							// Título
							new Paragraph({
								children: [
									new TextRun({
										text: `Artículos ${nombre}`,
										size: 36
									})
								],
								alignment: AlignmentType.CENTER
							}),
							// Tabla de Articulos
							new Table({
								rows: [
									// Encabezado
									new TableRow({
										tableHeader: true,
										height: {
											value: 400,
											rule: HeightRule.EXACT
										},
										children: [
											new TableCell({
												shading: rellenoVerdeFuerte,
												children: [
													new Paragraph({
														text: 'Fecha',
														alignment: AlignmentType.CENTER
													})
												],
	
												verticalAlign: VerticalAlign.CENTER
											}),
											new TableCell({
												shading: rellenoVerdeFuerte,
												children: [
													new Paragraph({
														text: 'Título',
														alignment: AlignmentType.CENTER
													})
												],
												verticalAlign: VerticalAlign.CENTER
											}),
											new TableCell({
												shading: rellenoVerdeFuerte,
												children: [
													new Paragraph({
														text: 'Autores',
														alignment: AlignmentType.CENTER
													})
												],
												verticalAlign: VerticalAlign.CENTER
											})
										]
									}),
									// Articulos
									...this.arregloAFilas(articulosRes,0)
								],
								width: {
									size: 100,
									type: WidthType.PERCENTAGE
								}
							})
						]
					}]
				})
				// Descargar Word
				Packer.toBlob(documento)
					.then(blob => {
						saveAs(blob, 'Articulos.docx')
					})
			}, err => console.error(err))
		}
		else if(tipo === 1){
			this.actividadesService.actividadesByInsituto(id).subscribe((resActividades: any) => {
				// Crear documento
				const documento = new Document({
					// Estilos globales
					styles: {
						default: {
							document: {
								run: {
									font: 'Arial'
								}
							}
						}
					},
					sections: [{
						children: [
							// Título
							new Paragraph({
								children: [
									new TextRun({
										text: `Actividades ${nombre}`,
										size: 36
									})
								],
								alignment: AlignmentType.CENTER
							}),
							// Tabla de Articulos
							new Table({
								rows: [
									// Encabezado
									new TableRow({
										tableHeader: true,
										height: {
											value: 400,
											rule: HeightRule.EXACT
										},
										children: [
											new TableCell({
												shading: rellenoVerdeFuerte,
												children: [
													new Paragraph({
														text: 'Fecha',
														alignment: AlignmentType.CENTER
													})
												],
	
												verticalAlign: VerticalAlign.CENTER
											}),
											new TableCell({
												shading: rellenoVerdeFuerte,
												children: [
													new Paragraph({
														text: 'Título',
														alignment: AlignmentType.CENTER
													})
												],
												verticalAlign: VerticalAlign.CENTER
											}),
											new TableCell({
												shading: rellenoVerdeFuerte,
												children: [
													new Paragraph({
														text: 'Autores',
														alignment: AlignmentType.CENTER
													})
												],
												verticalAlign: VerticalAlign.CENTER
											})
										]
									}),
									// Articulos
									...this.arregloAFilas(resActividades,1)
								],
								width: {
									size: 100,
									type: WidthType.PERCENTAGE
								}
							})
						]
					}]
				})
				// Descargar Word
				Packer.toBlob(documento)
					.then(blob => {
						saveAs(blob, 'Articulos.docx')
					})
			}, err => console.error(err))
			
		}
	}
}
