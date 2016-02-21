import * as React from 'react';
import '../css/GridTable.css';
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import * as actions from './GridTableActions';
import Immutable from 'immutable';

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
		this.ChangeCurrentPageCallback = ::this.ChangeCurrentPageCallback;
	}
	componentDidMount() {
		
	}
	ChangeCurrentPageCallback(NewPageNum) {
		console.log(NewPageNum);
		//this.props.actions.changeCurrentPage(NewPageNum);
	}
	render() {
		return (
			<tfoot>
				<tr>
					<td colSpan={this.props.columns.length} className="pagerBar">
						<ul className="pageControl">
							<ul>
								<li>Records: 1 - 6 / 6</li>
								<li className="page_btn btn_first"></li>
								<li className="page_btn btn_prev" onClick={this.ChangeCurrentPageCallback(this.props.pageInfo.pageNum - 1)}></li>
								<li className="pageInput">
									Page:&nbsp;&nbsp;
									<input type="text" className="currentPageInput" defaultValue="1" value={this.props.pageInfo.pageNum}/>
									&nbsp;&nbsp;/&nbsp;&nbsp;
								</li>
								<li className="page_btn btn_next" onClick={this.ChangeCurrentPageCallback(this.props.pageInfo.pageNum + 1)}></li>
								<li className="page_btn btn_last" ></li>
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
	render() {
		return (
			<table className="gridTable">
				<TableHead columns={this.props.columns} />
				<TableBody data={this.props} />
				<TableFoot columns={this.props.columns} pageInfo={this.props.pagination} actions={this.props.actions}/>
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
