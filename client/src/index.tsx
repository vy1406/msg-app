import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from './app/reducers';
import rootSaga from './app/sagas';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
reportWebVitals();
