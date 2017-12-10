import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Wrapper from './Wrapper';
import PageSizeToggle from 'components/PageSizeToggle';
import ReportTable from 'components/ReportTable'
import PaginationContainer from 'containers/PaginationContainer';
import ReportChart from 'components/ReportChart'
import LoadingIndicator from 'components/LoadingIndicator';

import { changeItemsPerPage } from './actions';


export class SalesReport extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {data: [], pageOfItems: [], message: '', isLoading: true}
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this._executeQuery(process.env.API_URL + '/api/statistics?from=2017-10-27&to=2017-11-02&interval=1h');
  }

  _executeQuery(url) {
    this.setState({isLoading: true});
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + process.env.API_AUTH_TOKEN,
      }
    })
      .then(response => response.json())
      .then(json => this.setState({data: json, isLoading: false}))
      .catch(error =>
        this.setState({
          message: error.toString()
        }));
  }

  onChangePage(pageOfItems, currentPage) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
    this.props.onPageNumberToggle(currentPage);
  }

  render() {
    if (this.state.message) return <h2><FormattedMessage {...messages.error}/>{this.state.message}</h2>;
    if (this.state.isLoading) return <LoadingIndicator/>;
    return (
      <Wrapper>
        <PageSizeToggle onPageSizeToggle={this.props.changeItemsPerPage} />
        <ReportTable pageData={this.state.pageOfItems} totalData={this.state.data.data} />
        <PaginationContainer items={this.state.data.data} onChangePage={this.onChangePage} />
        <ReportChart data={this.state.pageOfItems} />
      </Wrapper>
    );
  }
}

// Let's imagine we have left the page and then want to return to the page back.
// In this case, it is good idea to save current pagination params
SalesReport.propTypes = {
  changeItemsPerPage: PropTypes.func,
  onPageNumberToggle: PropTypes.func,
};

export function mapStateToProps() {
  return {}
}


export function mapDispatchToProps(dispatch) {
    return {
      changeItemsPerPage: (evt) => {dispatch(changeItemsPerPage(evt.target.value))},
      onPageNumberToggle: (currentPage) => {dispatch(push('/?page=' + currentPage))},
      dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);
