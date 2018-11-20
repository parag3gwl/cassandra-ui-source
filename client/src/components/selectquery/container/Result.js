import React, { Component } from 'react'
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  TableFooter, TablePagination, Dialog, DialogContent
} from '@material-ui/core'
import { connect } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import DeleteIcon from '@material-ui/icons/Delete'
import { AddQueryStatement } from "../../../actions/actioncreater"
import EditDialog from "./EditDialog"
import ExportToExcel from './ExportToExcel'
var JSONPretty = require('react-json-pretty');
require('react-json-pretty/JSONPretty.adventure_time.styl');

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
})
class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0)
  }

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1)
  }

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1)
  }

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    )
  }

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
          style={{ background: 'white' }}
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
          style={{ background: 'white' }}
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
          style={{ background: 'white' }}
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
          style={{ background: 'white' }}
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    )
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
)

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
    query = "delete from " + this.props.queryReducer.keyspace + "." + this.props.queryReducer.columnFamily

    let conditions = ""
    this.props.formDataReducer.columnDetails.map((obj) => {
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
    const data = this.props.resultDataReducer.result
    const { rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
    if (this.props.resultDataReducer.result.length === 0) {
      return null
    }

    return (
      <div style={{ width: '99.5%', marginTop: 8 * 3, overflowX: 'auto', paddingLeft: '0.5%' }} >
        <ExportToExcel
          data={this.props.resultDataReducer.result}
          fileName={this.props.queryReducer.keyspace}
          sheetName={this.props.queryReducer.columnFamily}
          columnDetails={this.props.formDataReducer.columnDetails} />

        <Table id="table-to-xls">
          <TableHead>
            <TableRow style={{ height: '25px' }}>
              <TableCell>Action</TableCell>
              <TableCell>Sl No</TableCell>
              {(Object.keys(this.props.resultDataReducer.result[0]).map((value, index) => {
                return <TableCell key={index}>{value}</TableCell>
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
                    <EditDialog index={currentIndex} data={data[currentIndex]} />
                  </TableCell>
                  <TableCell>{currentIndex + 1}</TableCell>
                  {
                    Object.entries(obj).map((pair, index) => {
                      return <TableCell key={index}
                        style={{ width: '60' }}
                        onClick={(event) => { this.handleCellOnClick(event) }}>{
                          this.getTableCellData(pair)}
                      </TableCell>
                    })
                  }
                </TableRow>
              )
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
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
    queryReducer: state.queryReducer,
    resultDataReducer: state.resultDataReducer,
    formDataReducer: state.formDataReducer,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    AddQueryStatement
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Result)