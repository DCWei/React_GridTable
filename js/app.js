import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import configureStore from "./ConfigStore";
import gridTableReducer from './GridTableReducer';
import {actionType} from './constant/actionType';
import Immutable from 'immutable';
import * as gridTableActions from './GridTableActions';
import DevTools from "./DevTools";
import Main from './main';

const store = configureStore();

ReactDOM.render(
	(<Provider store={store}>
		<Main />
	</Provider>),
	document.getElementById('container')
);
