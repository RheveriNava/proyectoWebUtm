import { Router } from 'express';
import { tipoProfesorController } from '../controllers/tipoProfesorController';
import { validarToken } from '../middleware/auth';

class TipoProfesorRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    config() : void{
        this.router.get('/', validarToken, tipoProfesorController.list);
        this.router.get('/:idTipoProfesor',validarToken, tipoProfesorController.listOne);
        this.router.post('/create',validarToken, tipoProfesorController.create);
		this.router.put('/actualizar/:idTipoProfesor',validarToken,tipoProfesorController.actualizar);
		this.router.delete('/eliminar/:idTipoProfesor',validarToken,tipoProfesorController.eliminar);
    }
}
const tipoProfesorRoutes= new TipoProfesorRoutes();
export default tipoProfesorRoutes.router;