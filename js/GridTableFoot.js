import React from 'react';

export default class GridTableFoot extends React.Component {
	constructor(props) {
		super(props);
		this.UpdateBtnStatus = ::this.UpdateBtnStatus;
		this.UpdatePageSizeSetting= ::this.UpdatePageSizeSetting;
		this._handlePageInputChange= ::this._handlePageInputChange;
		this._handlePageInputKeyPress = ::this._handlePageInputKeyPress;
		this.changeToNextPage = ::this.changeToNextPage;
		this.changeToPrevPage = ::this.changeToPrevPage;
		this.changeToFirstPage = ::this.changeToFirstPage;
		this.changeToLastPage = ::this.changeToLastPage

		this.state={
			totalPage: 0,
			entryStart: 1,
			entryEnd: 1
		};
	}
	componentDidMount() {
	}
	componentWillReceiveProps(newProps) {
		console.log('GridTableFoot.componentWillReceiveProps: newProps=',newProps);
		let newPageInfo = {
			totalPage: parseInt(newProps.totalCount/newProps.pageSize),
			entryStart: (newProps.page-1)*newProps.pageSize + 1,
			entryEnd: newProps.page*newProps.pageSize,
			pageInput: newProps.page
		};
		this.setState(newPageInfo);
		this.UpdateBtnStatus(newProps);
	}
	changeToNextPage(e) {
		if(!$(e.target).hasClass('disable')) {
			const newPage = this.props.page + 1;
			if(newPage >= 1 && newPage <= this.state.totalPage) {
				let newPageInfo = {
					pageNum: newPage,
					pageSize: this.props.pageSize
				}
				this.setState({pageInput: newPage});
				this.props.onPageChange(newPageInfo);
			}
		}
	}
	changeToPrevPage(e) {
		if(!$(e.target).hasClass('disable')) {
			const newPage = this.props.page - 1;
			if(newPage >= 1 && newPage <= this.state.totalPage) {
				let newPageInfo = {
					pageNum: newPage,
					pageSize: this.props.pageSize
				}
				this.setState({pageInput: newPage});
				this.props.onPageChange(newPageInfo);
			}
		}
	}
	changeToFirstPage(e) {
		if(!$(e.target).hasClass('disable')) {
			const newPage = 1;
			if(newPage >= 1 && newPage <= this.state.totalPage) {
				let newPageInfo = {
					pageNum: newPage,
					pageSize: this.props.pageSize
				}
				this.setState({pageInput: newPage});
				this.props.onPageChange(newPageInfo);
			}
		}
	}
	changeToLastPage(e) {
		if(!$(e.target).hasClass('disable')) {
			const newPage = this.state.totalPage;
			if(newPage >= 1 && newPage <= this.state.totalPage) {
				let newPageInfo = {
					pageNum: newPage,
					pageSize: this.props.pageSize
				}
				this.setState({pageInput: newPage});
				this.props.onPageChange(newPageInfo);
			}
		}
	}
	UpdateBtnStatus(newPageInfo) {
		let $btn_first = $('.pageControl .btn_first');
		let $btn_prev = $('.pageControl .btn_prev');
		let $btn_next = $('.pageControl .btn_next');
		let $btn_last = $('.pageControl .btn_last');
		if(newPageInfo.page === 1) {
			$btn_first.addClass('disable');
			$btn_prev.addClass('disable');
		}
		else{
			$btn_first.removeClass('disable');
			$btn_prev.removeClass('disable');
		}

		if(newPageInfo.page === this.state.totalPage) {
			$btn_last.addClass('disable');
			$btn_next.addClass('disable');
		}
		else {
			$btn_last.removeClass('disable');
			$btn_next.removeClass('disable');
		}
	}
	UpdatePageSizeSetting(e) {
		let newPageInfo = {
			pageNum: this.props.page,
			pageSize: e.target.value
		}
		this.props.onPageChange(newPageInfo);
	}
	_handlePageInputKeyPress(e) {
		if(ev.key === 'Enter') {
			let page = ev.target.value;
			if(page <= this.state.totalPage) {
				let newPageInfo = {
					pageNum: page,
					pageSize: this.props.pageSize
				};
				this.setState({pageInput: newPage});
				this.props.onPageChange(newPageInfo);
			}
		}
	}
	_handlePageInputChange(e) {
		console.log('GridTableFoot: GridTableFoot() >>>');
		this.setState({pageInput: e.target.value});
		console.log('GridTableFoot: GridTableFoot() <<<');
	}
	render() {
		console.log("render >>>");
		const {
			page,
			pageSize,
			totalCount,
			pageSizeList,
			onPageChange,
			columns
		} = this.props;

		console.log("render <<<");
		return (
			<tfoot>
				<tr>
					<td colSpan={columns.length} className="pagerBar">
						<ul className="pageControl">
							<ul>
								<li>Records: {this.state.entryStart} - {this.state.entryEnd} / {totalCount}</li>
								<li className="page_btn btn_first" onClick={this.changeToFirstPage}></li>
								<li className="page_btn btn_prev" onClick={this.changeToPrevPage}></li>
								<li className="pageInput">
									Page:&nbsp;&nbsp;
									<input type="text" 
										   className="currentPageInput" 
										   min={1} 
										   max={this.state.totalPage} 
										   value={this.state.pageInput || page}
										   onChange={this._handlePageInputChange}
										   onKeyPress={this._handlePageInputKeyPress} />
									&nbsp;&nbsp;/&nbsp;&nbsp;{this.state.totalPage}
								</li>
								<li className="page_btn btn_next" onClick={this.changeToNextPage}></li>
								<li className="page_btn btn_last" onClick={this.changeToLastPage}></li>
								<li className="pageSizeList">
									<select defaultValue={pageSize} onChange={this.UpdatePageSizeSetting}>
										{pageSizeList.map(value => {
											return <option key={value} value={value}>{value}</option>;
										})}
									</select>
									&nbsp;&nbsp;per page
								</li>
							</ul>
						</ul>
					</td>
				</tr>
			</tfoot>
		);
	}
}
