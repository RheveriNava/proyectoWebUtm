import { Router } from 'express';
import { articuloController } from '../controllers/articuloController';
class ArticuloRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		this.router.get('/', articuloController.list);
		this.router.get('/:idArticulo', articuloController.listOne);
		this.router.get('/articulosByInsituto/:idInstituto', articuloController.articulosByInsituto);
		this.router.get('/articulosByCarrera/:idInstituto', articuloController.articulosByCarrera);
		//this.router.get('/listOneByNombre/:titulo', articuloController.listOneByNombre)
		//this.router.get('/listByProfesor/:idProfesor', articuloController.listByProfesor);
		this.router.post('/create/:idProfesor', articuloController.create);
		this.router.put('/actualizar/:idArticulo', articuloController.actualizar);
		this.router.delete('/eliminar/:idArticulo', articuloController.eliminar);
		this.router.get('/listByPeriodo/:ini/:fin', articuloController.listByPeriodo);
		this.router.get('/listArticulosByProfesorByPeriodo/:idProfesor/:ini/:fin', articuloController.listArticulosByProfesorByPeriodo)
		this.router.get('/listArticulosByInstitutoByPeriodo/:idInstituto/:ini/:fin', articuloController.listArticulosByInstitutoByPeriodo)
		this.router.get('/listArticulosAllByInstitutoByPeriodo/:ini/:fin', articuloController.listArticulosAllByInstitutoByPeriodo)
	}
}
const articuloRoutes = new ArticuloRoutes();
export default articuloRoutes.router;