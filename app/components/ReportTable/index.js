import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { reduce, map } from 'underscore'

import Wrapper from './Wrapper';
import SpanTotal from './SpanTotal';


function calcutateTotal(key, source) {
  let valuesList = map(source, (obj) => obj[key]);
  let total = reduce(valuesList, (memo, num) => memo + parseFloat(num), 0);
  // Rounds total
  return Math.ceil((total)*100)/100;
}

function ReportTable(props) {
  let columns = [{
    Header: 'Date',
    accessor: 'time',
    minWidth: 120,
    Footer: (
      <div>
          <SpanTotal>TOTAL ON PAGE</SpanTotal>
          <SpanTotal>TOTAL</SpanTotal>
      </div>
    )
  },{
    Header: 'Searches',
    accessor: 'searches',
    minWidth: 80,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('searches', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('searches', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'Clicks',
    accessor: 'clicks',
    minWidth: 65,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('clicks', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('clicks', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'Unq. Clicks',
    accessor: 'unique_clicks',
    minWidth: 100,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('unique_clicks', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('unique_clicks', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'CTR',
    accessor: 'ctr',
    minWidth: 50,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('ctr', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('ctr', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'Bookings',
    accessor: 'bookings',
    minWidth: 85,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('bookings', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('bookings', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'Sales',
    accessor: 'sales',
    minWidth: 55,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('sales', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('sales', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'BTR',
    accessor: 'btr',
    minWidth: 55,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('btr', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('btr', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'STR',
    accessor: 'str',
    minWidth: 55,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('str', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('str', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'Success %',
    accessor: 'success',
    minWidth: 94,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('success', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('success', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'Errors %',
    accessor: 'errors',
    minWidth: 77,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('errors', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('errors', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'Zeros %',
    accessor: 'zeros',
    minWidth: 76,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('zeros', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('zeros', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'T/O %',
    accessor: 'timeouts',
    minWidth: 70,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('timeouts', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('timeouts', props.totalData)}</SpanTotal>
      </div>
    )
  },{
    Header: 'Avg Resp',
    accessor: 'duration',
    minWidth: 80,
    Footer: (
      <div>
        <SpanTotal>{calcutateTotal('duration', props.pageData)}</SpanTotal>
        <SpanTotal>{calcutateTotal('duration', props.totalData)}</SpanTotal>
      </div>
    )
  }];

  return (
    <Wrapper>
      <ReactTable
        data={props.pageData}
        showPagination={false}
        defaultPageSize={10}
        pageSize={props.pageData.length}
        columns={columns}
        style={{
          maxHeight: "495px" // This will force the table body to overflow and scroll, since there is not enough room
        }}
      />
    </Wrapper>
  );
}

ReportTable.propTypes = {
  pageData: PropTypes.array.isRequired,
  totalData: PropTypes.array.isRequired,
};

export default ReportTable;
