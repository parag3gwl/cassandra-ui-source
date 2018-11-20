import React, { Component } from 'react'
import { Paper } from "@material-ui/core"
import Oldconnection from './../container/Oldconnection'
import NewConnection from './../container/NewConnection'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'

const styles = cardTheme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
})

export class Connection extends Component {
  render() {
    const { classes } = this.props
    return (
      <Paper>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
          <NewConnection />
            </CardContent>
          </div>
          <CardContent className={classes.content}>
            <Oldconnection />
          </CardContent>
        </Card>        
      </Paper>
    )
  }
}
export default (withStyles(styles)(Connection))