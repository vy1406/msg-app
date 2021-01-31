import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { IAppState } from '../../schemas/index';
import { dispatchHideSpinner } from '../../actions';
import styled from 'styled-components';

const StyledSpinner = styled(CircularProgress)`
	padding: 20px;
`;

interface ISpinnerProps {
	loading?: boolean;
	hideSpinner: () => void;
}

const Spinner: React.FunctionComponent<ISpinnerProps> = ({ loading, hideSpinner }) => {
	useEffect(() => {
		setTimeout(() => {
			hideSpinner();
		}, 2000);
	}, [loading]);

	return loading ? <StyledSpinner /> : <></>;
};

const mapStateToProps = (state: IAppState) => ({
	loading: state.isLoading
});

const mapDispatchToProps = {
	hideSpinner: dispatchHideSpinner
};

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
