export class Articulo{
    idArticulo:number;
    tipCLR: string;
    titulo: string;
    nombreCLR: string;
    estado: string;
    fechaEdicion: string;
    tipoNI: string;
    issnisbn: string;
    volumen: string;
    paginas: string;
    anyo: string;
    doi: string;
    comprobante: string;
    indexa: string;
    issue: string;
    editores: string;
    cuidad: string;
    pais: string;
    editorial: string;
    constructor() {
        this.idArticulo = 0;
        this.tipCLR = 'Revista';
        this.titulo = 'Mi articulo';
        this.nombreCLR = 'Revista mexicana de computacion';
        this.estado = 'Publicado';
        this.fechaEdicion = '2022-03-09';
        this.tipoNI = 'Nacional';
        this.issnisbn = '12345862';
        this.volumen = '5';
        this.paginas = '10-15';
        this.anyo = '2022';
        this.doi = 'https://conceptos.de/computacion';
        this.comprobante = '';
        this.indexa = 'Indexada';
        this.issue = 'Computacion';
        this.editores = 'Computacion S.A.';
        this.cuidad = 'Huajuapan';
        this.pais = 'Mexico';
        this.editorial = 'UTM';
    }
}