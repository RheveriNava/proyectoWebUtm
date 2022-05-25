import {Request,Response} from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
class ArticuloController
{
	public async list(req: Request, res: Response ): Promise<void>
	{
		console.log("list")
		const respuesta = await pool.query('SELECT * FROM Articulo');
		res.json( respuesta );
	}
	public async listOne(req: Request, res: Response): Promise <void>
	{
		console.log("listOne")
		const {idArticulo} = req.params;
		const respuesta = await pool.query('SELECT * FROM Articulo WHERE idArticulo = ?', [idArticulo]);
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
		res.status(404).json({'mensaje': 'Articulo no encontrado'});
	}	
	public async create(req: Request, res: Response): Promise<void> 
	{
		const {idProfesor} = req.params;
		const resp = await pool.query("INSERT INTO Articulo set ?",[req.body]);
		let dato = {
			'idProfesor': idProfesor,
			'idArticulo': resp.insertId,
			'pos': 1,
			'valido':1
		}
		const resp2 = await pool.query("INSERT INTO ArticuloYProfesor set ?",[dato]);
		console.log("create***",resp)
		res.json(resp);
		//res.json(resp2);
	}
	public async listOneByNombre(req: Request, res: Response): Promise <void>
	{
		console.log("listOneByNombre")
		const { titulo } = req.params;
		const respuesta = await pool.query('SELECT idArticulo FROM Articulo WHERE titulo = ? ORDER BY idArticulo DESC', [titulo] );
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
		res.status(404).json({'mensaje': 'Articulo no encontrado'});
	}
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		console.log("actualizar")
		const { idArticulo } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Articulo set ? WHERE idArticulo= ?", [req.body, idArticulo]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		console.log("eliminar")
		const { idArticulo } = req.params;
		const resp = await pool.query(`DELETE FROM Articulo WHERE idArticulo= ${idArticulo}`);
		res.json(resp);
	}
    public async articulosByCarrera(req: Request, res: Response): Promise<void> 
	{
		console.log("articulosByCarrera")
		const { idCarrera } = req.params;
		const resp = await pool.query("SELECT DISTINCT articulo.* FROM articulo, articuloyprofesor,profesores WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = profesores.idProfesor AND profesores.idCarrera = ?",[idCarrera]);
		res.json(resp);
	}
    /* public async articulosByInsituto(req: Request, res: Response): Promise<void> 
	{
		console.log("articulosByInsituto")
		const { idInstituto } = req.params;
		let respuesta: any[] = [];
		const resp = await pool.query("SELECT DISTINCT articulo.* FROM articulo, articuloyprofesor,profesores WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = profesores.idProfesor AND profesores.idInstituto = ?",[idInstituto]);
		console.log('1')
		await resp.forEach(async (elemento:any,i:number) =>{
			//console.log('i',i)
			respuesta[i]= elemento
			let consulta = `SELECT Profesores.*,ArticuloYProfesor.pos FROM Profesores , ArticuloYProfesor WHERE Profesores.idProfesor = ArticuloYProfesor.idProfesor AND ArticuloYProfesor.idArticulo = ${elemento.idArticulo} ORDER BY ArticuloYProfesor.pos ASC`;
			const respuest = await pool.query(consulta);
			console.log('respuest',respuest)
			respuesta[i].profesores = respuest;
		})
		//console.log('respuesta',respuesta)
		res.json(respuesta);
	} */
	public async articulosByInsituto(req: Request, res: Response): Promise<void> {
		const { idInstituto } = req.params
		let respuesta = await pool.query('SELECT * FROM articulo as A INNER JOIN articuloyprofesor AP ON AP.idArticulo=A.idArticulo INNER JOIN profesores P ON P.idProfesor=AP.idProfesor WHERE P.idInstituto=?', idInstituto)
		// Obtener los profesores participantes
		for (let i = 0; i < respuesta.length; i++) {
			const respuesta2 = await pool.query('SELECT * FROM profesores as P INNER JOIN articuloyprofesor AP ON AP.idProfesor=P.idProfesor WHERE AP.idArticulo=?', respuesta[i].idArticulo)
			respuesta[i].profesores = respuesta2
		}
		res.json(respuesta)
	}
