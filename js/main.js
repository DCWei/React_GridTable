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

const test = Immutable.fromJS({
	a: {
		b: 1,
		c: 2,
		d: 3
	},
	pagination: {
		pageNum: 1,
		pageSize: 20,
		totalPage: 1,
		totalCount: 1,
		entryStart: 1,
		entryEnd: 1,
	}
});

//var ss = test.toJS().pagination;
var kk = {
	e: 11,
	f: 22
}
var ss = {
	pageSize: 30,
	totalPage: 2,
	totalCount: 32,
	entryStart: 2,
	entryEnd: 30
};
var cc = test.mergeDeep({pagination: ss}).mergeDeep({a: kk});

console.log(cc.toJS());
//console.log(ss.toJS());

const store = configureStore();
console.log(store.getState().gridTableReducer.toJS());

ReactDOM.render(
	(<Provider store={store}>
		<Main />
	</Provider>),
	document.getElementById('container')
);
