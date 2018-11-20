import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core"
import { AddFilterBy, AddOperation, AddCondition } from './../../../actions/ConditionActionCreater'
import { PrepareQuertyStatement, IncreaseConditions, DecreaseConditions } from './../../../actions/actioncreater'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'

class ConditionCombination extends Component {

    handleRemoveConditionClick = () => {
        if (this.props.conditionReducer.count > 1) {
            let conditionReducerCopy = this.props.conditionReducer
            conditionReducerCopy.filterByCondtion.splice(this.props.id, 1)
            conditionReducerCopy.count = conditionReducerCopy.count - 1
            this.props.DecreaseConditions(conditionReducerCopy)
        }

    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="filterBy">Filter-By</InputLabel>
                    <Select
                        value={
                            (this.props.conditionReducer.filterByCondtion[this.props.id] !== undefined) ?
                                this.props.conditionReducer.filterByCondtion[this.props.id].filterBy : ""
                        }

                        onChange={(event) => {
                            this.props.AddFilterBy(this.props.conditionReducer.filterByCondtion,
                                this.props.id, event.target.value)
                            //const newState = {...props.queryReducer, columns: event.target.value}
                            this.props.PrepareQuertyStatement(this.props.queryReducer, this.props.conditionReducer)
                        }}

                        inputProps={{
                            name: 'filterBy',
                            id: 'filterBy',
                        }}
                        style={{ fontSize: '12px' }}
                    >
                        {(this.props.formDataReducer["filterBy"] !== undefined) ?
                            this.props.formDataReducer["filterBy"].map((val, index) =>
                                <MenuItem key={index} value={val}>{val.column_name}</MenuItem>)
                            : null}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="operation">operation</InputLabel>
                    <Select
                        value={
                            (this.props.conditionReducer.filterByCondtion[this.props.id] !== undefined) ?
                                this.props.conditionReducer.filterByCondtion[this.props.id].operation : ""
                        }
                        onChange={(event) => {
                            this.props.AddOperation(this.props.conditionReducer.filterByCondtion,
                                this.props.id, event.target.value)
                            this.props.PrepareQuertyStatement(this.props.queryReducer, this.props.conditionReducer)
                        }}
                        inputProps={{
                            name: 'operation',
                            id: 'operation',
                        }}
                        style={{ fontSize: '12px' }}
                    >
                        {(this.props.formDataReducer["operation"] !== undefined) ?
                            this.props.formDataReducer["operation"].map((val, index) => <MenuItem key={index} value={val}>{val}</MenuItem>)
                            : null}
                    </Select>
                </FormControl>
                <TextField id="condition"
                    label="condition"
                    placeholder="Condition"
                    value={
                        (this.props.conditionReducer.filterByCondtion[this.props.id] !== undefined) ?
                            this.props.conditionReducer.filterByCondtion[this.props.id].condition : ""
                    }
                    onChange={(event) => {
                        this.props.AddCondition(this.props.conditionReducer.filterByCondtion,
                            this.props.id, event.target.value)
                        this.props.PrepareQuertyStatement(this.props.queryReducer, this.props.conditionReducer)
                    }
                    }
                    className={classes.formControl}
                    style={{ fontSize: '12px' }}
                />
                <IconButton variant="fab" onClick={(event) => {
                    this.handleRemoveConditionClick()
                    this.props.PrepareQuertyStatement(this.props.queryReducer, this.props.conditionReducer)
                }} aria-label="delete">
                    <RemoveIcon style={{ height: '15px', width: '15px', color: 'white' }} />
                </IconButton>
                &nbsp;&nbsp;
                <IconButton
                    variant="fab"
                    onClick={this.props.IncreaseConditions}
                    aria-label="add"
                >
                    <AddIcon style={{ height: '15px', width: '15px', color: 'white' }} />
                </IconButton>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        queryReducer: state.queryReducer,
        formDataReducer: state.formDataReducer,
        conditionReducer: state.conditionReducer,
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        AddFilterBy: AddFilterBy,
        AddOperation: AddOperation,
        AddCondition: AddCondition,
        PrepareQuertyStatement: PrepareQuertyStatement,
        IncreaseConditions: IncreaseConditions,
        DecreaseConditions: DecreaseConditions,
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ConditionCombination)