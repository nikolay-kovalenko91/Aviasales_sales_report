import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Wrapper from './Wrapper';


function ReportTable(props) {
  let columns = [{
    Header: 'Date',
    accessor: 'time',
    minWidth: 120
  },{
    Header: 'Searches',
    accessor: 'searches',
    minWidth: 80
  },{
    Header: 'Clicks',
    accessor: 'clicks',
    minWidth: 65
  },{
    Header: 'Unq. Clicks',
    accessor: 'unique_clicks',
    minWidth: 100
  },{
    Header: 'CTR',
    accessor: 'ctr',
    minWidth: 50
  },{
    Header: 'Bookings',
    accessor: 'bookings',
    minWidth: 85
  },{
    Header: 'Sales',
    accessor: 'sales',
    minWidth: 55
  },{
    Header: 'BTR',
    accessor: 'btr',
    minWidth: 55
  },{
    Header: 'STR',
    accessor: 'str',
    minWidth: 55
  },{
    Header: 'Success %',
    accessor: 'success',
    minWidth: 94
  },{
    Header: 'Errors %',
    accessor: 'errors',
    minWidth: 77
  },{
    Header: 'Zeros %',
    accessor: 'zeros',
    minWidth: 76
  },{
    Header: 'T/O %',
    accessor: 'timeouts',
    minWidth: 70
  },{
    Header: 'Avg Resp',
    accessor: 'duration',
    minWidth: 80
  }];

  return (
    <Wrapper>
      <ReactTable
        data={props.data}
        showPagination={false}
        defaultPageSize="10"
        pageSize={props.data.length}
        columns={columns}
        style={{
          maxHeight: "410px" // This will force the table body to overflow and scroll, since there is not enough room
        }}
      />
    </Wrapper>
  );
}

ReportTable.propTypes = {
  data: PropTypes.array,
};

export default ReportTable;
