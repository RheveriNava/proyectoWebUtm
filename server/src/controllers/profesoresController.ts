import { Request, Response } from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
class ProfesoresController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM Profesores');
		res.json(respuesta);
	}
	public async listOne(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params;
		const respuesta = await pool.query('SELECT * FROM Profesores WHERE idProfesor = ?', [idProfesor]);
		if (respuesta.length > 0) {
			res.json(respuesta[0]);
			return;
		}
		res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
	}
	public async create(req: Request, res: Response): Promise<void> {
		let password = req.body.password as any;
		var salt = bcrypt.genSaltSync(10);
		bcrypt.compare('prueba', "xyz", (err, res) => {
			console.log('Compared result', res);
		})
		bcrypt.hash(password, salt).then(function (nuevoPassword) {
			req.body.password = nuevoPassword;
			console.log(nuevoPassword);
			const resp = pool.query("INSERT INTO Profesores set ?", [req.body]);
			res.json(resp);
		})
	}
	public async cambiarContrasenya(req: Request, res: Response): Promise<void> {
		let password = req.body.password as any;
		var salt = bcrypt.genSaltSync(10);
		const correoProfesor = req.body.correo as any;
		console.log(req.params);
		bcrypt.hash(password, salt).then(function (nuevoPassword) {
			req.body.password = nuevoPassword;
			console.log(nuevoPassword, ' ' , correoProfesor);
			const resp = pool.query("UPDATE profesores set profesores.password = ? WHERE correoProfesor = ?", [nuevoPassword, correoProfesor]);
			res.json(resp);
		})
	}
	public async actualizar(req: Request, res: Response): Promise<void> {
		let password = req.body.password as any;
		var salt = bcrypt.genSaltSync(10);
		const { idProfesor } = req.params;
		console.log(req.params);
		bcrypt.hash(password, salt).then(function (nuevoPassword) {
			req.body.password = nuevoPassword;
			const resp = pool.query("UPDATE profesores set ? WHERE idProfesor = ?", [req.body, idProfesor]);
			res.json(resp);
		})
	}
	public async actualizarProfesorSinContrasena(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params;
		console.log(req.params);
		delete req.body.password;
		const resp = pool.query("UPDATE profesores set ? WHERE idProfesor = ?", [req.body, idProfesor]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params;
		const resp = await pool.query(`DELETE FROM Profesores WHERE idProfesor= ${idProfesor}`);
		res.json(resp);
	}
	public async existe(req: Request, res: Response): Promise<void> {
		console.log("existe")
		console.log(req.body,'contraseña***');
		let correoProfesor = req.body.correo;
		let password = req.body.password;
		let token: string;
		let consulta = "SELECT idProfesor,password,nivel FROM Profesores WHERE correoProfesor = '" + correoProfesor + "'";
		const respuesta = await pool.query(consulta);
		console.log(respuesta)
		if (respuesta.length > 0) {
			bcrypt.compare(password, respuesta[0].password, (err, resEncriptar) => {
				if (resEncriptar == true) {
					token = jwt.sign(correoProfesor, process.env.TOKEN_SECRET || 'prueba');
					console.log(token);
					res.json({'token': token, 'idProfesor': respuesta[0].idProfesor, 'nivel': respuesta[0].nivel});
		
				}
				else
					res.json(-1);
				return;
			})
		}
		else
			res.json(-1);
	}

	public async listAutorByArticulo(req: Request, res: Response): Promise<void> {
		const { idArticulo } = req.params;
		console.log("idArticulo",idArticulo)
		let consulta = `SELECT Profesores.*,ArticuloYProfesor.pos FROM Profesores , ArticuloYProfesor WHERE Profesores.idProfesor = ArticuloYProfesor.idProfesor AND ArticuloYProfesor.idArticulo = ${idArticulo} ORDER BY ArticuloYProfesor.pos ASC`;
		const respuesta = await pool.query(consulta);
		//console.log("respuesta",respuesta); 
		res.json(respuesta);
	}
	public async listProfesorByInstituto(req: Request, res: Response): Promise<void> {
		const { idInstituto } = req.params;
		let consulta = 'SELECT * FROM Profesores WHERE Profesores.idInstituto = ' + idInstituto;
		const respuesta = await pool.query(consulta);
		res.json(respuesta);
	}
	public async listProfesorByCarrera(req: Request, res: Response): Promise<void> {
		const { idCarrera } = req.params;
		let consulta = `SELECT * FROM Profesores WHERE Profesores.idCarrera = ${idCarrera}`;
		const respuesta = await pool.query(consulta);
		res.json(respuesta);
	}
	public async tipoProfesor(req: Request, res: Response): Promise<void> {
		let consulta = `SELECT * FROM tipoprofesor`;
		const respuesta = await pool.query(consulta);
		res.json(respuesta);
	}
	constructor() {
		dotenv.config();
		console.log(process.env.TOKEN_SECRET)
	}

}
export const profesoresController = new ProfesoresController();