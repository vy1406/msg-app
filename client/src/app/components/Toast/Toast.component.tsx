import React, { useEffect } from 'react';
import styled from 'styled-components';
import './Toast.css';
import { connect } from 'react-redux';
import { IAppState, ToastType } from '../../schemas';
import { hideToast } from '../../actions';

const Container = styled.div<{ color: string }>`
	visibility: hidden;
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 30px;
	left: 50%;
	padding: 10px 20px;
	z-index: 1;
	opacity: 0.9;
	color: white;
	border-radius: 20px;
	background-color: ${({ color }) => color};

	&.show {
		visibility: visible;
		-webkit-animation: fadein 0.5s, fadeout 0.5s 3s;
		animation: fadein 0.5s, fadeout 0.5s 2.5s;
	}
`;

const colorMap = {
	[ToastType.Info]: '#4C4C63',
	[ToastType.Error]: '#FF5B4D'
};

const Text = styled.div``;

interface IToastProps {
	showToast?: boolean;
	toastMessage?: string;
	toastType?: ToastType;
	hideToast: () => void;
}

export const Toast: React.FunctionComponent<IToastProps> = ({
	showToast,
	toastMessage,
	toastType = ToastType.Info,
	hideToast
}: IToastProps) => {
	useEffect(() => {
		setTimeout(() => {
			hideToast();
		}, 3000);
	}, [showToast]);

	return (
		<Container color={colorMap[toastType]} className={showToast ? 'show' : ''}>
			<Text>{toastMessage}</Text>
		</Container>
	);
};

const mapStateToProps = (state: IAppState) => ({
	showToast: state.showToast,
	toastMessage: state.toastMessage,
	toastType: state.toastType
});

const mapDispatchToProps = {
	hideToast: hideToast
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
