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
exports.actividadesController = void 0;
const database_1 = __importDefault(require("../database"));
class ActividadesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("list");
            const respuesta = yield database_1.default.query('SELECT * FROM Actividades');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listOne");
            const { idActividad } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM Actividades WHERE idActividad = ?', [idActividad]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Actividades no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const resp = yield database_1.default.query("INSERT INTO Actividades set ?", [req.body]);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("actualizar");
            const { idActividad } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE Actividades set ? WHERE idActividad= ?", [req.body, idActividad]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("eliminar");
            const { idActividad } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM Actividades WHERE idActividad= ${idActividad}`);
            res.json(resp);
        });
    }
    listActividadesByProfesorByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor, ini, fin } = req.params;
            const respuesta = yield database_1.default.query('SELECT DISTINCT * FROM Actividades WHERE idProfesor = ? AND inicio>=? AND fin<=?', [idProfesor, ini, fin]);
            respuesta.forEach((res) => {
                res.inicio = res.inicio.toLocaleDateString();
                res.fin = res.fin.toLocaleDateString();
            });
            res.json(respuesta);
        });
    }
    //------------------------------------------------------------------------
    ActividadesByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ActividadessByCarrera");
            const { idCarrera } = req.params;
            const resp = yield database_1.default.query("SELECT DISTINCT Actividades.* FROM Actividades,profesores WHERE Actividades.idProfesor = profesores.idProfesor AND profesores.idCarrera = ?", [idCarrera]);
            res.json(resp);
        });
    }
    actividadesByInsituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ActividadessByCarrera");
            const { idInstituto } = req.params;
            let consulta = 'SELECT * FROM Profesores WHERE Profesores.idInstituto = ' + idInstituto;
            const respuesta = yield database_1.default.query(consulta);
            for (let i = 0; i < respuesta.length; i++) {
                const resp = yield database_1.default.query("SELECT DISTINCT * FROM Actividades WHERE Actividades.idProfesor = ?", [respuesta.idProfesor]);
                respuesta[i].actividades = resp;
            }
            res.json(respuesta);
        });
    }
    listByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listByProfesor");
            const { idProfesor } = req.params;
            const respuesta = yield database_1.default.query('SELECT DISTINCT * FROM Actividades WHERE idProfesor = ?', [idProfesor]);
            res.json(respuesta);
        });
    }
    listByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ini, fin } = req.params;
            console.log("listByPeriodo");
            let consulta = `SELECT * FROM Actividades WHERE inicio>='${ini}' AND fin<='${fin}'`;
            console.log(consulta);
            const respuesta = yield database_1.default.query('SELECT DISTINCT * FROM Actividades WHERE inicio>=? AND fin<=?', [ini, fin]);
            res.json(respuesta);
        });
    }
}
exports.actividadesController = new ActividadesController();
