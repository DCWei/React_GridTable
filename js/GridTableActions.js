import {actionType} from './constant/actionType';
import getPageData from './FakeData/CommandTrackingDataSource';

export function changeCurrentPage(PageNum) {
	return dispatch => {
		const action = {
			type: actionType.CHANGE_CURRENT_PAGE,
			PageNum
		};
		dispatch(action);
	}
}

export function loadData(data) {
	const {pagination, sorting} = data;
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
			"page_size": "20"
		}
	};
	param.param.page_num = pagination.pageNum;
	param.param.page_size = pagination.pageSize;
	param.param.order_by = sorting.sortColumn;
	if(sorting.sortOrder === "DESC")
		param.param.order_direction = 0;
	else
		param.param.order_direction = 1;
	return dispatch => {
		const action = {
			type: actionType.LOAD_DATA,
			data: getPageData(param)
		}
		dispatch(action);
	};
}
