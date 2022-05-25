"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const institutosController_1 = require("../controllers/institutosController");
const auth_1 = require("../middleware/auth");
class InstitutosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando institutos'));
        this.router.post('/create', auth_1.validarToken, institutosController_1.institutosController.create);
        this.router.put('/actualizar/:idInstituto', auth_1.validarToken, institutosController_1.institutosController.actualizar);
        this.router.delete('/eliminar/:idInstituto', auth_1.validarToken, institutosController_1.institutosController.eliminar);
        this.router.get('/all', auth_1.validarToken, institutosController_1.institutosController.list);
        this.router.get('/:idInstituto', auth_1.validarToken, institutosController_1.institutosController.listOne);
    }
}
const institutosRoutes = new InstitutosRoutes();
exports.default = institutosRoutes.router;
