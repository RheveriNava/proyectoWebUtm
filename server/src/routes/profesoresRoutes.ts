import { Router } from 'express';
import { profesoresController } from '../controllers/profesoresController';
import { validarToken } from '../middleware/auth';

class ProfesoresRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/', validarToken, profesoresController.list );
        this.router.get('/:idProfesor',validarToken, profesoresController.listOne );
        this.router.post('/create',validarToken, profesoresController.create);
		this.router.put('/actualizar/:idProfesor',validarToken,profesoresController.actualizar);
		this.router.put('/actualizarProfesorSinContrasena/:idProfesor',validarToken,profesoresController.actualizarProfesorSinContrasena);
		this.router.delete('/eliminar/:idProfesor',validarToken,profesoresController.eliminar);
        this.router.get('/listAutorByArticulo/:idArticulo',validarToken, profesoresController.listAutorByArticulo);
        this.router.post('/existe',validarToken, profesoresController.existe);
        this.router.post('/cambiarContrasenya',validarToken, profesoresController.cambiarContrasenya);
        this.router.get('/listProfesorByInstituto/:idInstituto',validarToken, profesoresController.listProfesorByInstituto);
        this.router.get('/listProfesorByCarrera/:idCarrera',validarToken, profesoresController.listProfesorByCarrera);
    }
}
const profesoresRoutes= new ProfesoresRoutes();
export default profesoresRoutes.router;