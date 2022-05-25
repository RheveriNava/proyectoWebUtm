export class ProfesorValido{
    idProfesor:number;
    nombresP: string;
    apellidoP: string;
    apellidoM: string;
    correoProfesor: string;
    password: string;
    nivel: number;
    idInstituto:number;
    idCarrera: number;
    grado: string;
    idTipoProfesor: number;
    nombreApa : string;
    valido:string;
    constructor() {
        this.idProfesor= 0;
        this.nombresP = 'Antonio';
        this.apellidoP = 'Cruz';
        this.apellidoM = 'Lopez';
        this.correoProfesor = 'antonio@gmail.com';
        this.password = 'prueba';
        this.nivel = 4;
        this.idInstituto = 2;
        this.idCarrera = 2;
        this.grado = 'Ing.';
        this.idTipoProfesor = 1;
        this.nombreApa = 'Cruz. A';
        this.valido = 'si';
    }
}