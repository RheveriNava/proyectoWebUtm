import { Router } from 'express';
import { eventosController } from '../controllers/eventosController';
import { validarToken } from '../middleware/auth';
class ActividadesRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		this.router.get('/', validarToken, eventosController.list);
		this.router.get('/:idEventos', validarToken, eventosController.listOne);
		this.router.post('/create/:idProfesor', validarToken, eventosController.create);
		this.router.put('/actualizar/:idEventos', validarToken, eventosController.actualizar);
		this.router.delete('/eliminar/:idEventos', validarToken, eventosController.eliminar);
		this.router.get('/listEventosByProfesorByPeriodo/:idProfesor/:ini/:fin',validarToken, eventosController.listEventosByProfesorByPeriodo)
		this.router.get('/listByPeriodo/:ini/:fin', validarToken, eventosController.listByPeriodo);
	}
}
const actividadesRoutes = new ActividadesRoutes();
export default actividadesRoutes.router;