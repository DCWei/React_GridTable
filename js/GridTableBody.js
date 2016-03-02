import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class GridTableBody extends React.Component {
	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.object),
		data: PropTypes.arrayOf(PropTypes.object),
		isTextOverflowEllipsis: PropTypes.bool,
		rowHeight: PropTypes.number,
		rowWidth: PropTypes.number,
		rowMinWidth: PropTypes.number,
		autoColumnWidth: PropTypes.number,
		columnMinWidth: PropTypes.number
	};
	static defaultProps = {
		isTextOverflowEllipsis: true,
		rowHeight: 30,
		rowWidth: 700,
		rowMinWidth: 700,
		columnMinWidth: 100
	};
	constructor(props) {
		super(props);
		this._updateRowWidth = ::this._updateRowWidth;
	}
	_updateRowWidth() {
		const tableBodyContent = ReactDOM.findDOMNode(this.refs.tableBodyContent);
		this.props.updateRowWidth(
			tableBodyContent.offsetWidth
		);
	}
	componentDidMount() {
		window.addEventListener('resize', this._updateRowWidth);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this._updateRowWidth);
	}
	componentDidUpdate() {
		this._updateRowWidth();
	}
	render() {
		const {
			columns,
			data,
			isTextOverflowEllipsis,
			rowHeight,
			rowWidth,
			rowMinWidth,
			autoColumnWidth,
			columnMinWidth, 
			maxHeight
		} = this.props
		return (
			<tbody ref="tableBodyContent">
				{data.map(function(row, i){
					return <Row key={i} 
								data={row} 
								columns={columns}
								rowWidth={rowWidth}
								rowMinWidth={rowMinWidth}
								autoColumnWidth={autoColumnWidth}
								rowHeight={rowHeight}
								isTextOverflowEllipsis={isTextOverflowEllipsis} 
								columnMinWidth={columnMinWidth}/>
				})}
			</tbody>
		);
	}
}

class Row extends React.Component {
	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.object),
		data: PropTypes.object,
		rowWidth: PropTypes.number,
		rowMinWidth: PropTypes.number,
		autoColumnWidth: PropTypes.number,
		rowHeight: PropTypes.number,
		isTextOverflowEllipsis: PropTypes.bool,
		columnMinWidth: PropTypes.number
	};
	constructor(props) {
		super(props);
	}
	render() {
		const {
			columns,
			data,
			rowWidth,
			rowMinWidth,
			autoColumnWidth,
			rowHeight,
			isTextOverflowEllipsis,
			columnMinWidth
		} = this.props;
		return (
			<tr style={{minWidth: rowMinWidth, maxWidth: rowWidth}}>
				{
					columns.map(
						function(col){
							let width = autoColumnWidth;
							if(col.width)
								width = col.width;
							if(width < columnMinWidth)
								width = columnMinWidth;
							return <Cell key={col.key} 
										 data={data[col.key]} 
										 column={col} 
										 width={width} 
										 columnMinWidth={columnMinWidth}
										 rowHeight={rowHeight}
										 isTextOverflowEllipsis={isTextOverflowEllipsis} />;
						}
					)
				}
			</tr>
		);
	}
}

class Cell extends React.Component {
	render() {
		const {
			data,
			column,
			width,
			rowHeight,
			isTextOverflowEllipsis,
			columnMinWidth
		} = this.props;
		return (
			<td style={{width: width, minWidth: columnMinWidth, height: rowHeight}}>{this.props.data}</td>
		);
	}
}
