import React from 'react'
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core"
import { handleColumnFamilyChange } from './../../../actions/actioncreater'
import { PopulateColumnFamilies, PopulateColumns } from './../../../actions/ApiActionCreater'
import { resetAllConditions } from './../../../actions/CommonActionCreater'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function ColumnFamilySelect(props) {
    return (
        <FormControl className={props.classes.formControl}>
            <InputLabel htmlFor="columnFamily">Column Families</InputLabel>
            <Select
                value={props.queryReducer.columnFamily}
                onChange={(event) => {
                    props.handleColumnFamilyChange(event.target.value)
                    props.resetAllConditions()
                    const copiedValues = {
                                            ...props.queryReducer, 
                                            columnFamily: event.target.value
                                        }
                    props.PopulateColumns(copiedValues)
                }
                }
                onMouseDown={(event) => {
                    (props.queryReducer.keyspace !== "") ?
                        props.PopulateColumnFamilies(props.queryReducer.keyspace) : null
                }}
                inputProps={{
                    name: 'columnFamily',
                    id: 'columnFamily',
                }}
                style = {{ fontSize: '12px'}}
            >
                {(props.formDataReducer["columnFamilies"] !== undefined) ?
                    props.formDataReducer["columnFamilies"].map((val, index) => <MenuItem key={index} value={val}>{val}</MenuItem>)
                    : null}
            </Select>
        </FormControl>
    )
}



const mapStateToProps = (state) => {
    return {
        queryReducer: state.queryReducer,
        formDataReducer: state.formDataReducer,
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        handleColumnFamilyChange: handleColumnFamilyChange,
        PopulateColumnFamilies: PopulateColumnFamilies,
        PopulateColumns: PopulateColumns,
        resetAllConditions: resetAllConditions,
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ColumnFamilySelect)