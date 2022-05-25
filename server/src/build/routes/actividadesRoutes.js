"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadesController_1 = require("../controllers/actividadesController");
const auth_1 = require("../middleware/auth");
class ActividadesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, actividadesController_1.actividadesController.list);
        this.router.get('/:idActividad', auth_1.validarToken, actividadesController_1.actividadesController.listOne);
        this.router.post('/create/:idProfesor', auth_1.validarToken, actividadesController_1.actividadesController.create);
        this.router.put('/actualizar/:idActividad', auth_1.validarToken, actividadesController_1.actividadesController.actualizar);
        this.router.delete('/eliminar/:idActividad', auth_1.validarToken, actividadesController_1.actividadesController.eliminar);
        this.router.get('/listActividadesByProfesorByPeriodo/:idProfesor/:ini/:fin', auth_1.validarToken, actividadesController_1.actividadesController.listActividadesByProfesorByPeriodo);
        this.router.get('/listByPeriodo/:ini/:fin', auth_1.validarToken, actividadesController_1.actividadesController.listByPeriodo);
        this.router.post('/actividadesByInsituto/:idInstituto', auth_1.validarToken, actividadesController_1.actividadesController.actividadesByInsituto);
    }
}
const actividadesRoutes = new ActividadesRoutes();
exports.default = actividadesRoutes.router;
