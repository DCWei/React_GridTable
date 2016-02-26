import React from 'react';

export default class GridTableBody extends React.Component {
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

class Cell extends React.Component {
	render() {
		return (
			<td>{this.props.data}</td>
		);
	}
}
