/*
 *
 * Pagination reducer
 *
 */

import { fromJS } from 'immutable';

import {
  CHANGE_ITEMS_PER_PAGE,
} from './constants';
import {
  PAGINATION_ITEMS_PER_PAGE,
} from '../App/constants'; // eslint-disable-line

const initialState = fromJS({
  itemsPerPage: PAGINATION_ITEMS_PER_PAGE,
});

function reportPaginationReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ITEMS_PER_PAGE:
      return state
          .set('itemsPerPage', action.count);
    default:
      return state;
  }
}

export default reportPaginationReducer;
