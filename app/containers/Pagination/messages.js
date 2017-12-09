/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  showingEntries: {
    id: 'app.components.Pagination.showing_entries',
    defaultMessage: `
      Showing {startIndex} to {endIndex} of {totalItems} entries
    `,
  },
  gotoPage: {
    id: 'app.components.Pagination.showing_entries',
    defaultMessage: 'Goto page #:',
  },
});
