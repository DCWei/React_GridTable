import {actionType} from './constant/actionType';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
	status: 0,
	pagination: {
		pageNum: 1,
		pageSize: 15,
		totalPage: 1,
		totalCount: 1,
		entryStart: 1,
		entryEnd: 1,
		pageSizeList: [1, 5, 10, 15, 30]
	},
	sorting: {
		sortColumn: "trigger_time",
		sortOrder: "desc"
	},
	records: []
});

export default function gridTableReducer(state = initialState, action = {}) {
	console.log("Action type: " + action.type);
	switch(action.type)
	{
		case actionType.CHANGE_PAGE_INFO_SETTING:
			return state.mergeDeep({pagination:action.pageInfo});
		case actionType.CHANGE_SORT_INFO_SETTING:
			return state.mergeDeep({sorting: {sortColumn: action.sortInfo.key, sortOrder: action.sortInfo.direction}});
		case actionType.LOAD_DATA:
			console.log("Update loaded data to state.");
			console.log('commands:');
			console.log(action.data.data.commands);
			let newRecords = action.data.data.commands.map(row => { 
				let data = row;
				data.total_inprogress = parseInt(data.total_command_items) - (parseInt(data.total_success) + parseInt(data.total_failure));
				return data;
			});
			console.log('newRecords');
			console.log(newRecords);
			let newPagination = {
				pageNum: action.data.data.pages.current_page,
				totalPage: action.data.data.pages.total_page,
				totalCount: action.data.data.pages.total_records,
				entryStart: state.toJS().pagination.pageSize*(action.data.data.pages.current_page - 1) + 1,
				entryEnd: state.toJS().pagination.pageSize*(action.data.data.pages.current_page - 1) + newRecords.length,
			};

			return state.mergeDeep({pagination: newPagination})
						.updateIn(['records'], obj => newRecords);
		default:
			return state;
	}
}
