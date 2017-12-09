import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table-2';
import 'react-bootstrap-table-2/dist/react-bootstrap-table.min.css';

import Wrapper from './Wrapper';


function onRowSelect(row, isSelected, e, rowIndex) {
  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': "' + row[prop] + '"';
  }
  console.log(e);
  alert(`Selected: ${isSelected}, rowIndex: ${rowIndex}, content: ${rowStr}`);
}

const selectRowProp = {
  mode: 'radio',
  clickToSelect: true,
  onSelect: onRowSelect,
  hideSelectColumn: true
};

export default class ReportTable extends React.Component {
  render() {
    return (
      <Wrapper>
        <BootstrapTable data={ this.props.data } selectRow={ selectRowProp } version='4'>
            <TableHeaderColumn dataField='time' isKey={ true } dataSort={ true } width='11%'>Date</TableHeaderColumn>
            <TableHeaderColumn dataField='searches' dataSort={ true } width='7%'>Searches</TableHeaderColumn>
            <TableHeaderColumn dataField='clicks' dataSort={ true } width='5.5%'>Clicks</TableHeaderColumn>
            <TableHeaderColumn dataField='unique_clicks' dataSort={ true } width='8%'>Unq. Clicks</TableHeaderColumn>
            <TableHeaderColumn dataField='ctr' dataSort={ true } width='5%'>CTR</TableHeaderColumn>
            <TableHeaderColumn dataField='bookings' dataSort={ true } width='7%'>Bookings</TableHeaderColumn>
            <TableHeaderColumn dataField='sales' dataSort={ true } width='6%'>Sales</TableHeaderColumn>
            <TableHeaderColumn dataField='btr' dataSort={ true } width='5.5%'>BTR</TableHeaderColumn>
            <TableHeaderColumn dataField='str' dataSort={ true } width='5%'>STR</TableHeaderColumn>
            <TableHeaderColumn dataField='success' dataSort={ true } width='7.5%'>Success %</TableHeaderColumn>
            <TableHeaderColumn dataField='errors' dataSort={ true } width='7%'>Errors %</TableHeaderColumn>
            <TableHeaderColumn dataField='zeros' dataSort={ true } width='7%'>Zeros %</TableHeaderColumn>
            <TableHeaderColumn dataField='timeouts' dataSort={ true } width='6%'>T/O %</TableHeaderColumn>
            <TableHeaderColumn dataField='duration' dataSort={ true } width='7%'>Avg Resp</TableHeaderColumn>
          </BootstrapTable>
        </Wrapper>
    );
  }
}

ReportTable.propTypes = {
  data: PropTypes.array,
};
