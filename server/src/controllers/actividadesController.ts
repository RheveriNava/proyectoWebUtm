import {Request,Response} from 'express';
import pool from '../database';
class ActividadesController
{
	public async list(req: Request, res: Response ): Promise<void>
	{
		console.log("list")
		const respuesta = await pool.query('SELECT * FROM Actividades');
		res.json( respuesta );
	}
	public async listOne(req: Request, res: Response): Promise <void>
	{
		console.log("listOne")
		const {idActividad} = req.params;
		const respuesta = await pool.query('SELECT * FROM Actividades WHERE idActividad = ?', [idActividad]);
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
		res.status(404).json({'mensaje': 'Actividades no encontrado'});
	}	
	public async create(req: Request, res: Response): Promise<void> 
	{
		const {idProfesor} = req.params;
		const resp = await pool.query("INSERT INTO Actividades set ?",[req.body]);
		res.json(resp);
	}
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		console.log("actualizar")
		const { idActividad } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Actividades set ? WHERE idActividad= ?", [req.body, idActividad]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		console.log("eliminar")
		const { idActividad } = req.params;
		const resp = await pool.query(`DELETE FROM Actividades WHERE idActividad= ${idActividad}`);
		res.json(resp);
	}
	public async listActividadesByProfesorByPeriodo(req: Request, res: Response ): Promise<void>
	{
		const { idProfesor,ini,fin } = req.params;
		const respuesta = await pool.query('SELECT DISTINCT * FROM Actividades WHERE idProfesor = ? AND inicio>=? AND fin<=?',[idProfesor,ini,fin]);
		respuesta.forEach((res:any) => {
			res.inicio = res.inicio.toLocaleDateString()
			res.fin = res.fin.toLocaleDateString()
		})
		res.json( respuesta );
	}
	//------------------------------------------------------------------------
    public async ActividadesByCarrera(req: Request, res: Response): Promise<void> 
	{
		console.log("ActividadessByCarrera")
		const { idCarrera } = req.params;
		const resp = await pool.query("SELECT DISTINCT Actividades.* FROM Actividades,profesores WHERE Actividades.idProfesor = profesores.idProfesor AND profesores.idCarrera = ?",[idCarrera]);
		res.json(resp);
	}
    public async actividadesByInsituto(req: Request, res: Response): Promise<void> 
	{
		console.log("ActividadessByCarrera")
		const { idInstituto } = req.params;
		let consulta = 'SELECT * FROM Profesores WHERE Profesores.idInstituto = ' + idInstituto;
		const respuesta = await pool.query(consulta);
		for (let i = 0; i < respuesta.length; i++) {
			const resp = await pool.query("SELECT DISTINCT * FROM Actividades WHERE Actividades.idProfesor = ?",[respuesta.idProfesor]);
			respuesta[i].actividades = resp
		}
		res.json(respuesta);
	}
	public async listByProfesor(req: Request, res: Response): Promise <void>
	{
		console.log("listByProfesor")
		const { idProfesor } = req.params;
		const respuesta = await pool.query('SELECT DISTINCT * FROM Actividades WHERE idProfesor = ?', [idProfesor]);
			res.json(respuesta);
	}	
	public async listByPeriodo(req: Request, res: Response ): Promise<void>
	{
		const { ini,fin } = req.params;
		console.log("listByPeriodo")
		let consulta=`SELECT * FROM Actividades WHERE inicio>='${ini}' AND fin<='${fin}'`;
		console.log(consulta)
		const respuesta = await pool.query('SELECT DISTINCT * FROM Actividades WHERE inicio>=? AND fin<=?',[ini,fin]);
		res.json( respuesta );
	}
} 
export const actividadesController = new ActividadesController();