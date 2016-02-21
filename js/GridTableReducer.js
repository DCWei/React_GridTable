import {actionType} from './constant/actionType';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
	status: 0,
	totalCount: 10,
	pagination: {
		pageNum: 1,
		pageSize: 20
	},
	sorting: {
		sortColumn: "trigger_time",
		sortOrder: "DESC"
	},
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
});

export default function gridTableReducer(state = initialState, action = {}) {
	console.log("Action type: " + action.type);
	switch(action.type)
	{
		case actionType.CHANGE_CURRENT_PAGE:
			return state.mergeDeep({pagination:{pageNum: action.PageNum}});
		default:
			return state;
	}
}
