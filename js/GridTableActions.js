import {actionType} from './constant/actionType';
import getPageData from './FakeData/CommandTrackingDataSource';

export function changePageInfoSetting(newPageInfo) {
	return (dispatch, getState) => {
		const actionChangePage = {
			type: actionType.CHANGE_PAGE_INFO_SETTING,
			pageInfo: newPageInfo
		};
		console.log('GridTableActions.changePageInfoSetting: actionChangePage=', actionChangePage);
		dispatch(actionChangePage);

		const newState = getState().gridTableReducer.toJS();
		const actionLoadData = {
			type: actionType.LOAD_DATA,
			data: getDataFromRemote(newState)
		};
		dispatch(actionLoadData);

	}
	
}

export function changeSortInfo(newSortInfo) {
	return (dispatch, getState) => {
		const actChangeSortInfo = {
			type: actionType.CHANGE_SORT_INFO_SETTING,
			sortInfo: newSortInfo
		};
		dispatch(actChangeSortInfo);

		const newState = getState().gridTableReducer.toJS();
		const actionLoadData = {
			type: actionType.LOAD_DATA,
			data: getDataFromRemote(newState)
		};
		dispatch(actionLoadData);
	}
}

export function loadData() {
	return (dispatch, getState) => {
		const state = getState().gridTableReducer.toJS();
		
		const action = {
			type: actionType.LOAD_DATA,
			data: getDataFromRemote(state)
		}
		dispatch(action);
	};
}

function getDataFromRemote(state) {
	const {pagination, sorting, others} = state;
	let param = {
		"param": {
			"time_type": "2",
			"from_time": "",
			"to_time": "",
			"message_id": "0",
			"search_user": "",
			"search_status": [
				"1",
				"2",
				"4"
			],
			"order_by": "trigger_time",
			"order_direction": "0",
			"page_num": "1",
			"page_size": "15"
		}
	};

	param.param.page_num = pagination.pageNum;
	param.param.page_size = pagination.pageSize;
	param.param.order_by = sorting.sortColumn;
	if(sorting.sortOrder === "DESC")
		param.param.order_direction = 0;
	else
		param.param.order_direction = 1;

	return getPageData(param);
}
