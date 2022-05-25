import { Request, Response } from 'express';
import pool from '../database';
class TipoProfesorController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM tipoprofesor');
		res.json(respuesta);
	}
	public async listOne(req: Request, res: Response): Promise<void> {
		const { idTipoProfesor } = req.params;
		const respuesta = await pool.query('SELECT * FROM tipoprofesor WHERE idTipoProfesor = ?', [ idTipoProfesor ]);
		if (respuesta.length > 0) {
			res.json(respuesta[0]);
			return;
		}
		res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
	}
	public async create(req: Request, res: Response): Promise<void> 
	{
		const respuesta = await pool.query("INSERT INTO tipoprofesor  set ?",[req.body]);
		res.json(respuesta);
	}
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		const { idTipoProfesor } = req.params;
		console.log(req.params);
		const respuesta = await pool.query("UPDATE tipoprofesor set ? WHERE idTipoProfesor = ?", [req.body, idTipoProfesor]);
        res.json(respuesta);
	}
	public async eliminar(req: Request, res: Response): Promise<void> {
		const { idTipoProfesor } = req.params;
		const respuesta = await pool.query(`DELETE FROM tipoprofesor WHERE idTipoProfesor = ${idTipoProfesor}`);
		res.json(respuesta);
	}
}
export const tipoProfesorController = new TipoProfesorController();