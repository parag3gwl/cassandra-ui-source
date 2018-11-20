import CassandraAPICalls from "./../Service/CassandraAPICalls"

export function getCassandraInformation(queryStatement, callbackFn) {
    return function (dispatch) {
        return CassandraAPICalls.fireQuery(queryStatement).then(information => {
            dispatch(callbackFn(information.data.rows))
        }).catch(error => {
            throw (error)
        })
    }
}

export const AddKeyspaces = (keyspacesRows) => {
    let keyspaces = []
    for ( let row in keyspacesRows) {
        keyspaces.push(keyspacesRows[row]["keyspace_name"])
    }

    return (
        {
            type: "ADD_KEYSPACES",
            keyspaces: keyspaces,
        }
    )
}

export const AddColumnFamilies = (ColumnFamilyRows) => {
    let ColumnFamilies = []
    for ( let row in ColumnFamilyRows) {
        if(ColumnFamilies.indexOf(ColumnFamilyRows[row]["table_name"]) === -1){
            ColumnFamilies.push(ColumnFamilyRows[row]["table_name"])
        }
    }
    return (
        {
            type: "ADD_COLUMN_FAMILIES",
            columnFamilies: ColumnFamilies,
        }
    )
}

export const AddColumns = (ColumnDtls) => {
    return (
        {
            type: "ADD_COLUMNS",
            ColumnDetails: ColumnDtls,
        }
    )
}

export const NoActionNeeded = () => {
    return (
        {
            type: "NO_ACTION_NEEDED",
            payload: "",
        }
    )
}

export function PopulateKeySpace (){
    let query = "SELECT DISTINCT keyspace_name from system_schema.columns"
    return getCassandraInformation(query, AddKeyspaces)
}

export function PopulateColumnFamilies(keyspace){
    let query = "SELECT table_name from system_schema.columns where keyspace_name = '" +
        keyspace + "'"
    return getCassandraInformation(query, AddColumnFamilies)
}

export function PopulateColumns(queryReducer){
    if (queryReducer.keyspace === "" || queryReducer.columnFamily === "" ) {
         return null }
    let query = "SELECT column_name, kind, type from system_schema.columns where keyspace_name = '" +
        queryReducer.keyspace + "' and table_name = '" + queryReducer.columnFamily + "'"
    return getCassandraInformation(query, AddColumns)
}