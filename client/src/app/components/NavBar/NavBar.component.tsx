import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/app.constants';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	}
});

const NavBar: React.FunctionComponent = () => {
	const classes = useStyles();
	const history = useHistory();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
		const path = newValue === 0 ? ROUTES.ROOT : ROUTES.MANAGE;
		history.push(path);
	};

	return (
		<Paper className={classes.root}>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Compose" />
				<Tab label="Manage" />
			</Tabs>
		</Paper>
	);
};

export default NavBar;
