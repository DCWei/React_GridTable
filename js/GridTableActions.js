import {actionType} from './constant/actionType';
import getPageData from './FakeData/CommandTrackingDataSource';

export function changeCurrentPage(PageNum) {
	return (dispatch, getState) => {
		const actionChangePage = {
			type: actionType.CHANGE_CURRENT_PAGE,
			PageNum
		};
		dispatch(actionChangePage);

		const newState = getState().gridTableReducer.toJS();
		const actionLoadData = {
			type: actionType.LOAD_DATA,
			data: getDataFromRemote(newState)
		};
		dispatch(actionLoadData);

	}
	
}

export function changePageSizeSetting(newPageSize) {
	return (dispatch, getState) => {
		const actChangePageSize = {
			type: actionType.CHANGE_PAGE_SIZE_SETTING,
			PageSize: newPageSize
		}
		dispatch(actChangePageSize);

		const newState = getState().gridTableReducer.toJS();
		const actionLoadData = {
			type: actionType.LOAD_DATA,
			data: getDataFromRemote(newState)
		};
		dispatch(actionLoadData);
	};
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
