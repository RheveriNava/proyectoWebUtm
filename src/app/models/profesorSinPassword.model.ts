export class ProfesorSinPassword{
    idProfesor:number;
    nombresP: string;
    apellidoP: string;
    apellidoM: string;
    correoProfesor: string;
    nivel: number;
    idInstituto:number;
    idCarrera: number;
    grado: string;
    idTipoProfesor: number;
    nombreApa : string;
    constructor() {
        this.idProfesor= 0;
        this.nombresP = '';
        this.apellidoP = '';
        this.apellidoM = '';
        this.correoProfesor = '';
        this.nivel = 0;
        this.idInstituto = 0;
        this.idCarrera = 0;
        this.grado = '';
        this.idTipoProfesor = 0;
        this.nombreApa = '';
    }
}