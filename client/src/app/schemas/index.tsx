export enum ToastType {
	Info,
	Error
}

export interface IMessage {
	id?: number;
	sender: number;
	receiver: number;
	message: string;
	subject: string;
	creationDate?: Date;
	senderName?: string;
	receiverName?: string;
}

export interface IAppState {
	messages: IMessage[];
	isLoading: boolean;
	showToast?: boolean;
	toastMessage?: string;
	toastType?: ToastType;
}

export const INITIAL_STATE = {
	messages: [],
	isLoading: false
};

export const INIT_TOAST = {
	showToast: false,
	toastMessage: '',
	toastType: ToastType.Info
};
