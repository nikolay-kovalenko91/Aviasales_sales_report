import React, { PropTypes } from 'react';

import Toggle from 'components/Toggle';
import Input from './Input';
import { FormattedMessage } from 'react-intl';
import Wrapper from './Wrapper';
import messages from './messages';


function Pagination(props) {
  let pager = props.pager;

  return (
    <Wrapper>
      <div>
        <Toggle
         values={['10','20', '50', '100']}
         onToggle={props.onItemsPerPageToggle} />
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
          onBlur={props.onGotoPage}
          className={`form-control ${props.validation.isPageValid ? '' : 'is-invalid'}`}
        />
      </div>
      <div>
        <ul className="pagination">
          <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => props.setPage(pager.currentPage - 1)}>Previous</a>
          </li>
          {pager.pages.map((page, index) =>
            <li key={index} className={`page-item ${pager.currentPage === page ? 'active' : ''}`}>
              <a className="page-link" onClick={() => props.setPage(page)}>{page}</a>
            </li>
          )}
          <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => props.setPage(pager.currentPage + 1)}>Next</a>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
}

Pagination.propTypes = {
  onGotoPage: PropTypes.func.isRequired,
  onItemsPerPageToggle: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  pager: PropTypes.object.isRequired,
};

export default Pagination;
