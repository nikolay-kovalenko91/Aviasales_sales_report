import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { makeSelectItemsPerPage } from './selectors';
import Toggle from 'components/Toggle';
import ReportTable from 'components/ReportTable'
import LoadingIndicator from 'components/LoadingIndicator';

import { changeItemsPerPage } from './actions';


export class ReportPaginator extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {data: [], message: '', isLoading: true}
  }

  componentDidMount() {
    this._executeQuery(process.env.API_URL + '/api/statistics?from=2017-10-27&to=2017-11-02&interval=1h');
  }

  _executeQuery(url) {
    this.setState({isLoading: true});
    fetch(url, {
      headers: {
        'Authorization': 'Bearer '+ process.env.API_AUTH_TOKEN,
      }
    })
      .then(response => response.json())
      .then(json => this.setState({data: json, isLoading: false}))
      .catch(error =>
        this.setState({
          message: error.toString()
        }));
  }

  render() {
    console.log(this.state.data);
    if (this.state.message) return <h2><FormattedMessage {...messages.error}/>{this.state.message}</h2>;
    if (this.state.isLoading) return <LoadingIndicator/>;

    return (
      <div>
          <ReportTable data={this.state.data.data}/>
      </div>
    );
    // return (
    //   <div>
    //       <h1>
    //           <FormattedMessage {...messages.header} />
    //       </h1>
    //       <Toggle value={this.props.itemsPerPage.toString()}
    //               values={['10','20']}
    //               onToggle={this.props.onItemsPerPageToggle}/>
    //       <h2>Items per page: {this.props.itemsPerPage}</h2>
    //       <button onClick={this.props.onPageNumberToggle}>press</button>
    //   </div>
    // );
  }
}

// Let's imagine we have left the page and then want to return to the page back.
// In this case, it is good idea to save current pagination params
ReportPaginator.propTypes = {
  itemsPerPage: PropTypes.number,
  onItemsPerPageToggle: PropTypes.func,
};

const mapStateToProps = createSelector(
    makeSelectItemsPerPage(),
    (itemsPerPage) => ({ itemsPerPage })
);

export function mapDispatchToProps(dispatch) {
    return {
        onItemsPerPageToggle: (evt) => dispatch(changeItemsPerPage(evt.target.value)),
        onPageNumberToggle: (evt) => {dispatch(push('/?page='+3))},
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPaginator);
