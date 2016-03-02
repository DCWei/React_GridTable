import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Provider} from 'react-redux';
import configureStore from "./ConfigStore";
import gridTableReducer from './GridTableReducer';
import * as gridTableActions from './GridTableActions';
import DevTools from "./DevTools";
import GridTable from './GridTable';
import {actionType} from './constant/actionType';
import Immutable from 'immutable';
import * as actions from './GridTableActions';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.onSortChange = ::this.onSortChange;
		this.onPageChange = ::this.onPageChange;
	}
	componentWillMount() {
		let {pagination, sorting} = this.props;
		let data = {pagination,sorting};
		this.props.actions.loadData(data);
	}
	onSortChange(newSortInfo) {
		console.log('Main.onSortChange: newSortInfo= ', newSortInfo);
		this.props.actions.changeSortInfo(newSortInfo);
	}
	onPageChange(newPageInfo) {
		console.log('Main.onPageChange: newPageInfo= ', newPageInfo);
		let pageInfo = {
			pageNum: newPageInfo.pageNum,
			pageSize: newPageInfo.pageSize
		}
		this.props.actions.changePageInfoSetting(pageInfo);
	}
	render() {
		let columns = [
			{
				key: 'trigger_time',
				label: 'Issued',
				sortable: true
			},
			{
				key: 'message_id',
				label: 'Command',
				sortable: true
			},
			{
				key: 'user_access_id',
				label: 'User',
				sortable: true
			},
			{
				key: 'total_success',
				label: 'Successful',
				width: 100
			},
			{
				key: 'total_failure',
				label: 'Unsuccessful',
				width: 100
			},
			{
				key: 'total_inprogress',
				label: 'InProgress',
				width: 100
			},
			{
				key: 'total_command_items',
				label: 'All',
				width: 100
			},
		];
		return (
			<div className="main">
				<GridTable 
					columnMinWidth={100}
					columns={columns}
					data={this.props.records}
					page={parseInt(this.props.pagination.pageNum)}
					pageSize={parseInt(this.props.pagination.pageSize)}
					totalCount={parseInt(this.props.pagination.totalCount)}
					pageSizeList={this.props.pagination.pageSizeList}
					sortInfo={{key: this.props.sorting.sortColumn, direction: this.props.sorting.sortOrder}}
					isTextOverflowEllipsis={true}
					onSortChange={this.onSortChange}
					onPageChange={this.onPageChange}
				/>
			</div>
		);
	}
}

export default connect(
  state => state.gridTableReducer.toJS(),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Main);


