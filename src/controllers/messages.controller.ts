import Message, { IMessage } from '../entities/message.entity';

class MessageController {
	allMessages() {
		return Message.getAll();
	}

	create(newMsg: IMessage) {
		return Message.new(newMsg);
	}

	delete(id: number) {
		return Message.delete(id);
	}
}

export = new MessageController();
