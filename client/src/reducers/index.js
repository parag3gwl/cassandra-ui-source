import { combineReducers } from 'redux'
import connectionsReducer from './reducer-connections'
import queryReducer  from "./reducer-query"
import formDataReducer from "./reducer-formdata"
import resultDataReducer from "./reducer-resultdata"
import conditionReducer from "./reducer-condition"
import notificationReducer from "./reducer-notification"
import insertDataReducer from "./reducer-insertData"
import editDialogReducer from "./reducer-editDialog"

const allReducers = combineReducers(
    {
        connectionsReducer: connectionsReducer,
        queryReducer: queryReducer,
        formDataReducer: formDataReducer,
        resultDataReducer: resultDataReducer,
        conditionReducer: conditionReducer,
        notificationReducer: notificationReducer,
        insertDataReducer: insertDataReducer,
        editDialogReducer: editDialogReducer,
    }
)
export default allReducers