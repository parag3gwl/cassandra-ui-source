import CassandraAPICalls from "./../Service/CassandraAPICalls"

export function getCassandraInformation(queryStatement, callbackFn) {
    return function (dispatch) {
        return CassandraAPICalls.fireQuery(queryStatement).then(information => {
            if(information.rows !== undefined){
                dispatch(callbackFn(information.rows))
            }    
        }).catch(error => {
            throw (error)
        })
    }
}

export const AddResult = (ResultRows) => {
    return (
        {
            type: "ADD_RESULT",
            result: ResultRows,
        }
    )
}

export function PopulateResult (queryStatement){
    return getCassandraInformation(queryStatement, AddResult)
}