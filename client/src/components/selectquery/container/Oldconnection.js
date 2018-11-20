import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { Button, Paper, CircularProgress } from '@material-ui/core'
import { deleteConnection, setConnectedDBIndex } from './../../../actions/ConnectionActionCreater'
import { resetState } from './../../../actions/CommonActionCreater'
import { showNotification } from './../../../actions/NotificationActionCreater'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CassandraAPICalls from "./../../../Service/CassandraAPICalls"
import Notification from "./../../Common/Notification"

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

export class Oldconnection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isProgress: false,
    }
  }

  handleClick = (conn, index) => {
    this.setState({ isProgress: true })
    CassandraAPICalls.makeConnection(conn).then(
      resp => {
        if (resp.status === 200) {
          this.props.showNotification(true, conn.name + " Database Connected", 'success')
          this.props.setConnectedDBIndex(index)
        }
        else {
          this.props.showNotification(true, conn.name + " Database NotConnected : " + resp.statusText, 'error')
          this.props.setConnectedDBIndex(-1)
        }
        this.setState({ isProgress: false })
      }
    )
    this.props.resetState()
  }

  render() {
    const { classes, connectionsReducer } = this.props
    
    if(connectionsReducer === undefined){
      console.log("connectionsReducer is undefined")
      return null
    }
    return (
      <div className={classes.root}>
        <Notification />
        <List>
          {
            (connectionsReducer.connections === undefined) ? null :
              connectionsReducer.connections.map((conn, index) => {
                return (
                  <Paper key={index} style={{ width: '70%' }}>
                    <ListItem button>
                    <Tooltip title="Delete Connection">
                      <IconButton aria-label="Edit" style={{background:'white'}}>
                        <DeleteIcon onClick={(event) =>
                          this.props.deleteConnection(connectionsReducer.connections, index)}
                          style={{ height: '25px', width: '25px', color: '#7f0000', background:'white' }}/>
                      </IconButton>
                      </Tooltip>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Tooltip key={index} title={conn.contactPoints}>
                        <Button
                          style={
                            (connectionsReducer.connectedIndex === index) ?
                              { backgroundColor: 'green' } : null}
                          onClick={(event) => this.handleClick(conn, index)}
                        >
                          {conn.name}
                        </Button>
                      </Tooltip>
                    </ListItem>
                    <Divider />
                  </Paper>
                )
              })
          }
        </List>
        {this.state.isProgress &&
          <CircularProgress
            size={60}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
            }}
          />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connectionsReducer: state.connectionsReducer
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteConnection: deleteConnection,
    resetState: resetState,
    showNotification: showNotification,
    setConnectedDBIndex: setConnectedDBIndex,
  }, dispatch)
}

export default
  connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(Oldconnection))
