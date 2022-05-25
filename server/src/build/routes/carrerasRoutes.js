"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carrerasController_1 = require("../controllers/carrerasController");
const auth_1 = require("../middleware/auth");
class CarrerasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, carrerasController_1.carrerasController.list);
        this.router.get('/:idCarrera', auth_1.validarToken, carrerasController_1.carrerasController.listOne);
        this.router.post('/create', auth_1.validarToken, carrerasController_1.carrerasController.create);
        this.router.put('/actualizar/:idCarrera', auth_1.validarToken, carrerasController_1.carrerasController.actualizar);
        this.router.delete('/eliminar/:idCarrera', auth_1.validarToken, carrerasController_1.carrerasController.eliminar);
        this.router.get('/getCarrerasByInstituto/:idInstituto', auth_1.validarToken, carrerasController_1.carrerasController.getCarrerasByInstituto);
    }
}
const carrerasRoutes = new CarrerasRoutes();
exports.default = carrerasRoutes.router;
