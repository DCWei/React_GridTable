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
	componentDidMount() {
		
	}
	changeBtnStyle(e) {
		var $target = $(e.target);

		if(!$target.hasClass('disable'))
		{
			switch(e.type)
			{
				case "mouseover":
					break;
				case "mousedown":
					break;
				case "mouseup":
					break;
				case "click":
					break;
				default:
					break;
			}
		}
	}
	render() {
		console.log(this.props.colnum);
		return (
			<tfoot>
				<tr>
					<td colSpan={this.props.colnum} className="pagerBar">
						<ul className="pageControl">
							<ul>
								<li>Records: 1 - 6 / 6</li>
								<li className="page_btn btn_first"  onMouseOver={this.changeBtnStyle} onMouseLeave={this.changeBtnStyle} onClick={this.changeBtnStyle} onMouseDown={this.changeBtnStyle} onMouseUp={this.changeBtnStyle}></li>
								<li className="page_btn btn_prev"></li>
								<li className="pageInput">
									Page:&nbsp;&nbsp;
									<input type="text" className="currentPageInput" defaultValue="1"/>
									&nbsp;&nbsp;/&nbsp;&nbsp;0
								</li>
								<li className="page_btn btn_next"></li>
								<li className="page_btn btn_last"></li>
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