//SELECT DISTINCT articulo.*,profesores FROM articulo, articuloyprofesor,profesores WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = profesores.idProfesor AND profesores.idInstituto = '2' AND profesores IN (Profesores.* FROM Profesores , ArticuloYProfesor WHERE Profesores.idProfesor = ArticuloYProfesor.idProfesor AND ArticuloYProfesor.idArticulo = articulo.idArticulo ORDER BY ArticuloYProfesor.pos ASC)
	public async listByProfesor(req: Request, res: Response): Promise <void>
	{
		console.log("listByProfesor")
		const { idProfesor } = req.params;
		const respuesta = await pool.query('SELECT DISTINCT * FROM Articulo A INNER JOIN ArticuloYProfesor AYP ON AYP.idArticulo=A.idArticulo WHERE idProfesor = ?', [idProfesor]);
			res.json(respuesta);
	}	
	public async listByPeriodo(req: Request, res: Response ): Promise<void>
	{
		const { ini,fin } = req.params;
		console.log("listByPeriodo")
		let consulta=`SELECT * FROM Articulo WHERE fechaEdicion>='${ini}' AND fechaEdicion<='${fin}'`;
		console.log(consulta)
		const respuesta = await pool.query('SELECT DISTINCT * FROM Articulo WHERE fechaEdicion>=? AND fechaEdicion<=?',[ini,fin]);
		res.json( respuesta );
	}
	public async listArticulosByProfesorByPeriodo(req: Request, res: Response ): Promise<void>
	{
		const { idProfesor,ini,fin } = req.params;
		console.log("listArticulosByProfesorByPeriodo")
		let consulta=`SELECT * FROM articulo, articuloyprofesor WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = '${idProfesor}' AND  fechaEdicion>='${ini}' AND fechaEdicion<='${fin}'`;
		console.log(consulta)
		const respuesta = await pool.query('SELECT DISTINCT articulo.* FROM articulo, articuloyprofesor WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = ? AND fechaEdicion>=? AND fechaEdicion<=?',[idProfesor,ini,fin]);
		res.json( respuesta );
	}
	public async listArticulosByInstitutoByPeriodo(req: Request, res: Response): Promise<void>
	{
		const { idInstituto,ini,fin } = req.params;
		console.log("listArticulosByInstitutoByPeriodo")
		let consulta=`SELECT * FROM articulo, articuloyprofesor,profesores WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = profesores.idProfesor AND profesores.idInstituto = '${idInstituto}' AND  fechaEdicion>='${ini}' AND fechaEdicion<='${fin}'`;
		console.log(consulta)
		const respuesta = await pool.query('SELECT DISTINCT articulo.* FROM articulo, articuloyprofesor, profesores WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = profesores.idProfesor AND profesores.idInstituto = ? AND fechaEdicion>=? AND fechaEdicion<=?',[idInstituto,ini,fin]);
		res.json( respuesta );
	}
	public async listArticulosAllByInstitutoByPeriodo(req: Request, res: Response ): Promise<void>{
		const {ini,fin} = req.params;
		const consulta = await pool.query('SELECT articulo.*,profesores.idInstituto,MIN(articuloyprofesor.pos) pos FROM articuloyprofesor,profesores,articulo WHERE articuloyprofesor.idProfesor = profesores.idProfesor AND articuloyprofesor.idArticulo = articulo.idArticulo AND profesores.idInstituto != 0  AND fechaEdicion >= ? AND fechaEdicion <= ? GROUP BY articuloyprofesor.idArticulo ORDER BY `articuloyprofesor`.`idArticulo` ASC',[ini,fin]);
		res.json( consulta );
		//SELECT articulo.*,profesores.idInstituto,MIN(articuloyprofesor.pos) pos FROM articuloyprofesor,profesores,articulo WHERE articuloyprofesor.idProfesor = profesores.idProfesor AND articuloyprofesor.idArticulo = articulo.idArticulo GROUP BY articuloyprofesor.idArticulo ORDER BY `articuloyprofesor`.`idArticulo` ASC
	}
} 
export const articuloController = new ArticuloController();