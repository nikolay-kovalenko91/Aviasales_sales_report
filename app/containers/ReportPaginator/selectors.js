/**
 * The pagination state selectors
 */

import { createSelector } from 'reselect';

const selectReportPagination = (state) => state.get('reportPagination');

const makeSelectItemsPerPage = () => createSelector(
  selectReportPagination,
  (reportPaginationState) => reportPaginationState.get('itemsPerPage')
);

export {
  selectReportPagination,
  makeSelectItemsPerPage,
};
