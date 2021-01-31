import _ from 'lodash';

const dbUsers = require('../entities/users.json');

export interface IUser {
	id: number;
	username: string;
}

export default class User {
	static getByUsername = (username: string): IUser => {
		return _.find(dbUsers, dbUser => dbUser.username === username);
	};

	static getById = (id: number): IUser => {
		return _.find(dbUsers, dbUser => dbUser.id === id);
	};
}
