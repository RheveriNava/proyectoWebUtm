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
exports.eventosController = void 0;
const database_1 = __importDefault(require("../database"));
class EventosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("list");
            const respuesta = yield database_1.default.query('SELECT * FROM Eventos');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listOne");
            const { idEvento } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM Eventos WHERE idEvento = ?', [idEvento]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Eventos no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const resp = yield database_1.default.query("INSERT INTO Eventos set ?", [req.body]);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("actualizar");
            const { idEvento } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE Eventos set ? WHERE idEvento= ?", [req.body, idEvento]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("eliminar");
            const { idEvento } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM Eventos WHERE idEvento= ${idEvento}`);
            res.json(resp);
        });
    }
    listEventosByProfesorByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor, ini, fin } = req.params;
            console.log("listByPeriodo");
            const respuesta = yield database_1.default.query('SELECT DISTINCT * FROM Eventos WHERE idProfesor = ? AND inicio>=? AND fin<=?', [idProfesor, ini, fin]);
            res.json(respuesta);
        });
    }
    //------------------------------------------------------------------------
    EventosByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("EventossByCarrera");
            const { idCarrera } = req.params;
            const resp = yield database_1.default.query("SELECT DISTINCT Eventos.* FROM Eventos,profesores WHERE Eventos.idProfesor = profesores.idProfesor AND profesores.idCarrera = ?", [idCarrera]);
            res.json(resp);
        });
    }
    EventosByInsituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("EventossByCarrera");
            const { idInstituto } = req.params;
            const resp = yield database_1.default.query("SELECT DISTINCT Eventos.* FROM Eventos,profesores WHERE Eventos.idProfesor = profesores.idProfesor AND profesores.idInstituto = ?", [idInstituto]);
            res.json(resp);
        });
    }
    listByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listByProfesor");
            const { idProfesor } = req.params;
            const respuesta = yield database_1.default.query('SELECT DISTINCT * FROM Eventos WHERE idProfesor = ?', [idProfesor]);
            res.json(respuesta);
        });
    }
    listByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ini, fin } = req.params;
            console.log("listByPeriodo");
            let consulta = `SELECT * FROM Eventos WHERE inicio>='${ini}' AND fin<='${fin}'`;
            console.log(consulta);
            const respuesta = yield database_1.default.query('SELECT DISTINCT * FROM Eventos WHERE inicio>=? AND fin<=?', [ini, fin]);
            res.json(respuesta);
        });
    }
}
exports.eventosController = new EventosController();
