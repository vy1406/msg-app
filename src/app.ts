import express from 'express';
import MasterRouter from './routers/MasterRouter';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

class Server {
	public app = express();
	public router = MasterRouter;
}

const server = new Server();

server.app.use(
	cors({
		origin: ['https://vy1406-msg-client.herokuapp.com', 'http://localhost:3000'],
		credentials: false
	})
);

server.app.use(bodyParser.json());
server.app.use(express.urlencoded({ extended: false }));
server.app.use(cookieParser());

server.app.use('/api', server.router);

const port = process.env.PORT || '5000';
server.app.set('port', port);
server.app.listen(port, () => console.log('Listening on port: ', port));
