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
		let columns = [
			{
				key: 'trigger_time',
				label: 'Issued',
				sortable: true
			},
			{
				key: 'message_id',
				label: 'Command',
				sortable: true
			},
			{
				key: 'user_access_id',
				label: 'User',
				sortable: true
			},
			{
				key: 'total_success',
				label: 'Successful',
				width: 100
			},
			{
				key: 'total_failure',
				label: 'Unsuccessful',
				width: 100
			},
			{
				key: 'total_inprogress',
				label: 'InProgress',
				width: 100
			},
			{
				key: 'total_command_items',
				label: 'All',
				width: 100
			},
		];
		return (
			<div className="main">
				<GridTable />
			</div>
		);
	}
}

const store = configureStore();

ReactDOM.render(
	(<Provider store={store}>
		<Main />
	</Provider>),
	document.getElementById('container')
);
