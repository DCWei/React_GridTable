import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import gridTableReducer from './GridTableReducer';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
	return createStore(
		combineReducers({gridTableReducer}),
		initialState,
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	);
};