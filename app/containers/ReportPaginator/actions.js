/*
 *
 * Pagination actions
 *
 */

import {
  CHANGE_ITEMS_PER_PAGE,
} from './constants';

export function changeItemsPerPage(itemsCount) {
  return {
    type: CHANGE_ITEMS_PER_PAGE,
    count: parseInt(itemsCount),
  };
}
