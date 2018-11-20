import React, { Component } from 'react'
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  TableFooter, TablePagination, Dialog, DialogContent
} from '@material-ui/core'
import { connect } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import { bindActionCreators } from 'redux'
import DeleteIcon from '@material-ui/icons/Delete'
import { AddQueryStatement } from "../../../actions/actioncreater"
import { flipEditDailog } from "../../../actions/EditDialogActionCreator"
import EditDialog from "./EditDialog"
import ExportToExcel from './ExportToExcel'
import TablePaginationActionsWrapped from './TablePaginationActions'
import EditIcon from '@material-ui/icons/Edit'

var JSONPretty = require('react-json-pretty');
require('react-json-pretty/JSONPretty.adventure_time.styl');


class Result extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      rowsPerPage: 5,
      open: false,
      SelectedCellData: {},
    }
  }
  handleRecordDelete = (indexToDelete, dataToDelete) => {
    let query = ""
    query = "delete from " + this.props.keyspace + "." + this.props.columnFamily

    let conditions = ""
    this.props.columnDetails.map((obj) => {
      if ((obj.kind === 'partition_key' || obj.kind === 'clustering') &&
        dataToDelete[obj["column_name"]] !== undefined) {
        conditions = conditions + obj["column_name"] + "='" + dataToDelete[obj["column_name"]] + "' AND "
      }
    })

    // Removing additional AND from last
    if (conditions !== "") {
      query += " where " + conditions.slice(0, conditions.length - 5)
      this.props.AddQueryStatement(query)
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  getTableCellData = (pair) => {
    let json = ""

    switch (typeof pair[1]) {
      case "object":
      case "boolean": {
        json = JSON.stringify(pair[1])
        //json = json.replace(/"(\w+)"\s*:/g, '$1:')
        //json = json.replace(/"/g, "'")
        return json
      }
      default:
        return pair[1]
    }
  }

  handleCellOnClick = (event) => {
    console.log(event.target.value)
    let jsonObj
    try {
      jsonObj = JSON.parse(event.target.textContent)
    }
    catch (error) {
      jsonObj = event.target.textContent
    }
    this.setState({ SelectedCellData: jsonObj })
    this.setState({ open: true })
  }
  handleOnDialogClose = () => {
    this.setState({ open: false })
  }


  render() {
    console.log("render() : Result")
    const data = this.props.resultDataReducer.result
    const { rowsPerPage, page } = this.state
    if (this.props.resultDataReducer.result.length === 0) {
      return null
    }

    return (
      <div style={{ width: '99.5%', marginTop: 8 * 3, overflowX: 'auto', paddingLeft: '0.5%' }} >
        <EditDialog />
        <div style={{ paddingLeft: '1%', paddingBottom: '1%' }}>
          <ExportToExcel
            data={this.props.resultDataReducer.result}
            fileName={this.props.keyspace}
            sheetName={this.props.columnFamily}
            columnDetails={this.props.columnDetails} />
        </div>


        <Table id="table-to-xls">
          <TableHead>
            <TableRow style={{ height: '25px' }}>
              <TableCell><b>Action</b></TableCell>
              <TableCell><b>Sl No</b></TableCell>
              {(Object.keys(this.props.resultDataReducer.result[0]).map((value, index) => {
                return <TableCell key={index}><b>{value}</b></TableCell>
              }))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((obj, slNo) => {
              let currentIndex = page * rowsPerPage + slNo
              return (
                <TableRow key={slNo} style={{ height: '20px' }}>
                  <TableCell>
                    <Tooltip title="Delete Record">
                      <DeleteIcon onClick={(event) =>
                        this.handleRecordDelete(currentIndex, data[currentIndex])}
                        style={{ height: '15px', width: '15px', color: '#7f0000' }} />
                    </Tooltip>
                    <Tooltip id="newConn" title=" Edit Record">
                      <EditIcon onClick={(event) => this.props.flipEditDailog(data[currentIndex])}
                        style={{ height: '15px', width: '15px' }} />
                    </Tooltip>
                  </TableCell>
                  <TableCell>{currentIndex + 1}</TableCell>
                  {
                    Object.entries(obj).map((pair, index) => {
                      return <TableCell key={index}
                        style={{ width: '60' }}
                        onDoubleClick={(event) => { this.handleCellOnClick(event) }}>{
                          this.getTableCellData(pair)}
                      </TableCell>
                    })
                  }
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[1, 5, 25, 50, 100]}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <Dialog
          open={this.state.open}
          onClose={this.handleOnDialogClose}
          aria-labelledby="form-dialog-title">
          <DialogContent>
            <JSONPretty json={this.state.SelectedCellData}></JSONPretty>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    keyspace: state.queryReducer.keyspace,
    columnFamily: state.queryReducer.columnFamily,
    resultDataReducer: state.resultDataReducer,
    columnDetails: state.formDataReducer.columnDetails,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    AddQueryStatement,
    flipEditDailog
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Result)