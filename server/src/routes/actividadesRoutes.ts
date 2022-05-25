import { Router } from 'express';
import { actividadesController } from '../controllers/actividadesController';
import { validarToken } from '../middleware/auth';
class ActividadesRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		this.router.get('/', validarToken, actividadesController.list);
		this.router.get('/:idActividad', validarToken, actividadesController.listOne);
		this.router.post('/create/:idProfesor', validarToken, actividadesController.create);
		this.router.put('/actualizar/:idActividad', validarToken, actividadesController.actualizar);
		this.router.delete('/eliminar/:idActividad', validarToken, actividadesController.eliminar);
		this.router.get('/listActividadesByProfesorByPeriodo/:idProfesor/:ini/:fin',validarToken, actividadesController.listActividadesByProfesorByPeriodo)
		this.router.get('/listByPeriodo/:ini/:fin', validarToken, actividadesController.listByPeriodo);
		this.router.post('/actividadesByInsituto/:idInstituto', validarToken, actividadesController.actividadesByInsituto);
	}
}
const actividadesRoutes = new ActividadesRoutes();
export default actividadesRoutes.router;