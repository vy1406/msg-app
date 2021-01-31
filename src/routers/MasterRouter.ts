import { Router } from 'express';
import MessageRouter from './messages/message.router';

class MasterRouter {
	private _router = Router();
	private msgRouter = MessageRouter;

	get router() {
		return this._router;
	}

	constructor() {
		this.configure();
	}

	private configure() {
		this._router.use('/', this.msgRouter);
	}
}

export = new MasterRouter().router;
