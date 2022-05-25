import { Router } from 'express';
import { institutosController } from '../controllers/institutosController';
import { validarToken } from '../middleware/auth';
class InstitutosRoutes
{
	public router: Router=Router();
	constructor()
	{
		this.config();
	}
	config() : void
	{
		this.router.get('/',(req,res) => res.send('probando institutos'));
		this.router.post('/create', validarToken, institutosController.create);
		this.router.put('/actualizar/:idInstituto', validarToken, institutosController.actualizar);
		this.router.delete('/eliminar/:idInstituto', validarToken, institutosController.eliminar);
		this.router.get('/all', validarToken, institutosController.list );
		this.router.get('/:idInstituto', validarToken, institutosController.listOne );
	}
} 
const institutosRoutes= new InstitutosRoutes();
export default institutosRoutes.router;