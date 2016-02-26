import React, {PropTypes} from 'react';

class TableHeadItem extends React.Component {
	static propTypes = {
		rowHeight: PropTypes.number,
		isTextOverflowEllipsis: PropTypes.bool,
		width: PropTypes.number,
		onSortChange: PropTypes.func,
		sortable: PropTypes.bool
	};
	static defaultProps = {
		rowHeight: 30,
		isTextOverflowEllipsis: true,
		width: 200,
		sortable: false
	}
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<th>{this.props.data.label}</th>
		);
	}
}

export default class GridTableHead extends React.Component {
	static propTypes = {
		rowHeight: PropTypes.number,
		columns: PropTypes.arrayOf(PropTypes.object),
		onSortChange: PropTypes.func,
		rowWidth: PropTypes.number,
		sortInfo: PropTypes.object,
		isTextOverflowEllipsis: PropTypes.bool
	};
	static defaultProps = {
		rowHeight: 30,
		columns: [],
		rowWidth: 200,
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
		return (
			<thead>
				<tr>
					{this.props.columns.map(function(col) {
						return <TableHeadItem key={col.key} data={col} />;
					})}
				</tr>
			</thead>
		);
	}
}
