import dotenv from 'dotenv';
import express from 'express';
import MasterRouter from './routers/MasterRouter';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config({
	path: '.env'
});

class Server {
	public app = express();
	public router = MasterRouter;
}

const server = new Server();

server.app.use(
	cors({
		origin: ['http://localhost:3006'],
		credentials: true
	})
);

server.app.use(bodyParser.json());
server.app.use(express.urlencoded({ extended: false }));
server.app.use(cookieParser());

server.app.use('/api', server.router);

const port = process.env.PORT || '3000';
server.app.set('port', port);
server.app.listen(port, () => console.log('Listening on port: ', port));
