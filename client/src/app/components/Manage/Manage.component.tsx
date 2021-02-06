import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getMessages, deleteSingleMessage } from '../../actions';
import Spinner from '../Spinner/Spinner.component';

import { IAppState } from '../../schemas';
import { IMessage } from '../../schemas/index';
import SingleMessage from '../SingleMessage/SingleMessage.component';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	submitButton: {
		width: 200,
		height: 40,
		marginTop: 12
	}
}));

const Page = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const MessageWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: row;
	flex-wrap: wrap;
`;

interface IManageProps {
	messages: IMessage[];
	isFetching: boolean;
	deleteMessage: (id?: number) => void;
	getAllMessages: () => void;
}

const Manage: React.FunctionComponent<IManageProps> = ({
	messages,
	isFetching,
	deleteMessage,
	getAllMessages
}) => {
	useEffect(() => {
		getAllMessages();
	}, [getAllMessages]);

	const classes = useStyles();
	return (
		<Page>
			<Button
				className={classes.submitButton}
				type="submit"
				variant="contained"
				color="primary"
				onClick={getAllMessages}
			>
				Show messages
			</Button>
			{isFetching ? (
				<Spinner />
			) : (
				<MessageWrapper>
					{_.map(messages, (singleMessage, key) => (
						<SingleMessage
							key={key}
							message={singleMessage}
							deleteMessage={() => deleteMessage(singleMessage.id)}
						/>
					))}
				</MessageWrapper>
			)}
		</Page>
	);
};

const mapDispatchToProps = {
	getAllMessages: getMessages,
	deleteMessage: deleteSingleMessage
};

const mapStateToProps = (state: IAppState) => ({
	messages: state.messages,
	isFetching: state.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
