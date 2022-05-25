"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoProfesorController = void 0;
const database_1 = __importDefault(require("../database"));
class TipoProfesorController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM tipoprofesor');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idTipoProfesor } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM tipoprofesor WHERE idTipoProfesor = ?', [idTipoProfesor]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query("INSERT INTO tipoprofesor  set ?", [req.body]);
            res.json(respuesta);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idTipoProfesor } = req.params;
            console.log(req.params);
            const respuesta = yield database_1.default.query("UPDATE tipoprofesor set ? WHERE idTipoProfesor = ?", [req.body, idTipoProfesor]);
            res.json(respuesta);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idTipoProfesor } = req.params;
            const respuesta = yield database_1.default.query(`DELETE FROM tipoprofesor WHERE idTipoProfesor = ${idTipoProfesor}`);
            res.json(respuesta);
        });
    }
}
exports.tipoProfesorController = new TipoProfesorController();
