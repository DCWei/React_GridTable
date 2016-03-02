import React, {PropTypes} from 'react';
import classNames from 'classnames';

class TableHeadItem extends React.Component {
	static propTypes = {
		rowHeight: PropTypes.number,
		columnMinWidth: PropTypes.number,
		isTextOverflowEllipsis: PropTypes.bool,
		width: PropTypes.number,
		onSortChange: PropTypes.func,
		sortInfo: PropTypes.object,
		column: PropTypes.object
	};
	static defaultProps = {
		rowHeight: 30,
		columnMinWidth: 100,
		isTextOverflowEllipsis: true,
		width: 200,
		column: {}
	}
	constructor(props) {
		super(props);
		this._handleOnSortChange = ::this._handleOnSortChange;
	}
	_handleOnSortChange(e) {
		console.log('click on ', this.props.column.key);
		const {
			sortInfo,
			column,
			onSortChange
		} = this.props;
		onSortChange({
			key: column.key,
			direction: sortInfo.key === column.key ? (sortInfo.direction === 'desc' ? 'asc':'desc') : 'desc'
		});
	}
	render() {
		console.log('GridTableHeadItem.render(): this.porps= ', this.props);
		const {
			width,
			columnMinWidth,
			rowHeight,
			column,
			sortInfo,
			isTextOverflowEllipsis
		} = this.props;
		return (
			<th style={{width: width, minWidth: columnMinWidth, height: rowHeight}} 
				className={classNames({
								'sortable': column.sortable,
								'sort-desc': sortInfo.key === column.key && sortInfo.direction === 'desc',
								'sort-asc': sortInfo.key === column.key && sortInfo.direction === 'asc'
							})}
				onClick={this._handleOnSortChange}>
				<div title={isTextOverflowEllipsis ? column.label: undefined}
					 style={{width: width, height: rowHeight}}>
					 <div className={classNames('sort-indicator')}>
					 	{column.label}
					 </div>
				</div>
			</th>
		);
	}
}

export default class GridTableHead extends React.Component {
	static propTypes = {
		rowHeight: PropTypes.number,
		columns: PropTypes.arrayOf(PropTypes.object),
		onSortChange: PropTypes.func,
		rowWidth: PropTypes.number,
		rowMinWidth: PropTypes.number,
		sortInfo: PropTypes.object,
		isTextOverflowEllipsis: PropTypes.bool
	};
	static defaultProps = {
		rowHeight: 30,
		columns: [],
		rowMinWidth: 600,
		rowWidth: 600,
		isTextOverflowEllipsis: true
	}
	constructor(props) {
		super(props);
		this.state = {
			sort_key: 'id',
			directions: 'desc'
		}
	}
	componentWillReceiveProps(newProps) {
	}
	render() {
		console.log('GridTableHeader.render(): this.props= ', this.props);
		const {
			autoColumnWidth,
			isTextOverflowEllipsis,
			onSortChange,
			rowHeight,
			rowMinWidth,
			rowWidth,
			sortInfo,
			columns,
			columnMinWidth
		} = this.props
		return (
			<thead>
				<tr style={{minWidth: this.props.rowMinWidth, maxWidth: this.props.rowWidth}}>
					{columns.map(function(col) {
						let width = autoColumnWidth;
						if(col.width) {
							width = col.width
						}
						return <TableHeadItem key={col.key}
											  column={col} 
											  rowHeight={rowHeight} 
											  width={width} 
											  columnMinWidth={columnMinWidth}
											  sortInfo={sortInfo}
											  isTextOverflowEllipsis={isTextOverflowEllipsis}
											  onSortChange={onSortChange}
								/>;
					})}
				</tr>
			</thead>
		);
	}
}
