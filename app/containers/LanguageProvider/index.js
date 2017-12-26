/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';
/**
 * я бы не рекомендовал использвать здесь PureComponent,
 * ты передаешь children в props, имей в виду, что Pure компонент будет его проверять на наличие изменений
 * затратная операция, оцени в ?react_perf
 * старайся родительским компонентам не давать PureComponent, это прям очень рискованый ход,
 * родительский PureComponent может непредсказуемо себя вести, особенно с react-router
 * будь осторожен
 */
export class LanguageProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    /**
     * старайся объявлять переменные выше
     */
    const {
      locale, messages,
      children
    } = this.props;
    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={messages[locale]}>
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

// я бы не рекомендовал использовать createSelector здесь, лучше всё хранить в selectors.js
const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
