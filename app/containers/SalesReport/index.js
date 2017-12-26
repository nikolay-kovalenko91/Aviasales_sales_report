import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { changeItemsPerPage } from './actions';

import Wrapper from './Wrapper';
import PageSizeToggle from 'components/PageSizeToggle';
import ReportTable from 'components/ReportTable'
import PaginationContainer from 'containers/PaginationContainer';
import ReportChart from 'components/ReportChart'
import LoadingIndicator from 'components/LoadingIndicator';

/**
 * NOTE: очень осторожно с PureComponent, не уверен в необходимости его применения здесь
 * у тебя один пропс и тот функция, state, ты сам по идее контролируешь.
 * Используя PureComponent не забывай, если внутренний компонент имеет свой контекст, 
 * то при его изменении он не отрендерится, потому что родитель с PureComponent не увидит изменений дочернего контекста
 * кроме этого, если у тебя никакие props/state не планируют изменяться, не надо нагружать лишними проверками
 * на изменения, это довольно затратные операции
 * оцени производительность через ?react_perf если с PureComponent и без него работает одинаково,
 * лучше его не используй, не оптимизируй то, что пока ещё не требует оптимизации
 */

export class SalesReport extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      data: [], 
      pageOfItems: [],
      message: '',
      isLoading: true
    }

    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this._executeQuery(process.env.API_URL + '/api/statistics?from=2017-10-27&to=2017-11-02&interval=1h');
  }

  /**
   * NOTE: как правило все асинхронные операции лучше проводить через миделвер
   * так их легче дебажить и контролировать, а redux-saga ещё и позволяет всякие ништяки применять 
   **/
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
    /**
     * при совпадении ключа со значением можно писать так
     */
    this.setState({ pageOfItems });
  }

  render() {
    /**
     * как правило, если props/state больше двух, объявлять их в начале рендера
     * это увеличивает читаемость кода и упрощает работу с переменными
     */
    const {changeItemsPerPage} = this.props;
    const {
      message, isLoading,
      pageOfItems,
      data: {data}
    } = this.state;
    if (message) return <h2><FormattedMessage {...messages.error}/>{message}</h2>;
    if (isLoading) return <LoadingIndicator/>;

    return (
      <Wrapper>
        <PageSizeToggle onPageSizeToggle={changeItemsPerPage} />
        <ReportTable pageData={pageOfItems} totalData={data} />
        <PaginationContainer items={data} onChangePage={this.onChangePage} />
        <ReportChart data={pageOfItems} />
      </Wrapper>
    );
  }
}

// Save current pagination params in order to use it in pagination component
SalesReport.propTypes = {
  changeItemsPerPage: PropTypes.func,
};

export function mapStateToProps() {
  return {}
}

export function mapDispatchToProps(dispatch) {
    return {
      changeItemsPerPage: (evt) => {dispatch(changeItemsPerPage(evt.target.value))},
      dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);
