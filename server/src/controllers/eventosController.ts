import {Request,Response} from 'express';
import pool from '../database';
class EventosController
{
	public async list(req: Request, res: Response ): Promise<void>
	{
		console.log("list")
		const respuesta = await pool.query('SELECT * FROM Eventos');
		res.json( respuesta );
	}
	public async listOne(req: Request, res: Response): Promise <void>
	{
		console.log("listOne")
		const {idEvento} = req.params;
		const respuesta = await pool.query('SELECT * FROM Eventos WHERE idEvento = ?', [idEvento]);
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
		res.status(404).json({'mensaje': 'Eventos no encontrado'});
	}	
	public async create(req: Request, res: Response): Promise<void> 
	{
		const {idProfesor} = req.params;
		const resp = await pool.query("INSERT INTO Eventos set ?",[req.body]);
		res.json(resp);
	}
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		console.log("actualizar")
		const { idEvento } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Eventos set ? WHERE idEvento= ?", [req.body, idEvento]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		console.log("eliminar")
		const { idEvento } = req.params;
		const resp = await pool.query(`DELETE FROM Eventos WHERE idEvento= ${idEvento}`);
		res.json(resp);
	}
	public async listEventosByProfesorByPeriodo(req: Request, res: Response ): Promise<void>
	{
		const { idProfesor,ini,fin } = req.params;
		console.log("listByPeriodo")
		const respuesta = await pool.query('SELECT DISTINCT * FROM Eventos WHERE idProfesor = ? AND inicio>=? AND fin<=?',[idProfesor,ini,fin]);
		res.json( respuesta );
	}
	//------------------------------------------------------------------------
    public async EventosByCarrera(req: Request, res: Response): Promise<void> 
	{
		console.log("EventossByCarrera")
		const { idCarrera } = req.params;
		const resp = await pool.query("SELECT DISTINCT Eventos.* FROM Eventos,profesores WHERE Eventos.idProfesor = profesores.idProfesor AND profesores.idCarrera = ?",[idCarrera]);
		res.json(resp);
	}
    public async EventosByInsituto(req: Request, res: Response): Promise<void> 
	{
		console.log("EventossByCarrera")
		const { idInstituto } = req.params;
		const resp = await pool.query("SELECT DISTINCT Eventos.* FROM Eventos,profesores WHERE Eventos.idProfesor = profesores.idProfesor AND profesores.idInstituto = ?",[idInstituto]);
		res.json(resp);
	}
	public async listByProfesor(req: Request, res: Response): Promise <void>
	{
		console.log("listByProfesor")
		const { idProfesor } = req.params;
		const respuesta = await pool.query('SELECT DISTINCT * FROM Eventos WHERE idProfesor = ?', [idProfesor]);
			res.json(respuesta);
	}	
	public async listByPeriodo(req: Request, res: Response ): Promise<void>
	{
		const { ini,fin } = req.params;
		console.log("listByPeriodo")
		let consulta=`SELECT * FROM Eventos WHERE inicio>='${ini}' AND fin<='${fin}'`;
		console.log(consulta)
		const respuesta = await pool.query('SELECT DISTINCT * FROM Eventos WHERE inicio>=? AND fin<=?',[ini,fin]);
		res.json( respuesta );
	}
} 
export const eventosController = new EventosController();