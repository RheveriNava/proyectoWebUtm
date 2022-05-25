"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profesoresController_1 = require("../controllers/profesoresController");
const auth_1 = require("../middleware/auth");
class ProfesoresRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, profesoresController_1.profesoresController.list);
        this.router.get('/:idProfesor', auth_1.validarToken, profesoresController_1.profesoresController.listOne);
        this.router.post('/create', auth_1.validarToken, profesoresController_1.profesoresController.create);
        this.router.put('/actualizar/:idProfesor', auth_1.validarToken, profesoresController_1.profesoresController.actualizar);
        this.router.put('/actualizarProfesorSinContrasena/:idProfesor', auth_1.validarToken, profesoresController_1.profesoresController.actualizarProfesorSinContrasena);
        this.router.delete('/eliminar/:idProfesor', auth_1.validarToken, profesoresController_1.profesoresController.eliminar);
        this.router.get('/listAutorByArticulo/:idArticulo', auth_1.validarToken, profesoresController_1.profesoresController.listAutorByArticulo);
        this.router.post('/existe', auth_1.validarToken, profesoresController_1.profesoresController.existe);
        this.router.post('/cambiarContrasenya', auth_1.validarToken, profesoresController_1.profesoresController.cambiarContrasenya);
        this.router.get('/listProfesorByInstituto/:idInstituto', auth_1.validarToken, profesoresController_1.profesoresController.listProfesorByInstituto);
        this.router.get('/listProfesorByCarrera/:idCarrera', auth_1.validarToken, profesoresController_1.profesoresController.listProfesorByCarrera);
    }
}
const profesoresRoutes = new ProfesoresRoutes();
exports.default = profesoresRoutes.router;
