import {actionType} from './constant/actionType';

export function changeCurrentPage(PageNum) {
	return dispatch => {
		const action = {
			type: actionType.CHANGE_CURRENT_PAGE,
			PageNum
		};
		dispatch(action);
	}
}