import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { Wave } from 'react-animated-text';
  
const Header = (props) => {
        const { connectionsReducer } = props

        if (connectionsReducer.connections === undefined){
            return null
        }
        return(
            <div>
            <AppBar position="static">
            <Toolbar>
  
                 <Wave text="CassandraUI" effect="fadeOut" effectDuration={2} speed={1}/>
                
                <Typography variant="title" color="inherit" style={{marginLeft: '70%',fontSize: 14, color: '#00E676',}}> 
                {    (connectionsReducer.connections[connectionsReducer.connectedIndex] !== undefined)?
                    <b><u>{connectionsReducer.connections[connectionsReducer.connectedIndex].name}</u></b> : null
                }
                </Typography> 
            </Toolbar>
            </AppBar>
            </div>
        )
    }

const mapStateToProps = (state) => {
    return {
      connectionsReducer: state.connectionsReducer
    }
  }

  export default
    connect(mapStateToProps)(Header)
