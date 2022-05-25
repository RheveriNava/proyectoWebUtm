import { Router } from 'express';
import { carrerasController } from '../controllers/carrerasController';
import { validarToken } from '../middleware/auth';
class CarrerasRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/', validarToken, carrerasController.list );
        this.router.get('/:idCarrera', validarToken, carrerasController.listOne );
        this.router.post('/create', validarToken, carrerasController.create);
		this.router.put('/actualizar/:idCarrera', validarToken,carrerasController.actualizar);
		this.router.delete('/eliminar/:idCarrera', validarToken,carrerasController.eliminar);
        this.router.get('/getCarrerasByInstituto/:idInstituto', validarToken, carrerasController.getCarrerasByInstituto);
    }
}
const carrerasRoutes= new CarrerasRoutes();
export default carrerasRoutes.router;