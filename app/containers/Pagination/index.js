import React, { PropTypes } from 'react';
import { range } from 'underscore'

import Toggle from 'components/Toggle';
import Input from './Input';
import ControlsContainer from './ControlsContainer';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


export default class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { pager: {}, pageSize: 10, validation: { isPageValid: true } };
    this.onItemsPerPageToggle = this.onItemsPerPageToggle.bind(this);
    this.onGotoPage = this.onGotoPage.bind(this);
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
      <ControlsContainer>
        <div>
          <Toggle
           values={['10','20', '50', '100']}
           onToggle={this.onItemsPerPageToggle} />
        </div>
        <div>
          <FormattedMessage
            {...messages.showingEntries}
            values={{
              startIndex: pager.startIndex + 1,
              endIndex: pager.endIndex + 1,
              totalItems: pager.totalItems
            }}
          />
        </div>
        <div style={{width: "auto"}} className="input-group">
          <span className="input-group-addon"><FormattedMessage {...messages.gotoPage} /></span>
          <Input
            type="text"
            placeholder={pager.currentPage}
            onBlur={this.onGotoPage}
            className={`form-control ${this.state.validation.isPageValid ? '' : 'is-invalid'}`}
          />
        </div>
        <div>
          <ul className="pagination">
            <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
            </li>
            {pager.pages.map((page, index) =>
              <li key={index} className={`page-item ${pager.currentPage === page ? 'active' : ''}`}>
                <a className="page-link" onClick={() => this.setPage(page)}>{page}</a>
              </li>
            )}
            <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
            </li>
          </ul>
        </div>
      </ControlsContainer>
    );
  }
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
};

Pagination.defaultProps = {
  initialPage: 1
};
