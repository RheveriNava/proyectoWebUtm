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
exports.articuloController = void 0;
const database_1 = __importDefault(require("../database"));
class ArticuloController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("list");
            const respuesta = yield database_1.default.query('SELECT * FROM Articulo');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listOne");
            const { idArticulo } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM Articulo WHERE idArticulo = ?', [idArticulo]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Articulo no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const resp = yield database_1.default.query("INSERT INTO Articulo set ?", [req.body]);
            let dato = {
                'idProfesor': idProfesor,
                'idArticulo': resp.insertId,
                'pos': 1,
                'valido': 1
            };
            const resp2 = yield database_1.default.query("INSERT INTO ArticuloYProfesor set ?", [dato]);
            console.log("create***", resp);
            res.json(resp);
            //res.json(resp2);
        });
    }
    listOneByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listOneByNombre");
            const { titulo } = req.params;
            const respuesta = yield database_1.default.query('SELECT idArticulo FROM Articulo WHERE titulo = ? ORDER BY idArticulo DESC', [titulo]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Articulo no encontrado' });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("actualizar");
            const { idArticulo } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE Articulo set ? WHERE idArticulo= ?", [req.body, idArticulo]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("eliminar");
            const { idArticulo } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM Articulo WHERE idArticulo= ${idArticulo}`);
            res.json(resp);
        });
    }
    articulosByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("articulosByCarrera");
            const { idCarrera } = req.params;
            const resp = yield database_1.default.query("SELECT DISTINCT articulo.* FROM articulo, articuloyprofesor,profesores WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = profesores.idProfesor AND profesores.idCarrera = ?", [idCarrera]);
            res.json(resp);
        });
    }
    /* public async articulosByInsituto(req: Request, res: Response): Promise<void>
    {
        console.log("articulosByInsituto")
        const { idInstituto } = req.params;
        let respuesta: any[] = [];
        const resp = await pool.query("SELECT DISTINCT articulo.* FROM articulo, articuloyprofesor,profesores WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = profesores.idProfesor AND profesores.idInstituto = ?",[idInstituto]);
        console.log('1')
        await resp.forEach(async (elemento:any,i:number) =>{
            //console.log('i',i)
            respuesta[i]= elemento
            let consulta = `SELECT Profesores.*,ArticuloYProfesor.pos FROM Profesores , ArticuloYProfesor WHERE Profesores.idProfesor = ArticuloYProfesor.idProfesor AND ArticuloYProfesor.idArticulo = ${elemento.idArticulo} ORDER BY ArticuloYProfesor.pos ASC`;
            const respuest = await pool.query(consulta);
            console.log('respuest',respuest)
            respuesta[i].profesores = respuest;
        })
        //console.log('respuesta',respuesta)
        res.json(respuesta);
    } */
    articulosByInsituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            let respuesta = yield database_1.default.query('SELECT * FROM articulo as A INNER JOIN articuloyprofesor AP ON AP.idArticulo=A.idArticulo INNER JOIN profesores P ON P.idProfesor=AP.idProfesor WHERE P.idInstituto=?', idInstituto);
            // Obtener los profesores participantes
            for (let i = 0; i < respuesta.length; i++) {
                const respuesta2 = yield database_1.default.query('SELECT * FROM profesores as P INNER JOIN articuloyprofesor AP ON AP.idProfesor=P.idProfesor WHERE AP.idArticulo=?', respuesta[i].idArticulo);
                respuesta[i].profesores = respuesta2;
            }
            res.json(respuesta);
        });
    }
    //SELECT DISTINCT articulo.*,profesores FROM articulo, articuloyprofesor,profesores WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = profesores.idProfesor AND profesores.idInstituto = '2' AND profesores IN (Profesores.* FROM Profesores , ArticuloYProfesor WHERE Profesores.idProfesor = ArticuloYProfesor.idProfesor AND ArticuloYProfesor.idArticulo = articulo.idArticulo ORDER BY ArticuloYProfesor.pos ASC)
    listByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listByProfesor");
            const { idProfesor } = req.params;
            const respuesta = yield database_1.default.query('SELECT DISTINCT * FROM Articulo A INNER JOIN ArticuloYProfesor AYP ON AYP.idArticulo=A.idArticulo WHERE idProfesor = ?', [idProfesor]);
            res.json(respuesta);
        });
    }
    listByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ini, fin } = req.params;
            console.log("listByPeriodo");
            let consulta = `SELECT * FROM Articulo WHERE fechaEdicion>='${ini}' AND fechaEdicion<='${fin}'`;
            console.log(consulta);
            const respuesta = yield database_1.default.query('SELECT DISTINCT * FROM Articulo WHERE fechaEdicion>=? AND fechaEdicion<=?', [ini, fin]);
            res.json(respuesta);
        });
    }
    listArticulosByProfesorByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor, ini, fin } = req.params;
            console.log("listArticulosByProfesorByPeriodo");
            let consulta = `SELECT * FROM articulo, articuloyprofesor WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = '${idProfesor}' AND  fechaEdicion>='${ini}' AND fechaEdicion<='${fin}'`;
            console.log(consulta);
            const respuesta = yield database_1.default.query('SELECT DISTINCT articulo.* FROM articulo, articuloyprofesor WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = ? AND fechaEdicion>=? AND fechaEdicion<=?', [idProfesor, ini, fin]);
            res.json(respuesta);
        });
    }
    listArticulosByInstitutoByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto, ini, fin } = req.params;
            console.log("listArticulosByInstitutoByPeriodo");
            let consulta = `SELECT * FROM articulo, articuloyprofesor,profesores WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = profesores.idProfesor AND profesores.idInstituto = '${idInstituto}' AND  fechaEdicion>='${ini}' AND fechaEdicion<='${fin}'`;
            console.log(consulta);
            const respuesta = yield database_1.default.query('SELECT DISTINCT articulo.* FROM articulo, articuloyprofesor, profesores WHERE articuloyprofesor.idArticulo = articulo.idArticulo AND articuloyprofesor.idProfesor = profesores.idProfesor AND profesores.idInstituto = ? AND fechaEdicion>=? AND fechaEdicion<=?', [idInstituto, ini, fin]);
            res.json(respuesta);
        });
    }
    listArticulosAllByInstitutoByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ini, fin } = req.params;
            const consulta = yield database_1.default.query('SELECT articulo.*,profesores.idInstituto,MIN(articuloyprofesor.pos) pos FROM articuloyprofesor,profesores,articulo WHERE articuloyprofesor.idProfesor = profesores.idProfesor AND articuloyprofesor.idArticulo = articulo.idArticulo AND profesores.idInstituto != 0  AND fechaEdicion >= ? AND fechaEdicion <= ? GROUP BY articuloyprofesor.idArticulo ORDER BY `articuloyprofesor`.`idArticulo` ASC', [ini, fin]);
            res.json(consulta);
            //SELECT articulo.*,profesores.idInstituto,MIN(articuloyprofesor.pos) pos FROM articuloyprofesor,profesores,articulo WHERE articuloyprofesor.idProfesor = profesores.idProfesor AND articuloyprofesor.idArticulo = articulo.idArticulo GROUP BY articuloyprofesor.idArticulo ORDER BY `articuloyprofesor`.`idArticulo` ASC
        });
    }
}
exports.articuloController = new ArticuloController();
