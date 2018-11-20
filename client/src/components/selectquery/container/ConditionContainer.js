import React, { Component } from 'react'
import { TextField, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AddLimit, PrepareQuertyStatement} from './../../../actions/actioncreater'
import ConditionCombination from './ConditionCombination'
class ConditionContainer extends Component {
    displayCondtions = (count) => {
        let data = []
        for (var index = 0; index < count; index++) {
            data.push(
                <Grid container key={index}>
                    <ConditionCombination key={index} id={index} classes={this.props.classes} /> </Grid>)
        }
        return data
    }
    
    render() {
        console.log("render() : ConditionContainer")
        const { classes } = this.props
        const count = this.props.conditionReducer.count
        return (
            <div>
                <form className={classes.root} autoComplete="off">
                    {this.displayCondtions(count)}

                </form>
                <TextField id="limit"
                    label="Limit"
                    placeholder="Limit"
                    type="number"
                    value={this.props.queryReducer.limit}
                    onChange={(event) => this.props.AddLimit(event.target.value)
                    }
                    className={classes.formControl}
                    onBlur={(event) => this.props.PrepareQuertyStatement(this.props.queryReducer, this.props.conditionReducer)}
                />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        queryReducer: state.queryReducer,
        conditionReducer: state.conditionReducer,
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        AddLimit: AddLimit,
        PrepareQuertyStatement: PrepareQuertyStatement,
    }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(ConditionContainer)