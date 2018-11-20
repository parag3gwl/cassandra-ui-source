import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import ExecuteQuery from './../container/ExecuteQuery'
import ConditionContainer from './../container/ConditionContainer'
import Result from './../container/Result'
import { withStyles } from '@material-ui/core/styles'
import KeyspaceSelect from './../container/KeyspaceSelect'
import ColumnFamilySelect from './../container/ColumnFamilySelect'
import ColumnsSelect from './../container/ColumnsSelect'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 220,
      maxWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    button: {
      width: 30, 
      height: 0.5,
    },
  })

const SelectQuery = (props) => {
        const { classes } = props
        return (
            <Paper>
                <Grid container>
                    <Grid item sm={"auto"}>
                     <KeyspaceSelect classes={classes}/>
                    </Grid>
                    <Grid item sm={"auto"}>
                   <ColumnFamilySelect classes={classes}/>
                    </Grid>
                    <Grid item sm={"auto"}>
                     <ColumnsSelect classes={classes}/>
                    </Grid>
                </Grid>
                <ConditionContainer classes={classes} />
                <ExecuteQuery  classes={classes} />
                <Result />
            </Paper>
        )
    }

export default withStyles(styles)(SelectQuery)