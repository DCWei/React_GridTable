import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import configureStore from "./ConfigStore";
import gridTableReducer from './GridTableReducer';
import * as gridTableActions from './GridTableActions';
import DevTools from "./DevTools";
import GridTable from './GridTable';
import {actionType} from './constant/actionType';
import Immutable from 'immutable';

class Main extends React.Component {
	render() {
		return (
			<div className="main">
				<GridTable />
			</div>
		);
	}
}

const store = configureStore();
console.log(store.getState().gridTableReducer.toJS());

ReactDOM.render(
	(<Provider store={store}>
		<Main />
	</Provider>),
	document.getElementById('container')
);
