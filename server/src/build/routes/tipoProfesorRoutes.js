"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoProfesorController_1 = require("../controllers/tipoProfesorController");
const auth_1 = require("../middleware/auth");
class TipoProfesorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, tipoProfesorController_1.tipoProfesorController.list);
        this.router.get('/:idTipoProfesor', auth_1.validarToken, tipoProfesorController_1.tipoProfesorController.listOne);
        this.router.post('/create', auth_1.validarToken, tipoProfesorController_1.tipoProfesorController.create);
        this.router.put('/actualizar/:idTipoProfesor', auth_1.validarToken, tipoProfesorController_1.tipoProfesorController.actualizar);
        this.router.delete('/eliminar/:idTipoProfesor', auth_1.validarToken, tipoProfesorController_1.tipoProfesorController.eliminar);
    }
}
const tipoProfesorRoutes = new TipoProfesorRoutes();
exports.default = tipoProfesorRoutes.router;
