import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GridTable } from './GridTable';

var data = {
	columns: [
		{
			key: 'trigger_time',
			label: 'Issued'
		},
		{
			key: 'message_id',
			label: 'Command'
		},
		{
			key: 'user_access_id',
			label: 'User'
		},
		{
			key: 'total_success',
			label: 'Successful'
		},
		{
			key: 'total_failure',
			label: 'Unsuccessful'
		},
		{
			key: 'total_inprogress',
			label: 'InProgress'
		},
		{
			key: 'total_command_items',
			label: 'All'
		},
	],
	records: [
		{
			'id': '000C29C5C0C8-56A0F404-02E1-F625-C6E2',
			'mother_id': '',
			'target_group': '1',
			'receiver_id': '000C29C5C0C8-56A0F404-02E1-F625-C6E2',
			'user_access_id': 'root',
			'message_id': '6009',
			'trigger_time': '2016-02-16 12:41:54.000',
			'update_time': '2016-02-16 15:58:30.000',
			'total_command_items': '1',
			'total_success': '1',
			'total_inprogress': '0',
			'error_description': 'Received a managed product registration request',
			'location': '',
			'parameters': 'Invoke service component',
			'command_data': '',
			'total_failure': '0',
		}
	]
};

class Main extends React.Component {
	render() {
		return (
			<div className="main">
				<GridTable data={data} />
			</div>
		);
	}
}

ReactDOM.render(
	<Main />,
	document.getElementById('container')
);
