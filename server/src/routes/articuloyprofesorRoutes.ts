import { Router } from 'express';
import { articuloyprofesorController } from '../controllers/articuloyprofesorController';
class ArticuloYProfesorRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.delete('/eliminarProfesorByArticulo/:idProfesor/:idArticulo',articuloyprofesorController.eliminarProfesorByArticulo)
        this.router.get('/', articuloyprofesorController.list );
        this.router.get('/:idAyP', articuloyprofesorController.listOne );
        this.router.post('/create', articuloyprofesorController.create);
        this.router.put('/actualizarPosicionofArticuloYProfesor/:idProfesor/:idArticulo',articuloyprofesorController.actualizarPosicionofArticuloYProfesor)
    }
}
const articuloyprofesorRoutes= new ArticuloYProfesorRoutes();
export default articuloyprofesorRoutes.router;