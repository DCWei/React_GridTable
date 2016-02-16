import * as React from 'react';
import '../css/GridTable.css';

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
	render() {
		console.log(this.props.colnum);
		return (
			<tfoot>
				<tr>
					<td colSpan={this.props.colnum}>
						<div className="pageControl">
							<div>Records: 1 - 6 / 6</div>
							<div></div>
						</div>
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
			<th>{this.props.data.label}</th>
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

export class GridTable extends React.Component {
	render() {
		return (
			<table className="gridTable">
				<TableHead columns={this.props.data.columns} />
				<TableBody data={this.props.data} />
				<TableFoot colnum={this.props.data.columns.length}/>
			</table>
		); 
	}
}
