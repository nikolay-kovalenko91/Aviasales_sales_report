import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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

export default class SelectHookTable extends React.Component {
  render() {
    return (
      <BootstrapTable data={ this.props.data } selectRow={ selectRowProp }>
        <TableHeaderColumn dataField='time' isKey={ true } dataSort={ true }>Date</TableHeaderColumn>
        <TableHeaderColumn dataField='searches' dataSort={ true }>Searches</TableHeaderColumn>
        <TableHeaderColumn dataField='clicks' dataSort={ true }>Clicks</TableHeaderColumn>
        <TableHeaderColumn dataField='unique_clicks' dataSort={ true }>Unq. Clicks</TableHeaderColumn>
        <TableHeaderColumn dataField='ctr' dataSort={ true }>CTR</TableHeaderColumn>
        <TableHeaderColumn dataField='bookings' dataSort={ true }>Bookings</TableHeaderColumn>
        <TableHeaderColumn dataField='sales' dataSort={ true }>Sales</TableHeaderColumn>
        <TableHeaderColumn dataField='btr' dataSort={ true }>BTR</TableHeaderColumn>
        <TableHeaderColumn dataField='str' dataSort={ true }>STR</TableHeaderColumn>
        <TableHeaderColumn dataField='success' dataSort={ true }>Success %</TableHeaderColumn>
        <TableHeaderColumn dataField='errors' dataSort={ true }>Errors %</TableHeaderColumn>
        <TableHeaderColumn dataField='zeros' dataSort={ true }>Zeros %</TableHeaderColumn>
        <TableHeaderColumn dataField='timeouts' dataSort={ true }>T/O %</TableHeaderColumn>
        <TableHeaderColumn dataField='duration' dataSort={ true }>Avg Resp</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

SelectHookTable.propTypes = {
  data: PropTypes.array,
};
