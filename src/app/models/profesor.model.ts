export class Profesor{
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
    constructor() {
        this.idProfesor = -1;
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
    }
}