import React from 'react';
import styled from 'styled-components';
import { IMessage } from '../../schemas/index';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		margin: 12,
		minWidth: 275,
		maxWidth: 275
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	text: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
});

interface ISingleMessageProps {
	message: IMessage;
	deleteMessage: () => void;
}

const SingleMessage: React.FunctionComponent<ISingleMessageProps> = ({
	message,
	deleteMessage
}) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.text} color="textSecondary" gutterBottom>
					Sender: {message.senderName}
				</Typography>

				<Typography className={classes.text} color="textSecondary" gutterBottom>
					Receiver: {message.receiverName}
				</Typography>

				<Typography className={classes.text} color="textSecondary" gutterBottom>
					{message.subject}
				</Typography>
				<hr></hr>
				<Typography className={classes.text} color="textSecondary" gutterBottom>
					{message.message}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={() => deleteMessage()}>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default SingleMessage;
