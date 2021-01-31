import { put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import { ToastType } from '../schemas';

function* fetchMessages() {
	try {
		const json = yield fetch('http://localhost:3000/api/messages').then(response =>
			response.json()
		);

		yield put({ type: 'MESSAGES_RECEIVED', json: json });
	} catch (e) {
		yield put({ type: 'SHOW_TOAST', msg: 'Error fetching message', toastType: ToastType.Error });
	}
}

function* deleteMessage(payload: any) {
	try {
		const json = yield fetch(`http://localhost:3000/api/message/${payload.payload}`, {
			method: 'DELETE'
		}).then(response => response.json());
		yield put({ type: 'MESSAGE_DELETED', json: json });
		yield put({ type: 'SHOW_TOAST', msg: 'Message has been deleted', toastType: ToastType.Info });
	} catch (e) {
		yield put({ type: 'SHOW_TOAST', msg: 'Error deleting message', toastType: ToastType.Error });
	}
}

function* saveMessage(payload: any) {
	try {
		yield fetch('http://localhost:3000/api/message', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload.payload)
		}).then(response => response.json());
		yield put({ type: 'SHOW_TOAST', msg: 'Message was saved', toastType: ToastType.Info });
	} catch (e) {
		yield put({ type: 'SHOW_TOAST', msg: 'Error saving message', toastType: ToastType.Error });
	}
}

function* actionWatcher() {
	yield takeLatest('GET_MESSAGES', fetchMessages);
	yield takeEvery('DELETE_MESSAGE', deleteMessage);
	yield takeLatest('SAVE_MESSAGE', saveMessage);
}

export default function* rootSaga() {
	yield all([actionWatcher()]);
}
