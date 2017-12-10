import React, { PropTypes } from 'react';

import Input from './Input';
import { FormattedMessage } from 'react-intl';
import Wrapper from './Wrapper';
import InputWrapper from './InputWrapper';
import PageListWrapper from './PageListWrapper';
import messages from './messages';


function Pagination(props) {
  let pager = props.pager;

  return (
    <Wrapper>
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
      <InputWrapper className="input-group">
        <span className="input-group-addon"><FormattedMessage {...messages.gotoPage} /></span>
        <Input
          type="text"
          placeholder={pager.currentPage}
          onBlur={props.onGotoPage}
          className={`form-control ${props.validation.isPageValid ? '' : 'is-invalid'}`}
        />
      </InputWrapper>
      <PageListWrapper>
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
      </PageListWrapper>
    </Wrapper>
  );
}

Pagination.propTypes = {
  onGotoPage: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  pager: PropTypes.object.isRequired,
};

export default Pagination;
