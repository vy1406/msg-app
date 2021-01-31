import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { saveMessage } from '../../actions';
import { IMessage } from '../../schemas/index';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	},
	numberInput: {
		width: 100,
		height: 50
	},
	messageBody: {
		marginTop: 15,
		padding: 10,
		width: 300,
		height: 100
	},
	submitButton: {
		marginTop: 12,
		width: 200,
		height: 50
	},
	messageSubject: {
		padding: 10,
		width: 300,
		height: 30
	}
}));

const Page = styled.div`
	width: 100%;
	align-items: center;
	display: flex;
	flex-direction: column;
`;

const ErrorWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledForm = styled.form`
	height: 400px;
	padding: 20px;
	justify-content: space-between;
	align-items: center;
	display: flex;
	flex-direction: column;
`;

const FormRow = styled.div`
	height: 60px;
	width: 300px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const SingleError = styled.div`
	margin-top: 18px;
	padding: 12px;
	display: flex;
	box-sizing: border-box;
	align-items: center;
	width: 100%;
	border-radius: 8px;
	background-color: #e22134;
	user-select: none;
`;

const ErrorText = styled.div`
	margin-left: 16px;
	font-size: 14px;
	font-weight: 500;
	color: #fff;
	font-family: sans-serif;
`;

interface IComposeProps {
	submitMessage: (form: any) => void;
}

const Compose: React.FunctionComponent<IComposeProps> = ({ submitMessage }) => {
	const { register, handleSubmit, errors, getValues, reset } = useForm();
	const classes = useStyles();
	const formToServerMsg = (form: any): IMessage => ({
		sender: +form.sender,
		receiver: +form.receiver,
		message: form.message,
		subject: form.subject
	});

	const validateThenSave = (form: any) => {
		submitMessage(formToServerMsg(form));
		reset();
	};

	const validateSender = (id: number) => {
		return id > 0 && id < 7;
	};

	const validateReceiver = (id: number) => {
		const senderId = getValues('sender');
		return id > 0 && id < 7 && senderId !== id;
	};

	const validateMessage = (value: string) => value.length > 0 && value.length < 50;

	const validateSubject = (value: string) => value.length > 0 && value.length < 20;

	const renderErrors = (errors: any) => {
		const arrErrors = [
			'Sender Id cannot be empty and from 1 to 6',
			'Receiver Id cannot be empty, must differ from sender id and from 1 to 6',
			'Message must be filled and less than 50 characters',
			'Subject must be filled and less than 10 characters'
		];

		const renderSingle = (errId: number) => (
			<SingleError>
				<ClearIcon style={{ fill: 'white' }} />
				<ErrorText>{arrErrors[errId]}</ErrorText>
			</SingleError>
		);

		return (
			<ErrorWrapper>
				{errors.sender && renderSingle(0)}
				{errors.receiver && renderSingle(1)}
				{errors.message && renderSingle(2)}
				{errors.subject && renderSingle(3)}
			</ErrorWrapper>
		);
	};

	return (
		<Page>
			<StyledForm onSubmit={handleSubmit(form => validateThenSave(form))}>
				<FormRow>
					<TextField
						className={classes.numberInput}
						id="sender"
						label="Sender Id"
						name="sender"
						type="number"
						variant="outlined"
						inputRef={register({ validate: value => validateSender(value) })}
					/>
					<TextField
						className={classes.numberInput}
						id="receiver"
						label="Sender Id"
						name="receiver"
						type="number"
						variant="outlined"
						inputRef={register({ validate: value => validateReceiver(value) })}
					/>
				</FormRow>
				<TextField
					className={classes.messageSubject}
					id="subject"
					label="Message subject"
					name="subject"
					type="text"
					variant="outlined"
					inputRef={register({ validate: value => validateSubject(value) })}
				/>
				<TextField
					className={classes.messageBody}
					id="message"
					label="Message body"
					name="message"
					type="text"
					variant="outlined"
					multiline
					rows={4}
					inputRef={register({ validate: value => validateMessage(value) })}
				/>

				<Button className={classes.submitButton} type="submit" variant="contained" color="primary">
					Send Message
				</Button>
			</StyledForm>
			{renderErrors(errors)}
		</Page>
	);
};

const mapDispatchToProps = {
	submitMessage: saveMessage
};

export default connect(null, mapDispatchToProps)(Compose);
