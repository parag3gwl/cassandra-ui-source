import React, { Component } from 'react'
import {
  Grid, Button, TextField, Typography,
  Paper, Divider, Checkbox, FormControlLabel
} from "@material-ui/core"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import KeyspaceSelect from './../container/KeyspaceSelect'
import ColumnFamilySelect from './../container/ColumnFamilySelect'
import { setColumns } from './../../../actions/InsertActionCreater'
import { arrayToObject } from '../../../components/Common/Utilities'
import CassandraAPICalls from '../../../Service/CassandraAPICalls'
import { showNotification } from "./../../../actions/NotificationActionCreater"
import Notification from "./../../Common/Notification"

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    width: 30,
    height: 0.5,
  },
})

class InsertQuery extends Component {

  kindOfComponent = (obj) => {
    switch (obj["type"]) {
      case 'boolean': {
        return (
          <FormControlLabel
            style={{paddingLeft: '3%', paddingTop: '3%'}}
            control={
              <Checkbox
                style={{ background: 'white' }}
                checked={ (this.props.insertDataReducer[obj["column_name"]]===undefined) ? true : this.props.insertDataReducer[obj["column_name"]]}
                onChange={(event) => {
                  this.props.setColumns([obj["column_name"]], event.target.checked)
                }}
                value={obj["column_name"]}
                color="primary"
                default={true}
              />
            }
            label={obj["column_name"]}
          />)
      }
      default: {
        return (<TextField
          margin="dense"
          id={obj["column_name"]}
          label={obj["column_name"]}
          value={this.props.insertDataReducer[obj["column_name"]]}
          fullWidth
          onChange={(event) => {
            this.props.setColumns([obj["column_name"]], event.target.value )
          }
          } />)

      }
    }
  }

  DisplayColumns = (classes, columnDetails) => {
    if (columnDetails === undefined) {
      return null
    }
    return (
      columnDetails.map((obj) => {
        return (
          <Grid item sm={4}>
            {
              this.kindOfComponent(obj)
            }

          </Grid>
        ) // End of map return
      }) // End of map
    )
  }

  handleOnClick = () => {
    const { keyspace, columnFamily, columnDetails, insertDataReducer } = this.props

    let columns = ""
    let values = ""

    let query = "INSERT INTO " + keyspace + "." + columnFamily
    let columnsAttributes = arrayToObject(columnDetails, "column_name")

    Object.keys(insertDataReducer).map((key) => {
      columns += key + ", "
      let type = columnsAttributes[key].type
      if (type.startsWith("list") || type.startsWith("set")) {
        return values += '[' + insertDataReducer[key] + "], "
      }
      else if (type === "boolean") {
        return values += insertDataReducer[key] + ', '
      }
      else {
        return values += "'" + insertDataReducer[key] + "', "
      }
    })

    // Remove additional , from last
    columns = columns.slice(0, columns.length - 2)
    values = values.slice(0, values.length - 2)

    query += ' (' + columns + ') ' + ' VALUES( ' + values + ')'
    console.log(query)
    this.insertRecord(query)
  }

  handleClose = () => {
  }

  insertRecord = (queryStatement) => {
    let resp
    resp = CassandraAPICalls.fireUpdateQuery(queryStatement).then(
      resp => {
        if (resp.status === 200) {
          this.props.showNotification(true, "Record Inserted Successfully", 'success')
        }
        else {
          this.props.showNotification(true, "Insertion Failed " + resp.statusText, 'error')
        }
      }
    ).catch(error => {
      console.log(error)
      this.props.showNotification(true, "Insertion Failed " + error, 'error')
    }
      )
    console.log(resp)
  }

  render() {
    const { classes, columnDetails } = this.props

    return (
      <Paper>
        <Notification />
        <Typography style={{ padding: '1%' }}>
          <b>Please select <u>keyspace</u> and <u>column families</u></b>
        </Typography>
        <Grid container>
          <Grid item sm={"auto"}>
            <KeyspaceSelect classes={classes} />
          </Grid>
          <Grid item sm={"auto"}>
            <ColumnFamilySelect classes={classes} />
          </Grid>
        </Grid>
        <Divider>
        </Divider>
        {
          (columnDetails.length !== 0) ?
            <Typography color="Blue" style={{ padding: '1%' }}>
              <b>Please enter <u>columns</u> value</b>
            </Typography> :
            null}

        <Grid container spacing={40} style={{ paddingLeft: '0.5%' }}>
          {
            this.DisplayColumns(classes, columnDetails)
          }

        </Grid>
        <Grid container spacing={24}>
          <Grid item sm={6} align="right">
            <Button onClick={this.handleClose}>
              Cancel
              </Button>
          </Grid>
          <Grid item sm={6} align="left">
            <Button onClick={
              (event) => {
                this.handleOnClick()
                this.handleClose()
              }
            }>
              Insert
              </Button>
          </Grid>
        </Grid>
      </Paper>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    columnDetails: state.formDataReducer.columnDetails,
    keyspace: state.queryReducer.keyspace,
    columnFamily: state.queryReducer.columnFamily,
    insertDataReducer: state.insertDataReducer,
  }
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setColumns,
    showNotification,
  }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(InsertQuery))