import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from "./database";
import fs from "fs"

const correoAcceso = require('./correoAcceso');
class Server {
    public app: Application;
    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        this.app.use(express.urlencoded({
            limit: '50mb', parameterLimit: 100000, extended:
                false
        }));
        this.app.use(express.json({ limit: '50mb' })); this.app.set('port', process.env.PORT || 3001);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
    }
    routes(): void {
        this.app.post('/enviarCorreoRecuperarContrasenya', (req, res) => {
            console.log('xx', req.body)
            correoAcceso(req.body);
        });
        this.app.post('/guardarArchivo', (req, res) =>
        {
            const file = req.body.src;
            const name = req.body.idArticulo;
            const indice = req.body.indice;
            let letra = ["a","c","d","e","f","g"]
            const binaryData = Buffer.from(file.replace(/^data:.*,/, ""), 'base64');//name = idArticulo
            fs.writeFile(`${__dirname}/img/pdf/${name}_${letra[indice]}.pdf`, binaryData, "base64", (err) =>
            {
                console.log("Respuesta",err,'direccion',`${__dirname}/img/pdf/${name}_${letra[indice]}.pdf`);
            });
            res.json({ fileName: name + '.pdf' });
            
        });
        this.app.post('/obtenerArchivo', (req, res) => {
            const idArticulo = req.body.idArticulo;
            let archivosArticulo : any = [];
            //let direccion = __dirname;
            //direccion=direccion.replace(/\\/g,"/");
            //console.log('replace',direccion.replace(/\\/g,"/"))
            fs.readdir(`${__dirname}/img/pdf/`,(err, archivos) => {
                console.log('archivos',archivos)
                archivos.forEach(archivo => {
                    let nombreArchivo = archivo.split('_');
                    console.log('nombreArchivo1',Number(nombreArchivo[0]),'idArticulo',idArticulo)
                    if(Number(nombreArchivo[0]) === idArticulo){
                        console.log("Respuesta",err,'direccion',`${__dirname}/img/pdf/${archivo}`);
                        
                        archivosArticulo.push(`http://localhost:3000/pdf/${archivo}`);
                    }
                })
                res.json(archivosArticulo);
            })
        })
        this.app.post('/decodificarMail', async (req, res) => {
            console.log(req.body)
            let decodificado;
            try {
                decodificado = jwt.verify(req.body.token, process.env.TOKEN_SECRET ||'prueba');
                console.log('**',decodificado,'**')
                const result1 = await this.queryProfesor(decodificado) as any;
                console.log(result1)
                if (result1.length == 0)
                    res.json(0);
                else
                    res.json(result1[0]);
            }
            catch (err) {
                res.json(0);
            }
        });
    }
    queryProfesor = (decodificado: any) => {
        console.log('**',decodificado)
        return new Promise((resolve, reject) => {
            let consulta = 'SELECT * FROM Profesores WHERE correoProfesor="' + decodificado + '"';
            console.log(consulta)
            pool.query(consulta, (error: any, results: any) => {
                if (error)
                    return reject(error);
                return resolve(results);
            });
        });
    };
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Listening on port ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();