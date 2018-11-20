import React, { Component } from 'react'
import { Grid, Button, TextField } from "@material-ui/core"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import { AddNewConnection } from "./../../../actions/ConnectionActionCreater"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class NewConnectionDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      contactPoints: "",
      port: 9042,
      uid: "",
      pwd: "",
      keyspace: "system_schema",
      name: ""
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    console.log("render() : NewConnection")
    return (
      <div style={{ marginTop: '5px' }}>
              <Tooltip id="newConn" title="New Connection">
                <Button
                  variant="fab"
                  onClick={this.handleClickOpen}
                  aria-label="add"
                  style={{margin: '5px'}}>
                  <AddIcon />
                </Button>
              </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create New Connection</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Proviode Cassandra Server Details.
              </DialogContentText>
            <Grid container>
              <Grid item sm={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="host"
                  label="Host"
                  fullWidth
                  onChange={(event) => this.setState({ contactPoints: event.target.value })}
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  margin="dense"
                  id="port"
                  label="Port"
                  fullWidth
                  onChange={(event) => this.setState({ port: event.target.value })}
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  margin="dense"
                  id="uid"
                  label="User Id"
                  fullWidth
                  onChange={(event) => this.setState({ uid: event.target.value })}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  margin="dense"
                  id="pwd"
                  label="Password"
                  onChange={(event) => this.setState({ pwd: event.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  margin="dense"
                  id="name"
                  label="Connection Name"
                  fullWidth
                  onChange={(event) => this.setState({ name: event.target.value })}
                />
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} style={{ color: 'white' }}>
              Cancel
              </Button>
            <Button onClick={
              (event) => {
                if (this.state.contactPoints !== "" &&
                  this.state.port !== "" &&
                  this.state.keyspace !== "") {
                  let conn = {
                    contactPoints: this.state.contactPoints,
                    port: this.state.port,
                    uid: this.state.uid,
                    pwd: this.state.pwd,
                    keyspace: this.state.keyspace,
                    name: this.state.name
                  }
                  this.props.AddNewConnection(conn)
                }
                this.handleClose()
              }
              }
              style={{ color: 'white' }}>
              Create
              </Button>
          </DialogActions>
        </Dialog> 
      </div>
    )
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    AddNewConnection: AddNewConnection
  }, dispatch)
}

export default connect(null, matchDispatchToProps)(NewConnectionDialog)