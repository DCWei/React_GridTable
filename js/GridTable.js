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
		if(this.props.pageInfo.pageNum === 1) {
			$('.pageControl .btn_first').addClass('disable');
			$('.pageControl .btn_prev').addClass('disable');
		}
		if(this.props.pageInfo.pageNum === this.props.pageInfo.totalPage) {
			$('.pageControl .btn_last').addClass('disable');
			$('.pageControl .btn_next').addClass('disable');
		}
	}
	ChangeCurrentPage(e, changeCurrentPage, pageNum, pageInfo) {
		if(!$(e.target).hasClass('disable')) {
			if(pageNum >= 1 && pageNum <= pageInfo.totalPage) {
				changeCurrentPage(pageNum);
			}
		}
	}
	render() {
		let {columns, actions, pageInfo, others} = this.props;
		return (
			<tfoot>
				<tr>
					<td colSpan={columns.length} className="pagerBar">
						<ul className="pageControl">
							<ul>
								<li>Records: {pageInfo.entryStart} - {pageInfo.entryEnd} / {pageInfo.totalCount}</li>
								<li className="page_btn btn_first" onClick={e => {this.ChangeCurrentPage(e, actions.changeCurrentPage,1, pageInfo)}}></li>
								<li className="page_btn btn_prev" onClick={e => {this.ChangeCurrentPage(e, actions.changeCurrentPage,pageInfo.pageNum - 1, pageInfo)}}></li>
								<li className="pageInput">
									Page:&nbsp;&nbsp;
									<input type="text" className="currentPageInput" defaultValue={pageInfo.pageNum} value={pageInfo.pageNum}/>
									&nbsp;&nbsp;/&nbsp;&nbsp;{pageInfo.totalPage}
								</li>
								<li className="page_btn btn_next" onClick={e => {this.ChangeCurrentPage(e, actions.changeCurrentPage,pageInfo.pageNum + 1, pageInfo)}}></li>
								<li className="page_btn btn_last" onClick={e => {this.ChangeCurrentPage(e, actions.changeCurrentPage,pageInfo.totalPage, pageInfo)}}></li>
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
	componentDidMount() {
	}
	render() {
		let {status, actions, columns, records, pagination, others} = this.props;
		console.log(pagination);
		return (
			<table className="gridTable">
				<TableHead columns={columns} />
				<TableBody data={this.props} />
				<TableFoot columns={columns} pageInfo={pagination} actions={actions}/>
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
