"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventosController_1 = require("../controllers/eventosController");
const auth_1 = require("../middleware/auth");
class ActividadesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, eventosController_1.eventosController.list);
        this.router.get('/:idEventos', auth_1.validarToken, eventosController_1.eventosController.listOne);
        this.router.post('/create/:idProfesor', auth_1.validarToken, eventosController_1.eventosController.create);
        this.router.put('/actualizar/:idEventos', auth_1.validarToken, eventosController_1.eventosController.actualizar);
        this.router.delete('/eliminar/:idEventos', auth_1.validarToken, eventosController_1.eventosController.eliminar);
        this.router.get('/listEventosByProfesorByPeriodo/:idProfesor/:ini/:fin', auth_1.validarToken, eventosController_1.eventosController.listEventosByProfesorByPeriodo);
        this.router.get('/listByPeriodo/:ini/:fin', auth_1.validarToken, eventosController_1.eventosController.listByPeriodo);
    }
}
const actividadesRoutes = new ActividadesRoutes();
exports.default = actividadesRoutes.router;
