import React from 'react'
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core"
import { handleColumnsChange, PrepareQuertyStatement } from './../../../actions/actioncreater'
import { PopulateColumns } from './../../../actions/ApiActionCreater'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function ColumnsSelect(props) {
    const handleOnChangeEvent = (event) => {

        let listOfColumns = []
        if (event.target.value[event.target.value.length - 1] === 'All') {

            props.formDataReducer["columnDetails"].map((val, index) =>
                listOfColumns.push(val.column_name))
        }
        else {
            listOfColumns = event.target.value
        }

        props.handleColumnsChange(listOfColumns)
        const newState = { ...props.queryReducer, columns: listOfColumns }
        props.PrepareQuertyStatement(newState, props.conditionReducer)
    }
    return (
        <FormControl className={props.classes.formControl} >
            <InputLabel htmlFor="columns">Columns</InputLabel>
            <Select
                fullWidth={false}
                multiple={true}
                value={props.queryReducer.columns}
                onChange={(event) => {
                    handleOnChangeEvent(event)
                }}

                inputProps={{
                    name: 'columns',
                    id: 'columns',
                }}
                style={{ fontSize: '12px' }}
            >
                {
                    <MenuItem key={-1} value={"All"}><u><b><i>All</i></b></u></MenuItem>
                }
                {
                    (props.formDataReducer["columnDetails"] !== undefined) ?
                        props.formDataReducer["columnDetails"].map((val, index) =>
                            <MenuItem key={index} value={val.column_name}>
                                {val.column_name
                                }
                            </MenuItem>)
                        : null}
            </Select>
        </FormControl>
    )
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
        handleColumnsChange: handleColumnsChange,
        PopulateColumns: PopulateColumns,
        PrepareQuertyStatement: PrepareQuertyStatement
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ColumnsSelect)