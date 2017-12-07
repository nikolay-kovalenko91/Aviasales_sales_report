import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { makeSelectItemsPerPage } from './selectors';
import Toggle from 'components/Toggle';
import { changeItemsPerPage } from './actions';


export class ReportPaginator extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {data: [], message: ''}
  }

  componentDidMount() {
    this._executeQuery(process.env.API_URL + '/api/statistics?from=2017-10-27&to=2017-11-02&interval=1h');
  }

  _executeQuery(url) {
    fetch(url, {
      headers: {
        'Authorization': 'Bearer '+ process.env.API_AUTH_TOKEN,
      }
    })
      .then(response => response.json())
      .then(json => this.setState({data: json}))
      .catch(error =>
        this.setState({
          message: error.toString()
        }));
  }

  render() {
    console.log(this.state.data);
    if (this.state.message) return <h2><FormattedMessage {...messages.error}/>{this.state.message}</h2>;
    return (
      <div>
          <h1>
              <FormattedMessage {...messages.header} />
          </h1>
          <Toggle value={this.props.itemsPerPage.toString()}
                  values={['10','20']}
                  onToggle={this.props.onItemsPerPageToggle}/>
          <h2>Items per page: {this.props.itemsPerPage}</h2>
          <button onClick={this.props.onPageNumberToggle}>press</button>
      </div>
    );
  }
}

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
