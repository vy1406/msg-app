import _ from 'lodash';
const dbUsers = require('../entities/users.json');

let nextId = 2;
const messages: IMessage[] = [
	{
		id: 1,
		sender: 1,
		receiver: 2,
		message: 'first msg',
		subject: 'Subject msg',
		creationDate: new Date()
	}
];

export interface IMessage {
	id: number;
	sender: number;
	receiver: number;
	message: string;
	subject: string;
	creationDate: Date;
	senderName?: string;
	receiverName?: string;
}

export default class Message {
	private static getUserNameById = (id: number) =>
		_.find(dbUsers, singleUser => singleUser.id === id).username;

	static getAll = (): IMessage[] =>
		_.map(messages, singleMessage => {
			const receiverName = _.capitalize(Message.getUserNameById(singleMessage.receiver));
			const senderName = _.capitalize(Message.getUserNameById(singleMessage.sender));
			return { ...singleMessage, receiverName, senderName };
		});

	static new = (newMsg: IMessage): void => {
		nextId++;
		messages.push({ ...newMsg, creationDate: new Date(), id: nextId });
	};

	static delete = (id: number): void => {
		_.remove(messages, { id });
	};
}
