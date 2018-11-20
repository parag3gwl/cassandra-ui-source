import React from 'react'
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core"
import { handleKeyspaceChange } from './../../../actions/actioncreater'
import { PopulateKeySpace } from './../../../actions/ApiActionCreater'
import { resetAllConditions } from './../../../actions/CommonActionCreater'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export const KeyspaceSelect = (props) => {
    return (
        <FormControl className={props.classes.formControl}>
            <InputLabel htmlFor="keyspaces">Keyspaces</InputLabel>
            <Select
                value={props.queryReducer.keyspace}
                onChange={(event) => {
                    props.handleKeyspaceChange(event.target.value)
                    props.resetAllConditions()
                    }}
                onMouseDown={(event) => props.PopulateKeySpace()}
                inputProps={{
                    name: 'keyspaces',
                    id: 'keyspaces',
                }}
                style = {{ fontSize: '12px'}}
            >
                {(props.formDataReducer["keyspaces"] !== undefined) ?
                    props.formDataReducer["keyspaces"].map((val, index) => <MenuItem key={index} value={val}>{val}</MenuItem>)
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
        handleKeyspaceChange: handleKeyspaceChange,
        PopulateKeySpace: PopulateKeySpace,
        resetAllConditions: resetAllConditions
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(KeyspaceSelect)