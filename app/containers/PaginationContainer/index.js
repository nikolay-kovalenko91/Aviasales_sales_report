import React, { PropTypes } from 'react';
import { range } from 'underscore'
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { makeSelectItemsPerPage } from './selectors';

import Pagination from 'components/Pagination';


export class PaginationContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { pager: {}, validation: { isPageValid: true } };
    this.onGotoPage = this.onGotoPage.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items || this.props.itemsPerPage !== prevProps.itemsPerPage) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // default page size is 10
    var pageSize = this.props.itemsPerPage;
    console.log(this.props.itemsPerPage)

    // get new pager object for specified page
    pager = this.getPager(items.length, page, pageSize);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems, pager.currentPage);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  onGotoPage(evt) {
    var page = parseInt(evt.target.value);

    if (page <= this.state.pager.totalPages && page >= 1) {
      this.setState({ validation: { isPageValid: true } });
      this.setPage(page);
    } else {
      this.setState({ validation: { isPageValid: false } });
    }
  };

  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <Pagination
        onGotoPage={this.onGotoPage}
        setPage={this.setPage}
        validation={this.state.validation}
        pager={this.state.pager}/>
    );
  }
}

PaginationContainer.propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
  initialPage: PropTypes.number
};

PaginationContainer.defaultProps = {
  initialPage: 1,
  itemsPerPage: 10
};

const mapStateToProps = createSelector(
  makeSelectItemsPerPage(),
  (itemsPerPage) => ({ itemsPerPage })
);

export default connect(mapStateToProps)(PaginationContainer);
