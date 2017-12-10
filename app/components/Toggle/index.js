/**
*
* LocaleToggle
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import Select from './Select';
import ToggleOption from '../ToggleOption';
import Wrapper from './Wrapper';

function Toggle(props) {
  let content = (<option>--</option>);

  // If we have items, render them
  if (props.values) {
    content = props.values.map((value) => (
      <ToggleOption key={value} value={value}
                    message={(typeof(props.messages) !== 'undefined') ? props.messages[value] : null}
      />
    ));
  }

  return (
    <Wrapper>
      <Select defaultValue={props.value} onChange={props.onToggle}>
        {content}
      </Select>
    </Wrapper>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
