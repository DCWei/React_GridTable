import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import '../css/GridTable.css';
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import * as actions from './GridTableActions';
import Immutable from 'immutable';
import GridTableHeader from './GridTableHeader';
import GridTableFoot from './GridTableFoot';
import GridTableBody from './GridTableBody';

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

class GridTable extends React.Component {
	static propTypes = {
		columnMinWidth: PropTypes.number,
		columns: PropTypes.arrayOf(PropTypes.object),
		data: PropTypes.arrayOf(PropTypes.object),
		totalCount: PropTypes.number,
		page: PropTypes.number,
		pageSize: PropTypes.number,
		sortInfo: PropTypes.object,
		isTextOverflowEllipsis: PropTypes.bool,
		onSortChange: PropTypes.func,
		onPageChange: PropTypes.func
	}
	static defaultProps = {
		columnMinWidth: 100,
		columns: [],
		data: [],
		totalCount: 0,
		page: 1,
		pageSize: 20,
		sortInfo: {},
		isTextOverflowEllipsis: true
	}
	constructor(props) {
		super(props);
		this.state = {
			rowHeight: 30,
			autoColumnWidth:100
		};
		this.updateRowWidth = ::this.updateRowWidth;
		this.updateMinRowWidth = ::this.updateMinRowWidth;
	}
	componentWillMount() {
	}
	componentWillReceiveProps(newProps) {
		this.updateMinRowWidth();
	}
	updateRowWidth(rowWidth) {
		const dom = ReactDOM.findDOMNode(this);
		const {
			maxHeight,
			columnMinWidth,
			columns
		} = this.props;

		const {minRowWidth} = this.state;
		let offset = 0;

		rowWidth = dom.offsetWidth;
		console.log('GridTable.updateRowWidth: rowWidth= ', rowWidth);
		if(rowWidth && this.state.rowWidth !== rowWidth) {
			let autoColumnWidth = rowWidth;

			let numOfAutoWithField = columns.length;

			columns.forEach(column => {
				if(column.width) {
					numOfAutoWithField--;
					autoColumnWidth = autoColumnWidth - column.width;
				}
			});

			if(numOfAutoWithField) {
				autoColumnWidth = autoColumnWidth / numOfAutoWithField;
				if(autoColumnWidth < columnMinWidth) {
					autoColumnWidth = columnMinWidth;
				}
			}

			this.setState({
				rowWidth,
				autoColumnWidth
			});
		}
	}
	updateMinRowWidth() {
		let minRowWidth = 0;
		this.props.columns.forEach(column => {
			minRowWidth += column.width || this.props.columnMinWidth;
		});
		console.log('GridTable.updateMinRowWidth: minRowWidth= ', minRowWidth);
		this.setState({
			rowMinWidth: minRowWidth
		});
	}
	render() {
		console.log('GridTable.render(): this.props: ', this.props);
		console.log('GridTable.render(): this.state: ', this.state);
		let {
			columnMinWidth,
			columns,
			data,
			page,
			pageSize,
			totalCount,
			pageSizeList,
			sortInfo,
			isTextOverflowEllipsis,
			onSortChange,
			onPageChange
		} = this.props;

		return (
			<div className="gridTable">
				<table>
					<GridTableHeader
						onSortChange={onSortChange}
						rowHeight={this.state.rowHeight}
						columns={columns}
						rowWidth={this.state.rowWidth}
						rowMinWidth={this.state.rowMinWidth}
						sortInfo={sortInfo}
						isTextOverflowEllipsis={isTextOverflowEllipsis} 
						autoColumnWidth={this.state.autoColumnWidth}
						columnMinWidth={columnMinWidth} />
					<GridTableBody data={data} 
								   columns={columns}
								   rowHeight={this.state.rowHeight}
								   rowWidth={this.state.rowWidth}
								   rowMinWidth={this.state.rowMinWidth}
								   autoColumnWidth={this.state.autoColumnWidth}
								   isTextOverflowEllipsis={isTextOverflowEllipsis}
								   columnMinWidth={columnMinWidth}
								   updateRowWidth={this.updateRowWidth} />
					<GridTableFoot onPageChange={onPageChange}
								   page={page}
								   pageSize={pageSize}
								   totalCount={totalCount}
								   pageSizeList={pageSizeList}
								   columns={columns} />
				</table>
			</div>
		); 
	}
}

export default GridTable;
