import React, { Component } from 'react'
import { Grid, Button, TextField } from "@material-ui/core"
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { arrayToObject } from '../../../components/Common/Utilities'
import CassandraAPICalls from '../../../Service/CassandraAPICalls'
import { showNotification } from "./../../../actions/NotificationActionCreater"
import Notification from "./../../Common/Notification"
import { flipEditDailog, updateEditDailogData } from "../../../actions/EditDialogActionCreator"

class EditDialog extends Component {
  handleClose = () => {
    this.props.flipEditDailog({})
  }

  getDisplayValue = (type, field) => {
    if (this.props.data[field] === null) {
      return null
    }

    if (type.startsWith("list") || type.startsWith("set")) {
      var json = JSON.stringify(this.props.data[field])
      //json = json.replace(/"(\w+)"\s*:/g, '$1:')
      //json = json.replace(/"/g, "'")

      return json
    }
    return this.props.data[field]
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

    this.props.updateEditDailogData(
      {
        ...this.props.data,
        ...pair
      }
    )
  }

  getPairBasedOnType(type, field, value) {
    if (type.startsWith("list") || type.startsWith("set")) {
      return field + "=" + JSON.stringify(this.props.data[field]) + " "
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
    const { data } = this.props
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

  componentWillMount() {
    console.log("componentWillMount : EditDialog")
  }

  componentDidMount() {
    console.log("componentDidMount : EditDialog")
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate : EditDialog")
    return true
  }

  
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps EditDialog")
    return {
      data: props.data,
    }
  }

  render() {
    console.log("render() : EditDialog")
    const { data } = this.props
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
        <Dialog
          open={this.props.isOpen}
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
    isOpen: state.editDialogReducer.isOpen,
    data: state.editDialogReducer.data,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showNotification,
    flipEditDailog,
    updateEditDailogData
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditDialog)