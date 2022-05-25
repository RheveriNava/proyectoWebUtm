import {Request,Response} from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
class ArticuloYProfesorController
{
	public async list(req: Request, res: Response ): Promise<void>
	{
		const respuesta = await pool.query('SELECT * FROM ArticuloYProfesor');
		res.json( respuesta );
	}
	public async listOne(req: Request, res: Response): Promise <void>
	{
		const {idAyP} = req.params;
		const respuesta = await pool.query('SELECT * FROM ArticuloYProfesor WHERE idAyP = ?', [idAyP]);
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
		res.status(404).json({'mensaje': 'Articulo no encontrado'});
	}	
	public async create(req: Request, res: Response): Promise<void> 
	{
		const resp = pool.query("INSERT INTO ArticuloYProfesor set ?",[req.body]);
		res.json(resp);
	}
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		const { idAyP } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE ArticuloYProfesor set ? WHERE idAyP= ?", [req.body, idAyP]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		const { idAyP } = req.params;
		const resp = await pool.query(`DELETE FROM ArticuloYProfesor WHERE idAyP= ${idAyP}`);
		res.json(resp);
	}
	public async ProfesoresArticulo(req:Request,res:Response):Promise<void>{
        const{idArticulo}=req.params;
        console.log(req.params);
        const resp = await pool.query("SELECT nombresP FROM Profesores WHERE idArticulo=?",[req.body,idArticulo]);
        res.json(resp);
    }
	public async eliminarProfesorByArticulo(req: Request, res: Response): Promise<void> 
	{
		const { idProfesor,idArticulo } = req.params;
		const resp = await pool.query(`DELETE FROM ArticuloYProfesor WHERE idArticulo= ${idArticulo} AND idProfesor = ${idProfesor}`);
		res.json(resp);
	}
	public async actualizarPosicionofArticuloYProfesor(req: Request, res: Response): Promise<void> 
	{
		const { idProfesor,idArticulo } = req.params;
		let pos = req.body.pos;
		console.log(pos);
		let consulta = "UPDATE ArticuloYProfesor set pos = '"+pos+"' WHERE idArticulo= '"+idArticulo+"' AND idProfesor = '"+idProfesor+"'";
		console.log(consulta)
		const resp = await pool.query(consulta);
		console.log(pos);
		res.json(resp);
	}
	
}
export const articuloyprofesorController = new ArticuloYProfesorController();