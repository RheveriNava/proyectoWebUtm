import express, {Application} from 'express';
import indexRoutes from './routes/indexRoutes';
import institutosRoutes from './routes/institutosRoutes';
import carrerasRoutes from './routes/carrerasRoutes';
import profesoresRoutes from './routes/profesoresRoutes';
import tipoProfesorRoutes from './routes/tipoProfesorRoutes';
import materiasRoutes from './routes/materiasRoutes';
import articuloyprofesorRoutes from './routes/articuloyprofesorRoutes';
import articuloRoutes from './routes/articuloRoutes';
import actividadesRoutes from './routes/actividadesRoutes';
import eventosRoutes from './routes/eventosRoutes';

import morgan from 'morgan';
import cors from 'cors';
import swagger_ui_express from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

class Server
{
	public app:Application;
	constructor()
	{
		this.app= express();
		this.config();
		this.routes();
		this.app.use('/documentacion',swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
		this.app.use(express.static(__dirname + '/img'));
		console.log(__dirname);
	}
	config(): void
	{
		this.app.set('port',process.env.PORT||3000);
		this.app.use(morgan('dev'));
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({extended: false}));

	}
	routes(): void
	{
		this.app.use(indexRoutes);
		this.app.use('/api/institutos',institutosRoutes);////////////////////////////////
		this.app.use('/api/carreras',carrerasRoutes);////////////////////////////////
		this.app.use('/api/profesores',profesoresRoutes);////////////////////////////////
		this.app.use('/api/tipoprofesor',tipoProfesorRoutes);
		this.app.use('/api/materias',materiasRoutes);
		this.app.use('/api/articuloYprofesor',articuloyprofesorRoutes);
		this.app.use('/api/articulo',articuloRoutes);////////////////////////////////
		this.app.use('/api/actividades',actividadesRoutes);
		this.app.use('/api/eventos',eventosRoutes);
	}
	start(): void
	{
		this.app.listen(this.app.get('port'), () =>
		{
			console.log('Server on port', this.app.get('port'));
		});
	}
}
const server= new Server();
server.start();