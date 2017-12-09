import React, { PropTypes } from 'react';
import { range } from 'underscore'

import Pagination from 'components/Pagination';


export default class PaginationContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { pager: {}, pageSize: 10, validation: { isPageValid: true } };
    this.onItemsPerPageToggle = this.onItemsPerPageToggle.bind(this);
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
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page, pageSize) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // default page size is 10
    pageSize = pageSize || this.state.pageSize;

    // get new pager object for specified page
    pager = this.getPager(items.length, page, pageSize);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
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

  onItemsPerPageToggle(evt) {
    this.setPage(this.props.initialPage, evt.target.value);
    this.setState({pageSize: evt.target.value})
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
        onItemsPerPageToggle={this.onItemsPerPageToggle}
        setPage={this.setPage}
        validation={this.state.validation}
        pager={this.state.pager}/>
    );
  }
}

PaginationContainer.propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
};

PaginationContainer.defaultProps = {
  initialPage: 1
};
