import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import HomePage from '../index';
import messages from '../messages';

describe('<SalesReport />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <SalesReport />
    );
    expect(renderedComponent.contains(
      <FormattedMessage {...messages.header} />
    )).toEqual(true);
  });
});
