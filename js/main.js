import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GridTable } from './GridTable';
import {combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import {Provider} from 'react-redux';
import configStore from './ConfigStore';
import gridTableReducer from './GridTableStore';

class Main extends React.Component {
	render() {
		return (
			<div className="main">
				<GridTable data={"undefined"} />
			</div>
		);
	}
}

const store = configStore(combineReducers({gridTableReducer}));
ReactDOM.render(
	<Provider store={store}>
		<Main />
	</Provider>
	,
	document.getElementById('container')
);
