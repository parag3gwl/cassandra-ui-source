import React, { Component } from 'react'
import { Grid, Button, TextField } from "@material-ui/core"
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core"
import Tooltip from '@material-ui/core/Tooltip'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import { arrayToObject } from '../../../components/Common/Utilities'
import CassandraAPICalls from '../../../Service/CassandraAPICalls'
import { showNotification } from "./../../../actions/NotificationActionCreater"
import Notification from "./../../Common/Notification"

class EditDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      data: { ...this.props.data }
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  getDisplayValue = (type, field) => {
    if (this.state.data[field] === null) {
      return null
    }

    if (type.startsWith("list") || type.startsWith("set")) {
      var json = JSON.stringify(this.state.data[field])
      //json = json.replace(/"(\w+)"\s*:/g, '$1:')
      //json = json.replace(/"/g, "'")

      return json
    }
    return this.state.data[field]
  }

  handleOnChange = (type, value, field) => {
    let pair = ""
    if (type.startsWith("list") || type.startsWith("set")) {
      try {
        //value = "'" + value + "'"
        pair = {
          [field]: JSON.parse(value)
          // JSON.parse is returning string so needed to split it so that it will return array
        }
      }
      catch (e) {
        return
      }
    }
    else {
      pair = { [field]: value }
    }

    this.setState({
      data:
      {
        ...this.state.data,
        ...pair
      }
    })
  }

  getPairBasedOnType(type, field, value) {
    if (type.startsWith("list") || type.startsWith("set")) {
      return field + "=" + JSON.stringify(this.state.data[field]) + " "
    }

    switch (type) {
      case "boolean": {
        return field + "=" + value
      }
      case "text":
      default: {
        return field + "='" + value + "'"
      }

    }
  }

  handleOnClick = (columnsAttributes) => {
    const { data } = this.state
    const { keyspace, columnFamily } = this.props.queryReducer

    let query = "UPDATE " + keyspace + "." + columnFamily + " SET "
    let condition = ""

    Object.keys(data).map((field, index) => {
      if (columnsAttributes[field].kind === 'partition_key' ||
        columnsAttributes[field].kind === 'clustering') {
        condition += this.getPairBasedOnType(columnsAttributes[field].type, field, data[field]) + " AND "
      }
      else {
        query += this.getPairBasedOnType(columnsAttributes[field].type, field, data[field]) + ", "
      }
    })
    // Remove additional , from last
    query = query.slice(0, query.length - 2)

    query += "WHERE " + condition
    // Since JSON.stringify convert json to string having double quotes in key value pair we have to remove doublequotes from keys
    query = query.replace(/"(\w+)"\s*:/g, '$1:')
    query = query.replace(/"/g, "'")

    // Remove additional AND from last
    query = query.slice(0, query.length - 5)
    //    console.log(query)
    this.updateRecord(query)
  }

  updateRecord(queryStatement) {
    let resp
    resp = CassandraAPICalls.fireUpdateQuery(queryStatement).then(
      resp => {
        if (resp.status === 200) {
          this.props.showNotification(true, "Record Updated Successfully", 'success')
        }
        else {
          this.props.showNotification(true, "Update Failed " + resp.statusText, 'error')
        }
      }
    ).catch(error => {
      console.log(error)
      this.props.showNotification(true, "Update Failed " + error.response.statusText, 'error')
    }
      )
    console.log(resp)
  }

  render() {
    const { data } = this.state
    const { columnDetails } = this.props.formDataReducer
    if (data === undefined || columnDetails === undefined) {
      return null
    }
    let columnsAttributes = arrayToObject(columnDetails, "column_name")
    if (columnsAttributes === undefined || columnsAttributes === {}) {
      return null
    }

    return (
      <div>
        <Notification />
        <Tooltip id="newConn" title=" Edit Record">
          <EditIcon onClick={this.handleClickOpen} style={{ height: '15px', width: '15px' }} />
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{ height: '14px' }}>Edit Record</DialogTitle>
          <DialogContent>
            <Grid container>
              {

                Object.keys(data).map((field, index) => {
                  if (columnsAttributes[field] === undefined) {
                    return null
                  }

                  return (
                    <Grid key={index} item sm={12}>
                      <TextField
                        autoFocus
                        margin="dense"
                        key={index}
                        label={field}
                        fullWidth
                        value={this.getDisplayValue(columnsAttributes[field].type, field)}
                        style={{ fontSize: '12px' }}
                        disabled={
                          (columnsAttributes[field].kind === 'partition_key' ||
                            columnsAttributes[field].kind === 'clustering') ?
                            true : false
                        }
                        onChange={(event) => {
                          this.handleOnChange(columnsAttributes[field].type, event.target.value, field)
                        }}
                      />
                    </Grid>
                  )
                }
                )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
              </Button>
            <Button onClick={
              (event) => {
                this.handleOnClick(columnsAttributes)
                //this.handleClose()
              }
            }>
              Edit
              </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    formDataReducer: state.formDataReducer,
    queryReducer: state.queryReducer,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showNotification: showNotification,
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditDialog)