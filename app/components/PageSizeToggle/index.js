import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import Toggle from 'components/Toggle';
import messages from './messages';


function PageSizeToggle(props) {
  return (
    <div>
      <FormattedMessage {...messages.show} />
      <Toggle
       values={['10','20', '50', '100']}
       onToggle={props.onPageSizeToggle} />
      <FormattedMessage {...messages.entries} />
    </div>
  );
}

PageSizeToggle.propTypes = {
  onPageSizeToggle: PropTypes.func.isRequired
};

export default PageSizeToggle;
