export const getMessages = () => ({
	type: 'GET_MESSAGES'
});

export const saveMessage = (form: any) => ({
	type: 'SAVE_MESSAGE',
	payload: form
});

export const deleteSingleMessage = (id?: number) => ({
	type: 'DELETE_MESSAGE',
	payload: id
});

export const hideToast = () => ({ type: 'HIDE_TOAST' });

export const dispatchHideSpinner = () => ({ type: 'HIDE_SPINNER' });

export const showConnectionError = () => ({ type: 'CONNECTION_ERROR' });
