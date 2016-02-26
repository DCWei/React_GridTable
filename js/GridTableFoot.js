import React from 'react';

export default class GridTableFoot extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	}
	ChangeCurrentPage(e, pageNum, props) {
		if(!$(e.target).hasClass('disable')) {
			if(pageNum >= 1 && pageNum <= props.pagination.totalPage) {
				props.actions.changeCurrentPage(pageNum);
			}
		}
	}
	UpdateBtnStatus() {
		let $btn_first = $('.pageControl .btn_first');
		let $btn_prev = $('.pageControl .btn_prev');
		let $btn_next = $('.pageControl .btn_next');
		let $btn_last = $('.pageControl .btn_last');
		if(this.props.pagination.pageNum === 1) {
			$btn_first.addClass('disable');
			$btn_prev.addClass('disable');
		}
		else{
			$btn_first.removeClass('disable');
			$btn_prev.removeClass('disable');
		}

		if(this.props.pagination.pageNum === this.props.pagination.totalPage) {
			$btn_last.addClass('disable');
			$btn_next.addClass('disable');
		}
		else {
			$btn_last.removeClass('disable');
			$btn_next.removeClass('disable');
		}
	}
	UpdatePageSizeSetting(e, actions) {
		let newPageSize = e.target.value;
		actions.changePageSizeSetting(newPageSize);
	}
	render() {
		console.log("render >>>");
		let {columns, actions, pagination} = this.props;
		this.UpdateBtnStatus();
		console.log("render <<<");
		return (
			<tfoot>
				<tr>
					<td colSpan={columns.length} className="pagerBar">
						<ul className="pageControl">
							<ul>
								<li>Records: {pagination.entryStart} - {pagination.entryEnd} / {pagination.totalCount}</li>
								<li className="page_btn btn_first" onClick={e => {this.ChangeCurrentPage(e, 1, this.props)}}></li>
								<li className="page_btn btn_prev" onClick={e => {this.ChangeCurrentPage(e, pagination.pageNum - 1, this.props)}}></li>
								<li className="pageInput">
									Page:&nbsp;&nbsp;
									<input type="text" className="currentPageInput" defaultValue={pagination.pageNum} value={pagination.pageNum}/>
									&nbsp;&nbsp;/&nbsp;&nbsp;{pagination.totalPage}
								</li>
								<li className="page_btn btn_next" onClick={e => {this.ChangeCurrentPage(e, pagination.pageNum + 1, this.props)}}></li>
								<li className="page_btn btn_last" onClick={e => {this.ChangeCurrentPage(e, pagination.totalPage, this.props)}}></li>
								<li className="pageSizeList">
									<select defaultValue={pagination.pageSize} onChange={e => {this.UpdatePageSizeSetting(e, actions)}}>
										{pagination.pageSizeList.map(value => {
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
