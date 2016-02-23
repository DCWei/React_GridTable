import * as React from 'react';
import '../css/GridTable.css';
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import * as actions from './GridTableActions';
import Immutable from 'immutable';

var ajaxParam = {
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

class TableHead extends React.Component {
	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map(function(col) {
						return <HeadCell key={col.key} data={col} />;
					})}
				</tr>
			</thead>
		);
	}
}

class TableFoot extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	}
	ChangeCurrentPage(e, pageNum, props) {
		if(!$(e.target).hasClass('disable')) {
			if(pageNum >= 1 && pageNum <= props.pagination.totalPage) {
				props.actions.changeCurrentPage(pageNum);
			}
		}
	}
	UpdateBtnStatus() {
		let $btn_first = $('.pageControl .btn_first');
		let $btn_prev = $('.pageControl .btn_prev');
		let $btn_next = $('.pageControl .btn_next');
		let $btn_last = $('.pageControl .btn_last');
		if(this.props.pagination.pageNum === 1) {
			$btn_first.addClass('disable');
			$btn_prev.addClass('disable');
		}
		else{
			$btn_first.removeClass('disable');
			$btn_prev.removeClass('disable');
		}

		if(this.props.pagination.pageNum === this.props.pagination.totalPage) {
			$btn_last.addClass('disable');
			$btn_next.addClass('disable');
		}
		else {
			$btn_last.removeClass('disable');
			$btn_next.removeClass('disable');
		}
	}
	render() {
		console.log("render >>>");
		let {columns, actions, pagination} = this.props;
		this.UpdateBtnStatus();
		console.log("render <<<");
		return (
			<tfoot>
				<tr>
					<td colSpan={columns.length} className="pagerBar">
						<ul className="pageControl">
							<ul>
								<li>Records: {pagination.entryStart} - {pagination.entryEnd} / {pagination.totalCount}</li>
								<li className="page_btn btn_first" onClick={e => {this.ChangeCurrentPage(e, 1, this.props)}}></li>
								<li className="page_btn btn_prev" onClick={e => {this.ChangeCurrentPage(e, pagination.pageNum - 1, this.props)}}></li>
								<li className="pageInput">
									Page:&nbsp;&nbsp;
									<input type="text" className="currentPageInput" defaultValue={pagination.pageNum} value={pagination.pageNum}/>
									&nbsp;&nbsp;/&nbsp;&nbsp;{pagination.totalPage}
								</li>
								<li className="page_btn btn_next" onClick={e => {this.ChangeCurrentPage(e, pagination.pageNum + 1, this.props)}}></li>
								<li className="page_btn btn_last" onClick={e => {this.ChangeCurrentPage(e, pagination.totalPage, this.props)}}></li>
							</ul>
						</ul>
					</td>
				</tr>
			</tfoot>
		);
	}
}

class TableBody extends React.Component {
	render() {
		var that = this;
		return (
			<tbody>
				{this.props.data.records.map(function(row, i){
					return <Row key={i} data={row} columns={that.props.data.columns} />;
				})}
			</tbody>
		);
	}
}

class Row extends React.Component {
	render() {
		var that = this;
		return (
			<tr>
				{
					this.props.columns.map(
						function(col){
							return <Cell key={col.key} data={that.props.data[col.key]} />;
						}
					)
				}
			</tr>
		);
	}
}

class HeadCell extends React.Component {
	render() {
		return (
			<td>{this.props.data.label}</td>
		);
	}
}

class Cell extends React.Component {
	render() {
		return (
			<td>{this.props.data}</td>
		);
	}
}

class GridTable extends React.Component {
	componentWillMount() {
		console.log('componentWillMount >>>');
		let {pagination, sorting} = this.props;
		let data = {pagination, sorting};
		this.props.actions.loadData();
		console.log('componentWillMount <<<');
	}
	render() {
		let {status, actions, columns, records, pagination, others} = this.props;
		return (
			<table className="gridTable">
				<TableHead columns={columns} />
				<TableBody data={this.props} />
				<TableFoot columns={columns} pagination={pagination} actions={actions}/>
			</table>
		); 
	}
}

export default connect(
	state => state.gridTableReducer.toJS(),
	dispatch => ({
		actions: bindActionCreators(actions, dispatch)
	})
)(GridTable)
