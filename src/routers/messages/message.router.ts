// @ts-nocheck
import { NextFunction, Request, Response, Router } from 'express';
import MessageController from '../../controllers/messages.controller';

class MessageRouter {
	private _router = Router();
	private _controller = MessageController;

	get router() {
		return this._router;
	}

	constructor() {
		this._configure();
	}

	private _configure() {
		this._router.get('/messages', (req: Request, res: Response, next: NextFunction) => {
			res.status(200).json({ messages: this._controller.allMessages() });
		});

		this._router.post('/message', (req: Request, res: Response, next: NextFunction) => {
			this._controller.create(req.body);
			res.status(200).json({ messages: this._controller.allMessages() });
		});

		this._router.delete('/message/:id', (req: Request, res: Response, next: NextFunction) => {
			this._controller.delete(+req.params.id);
			res.status(200).json({ messages: this._controller.allMessages() });
		});
	}
}

export = new MessageRouter().router;
