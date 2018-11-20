export const handleKeyspaceChange = (keyspace) => {
    return (
        {
            type: "KEYSPACE_VALUE_CHANGED",
            keyspace: keyspace,
        }
    )
}

export const handleColumnFamilyChange = (columnFamily) => {
    return (
        {
            type: "COLUMN_FAMILY_VALUE_CHANGED",
            columnFamily: columnFamily,
        }
    )
}

export const handleColumnsChange = (columns) => {
    return (
        {
            type: "COLUMNS_VALUE_CHANGED",
            columns: columns,
        }
    )
}


export const handleConditionChange = (event) => {
    return (
        {
            type: "CONDITION_CHANGED",
            condition: event.target.value,
        }
    )
}

export const PrepareQuertyStatement = (queryReducer, conditionReducer) => {
    const query = Query(queryReducer, conditionReducer)
    return AddQueryStatement(query)
}

export const AddQueryStatement = (query) => {
    return (
        {
            type: "QUERY_FORMED",
            statement: query
        }
    )
}

export const IncreaseConditions = () => {
    return (
        {
            type: "INCREASE_CONDITION",
            payload: "1"
        }
    )
}

export const DecreaseConditions = (conditionReducerCopy) => {
    return (
        {
            type: "DECREASE_CONDITION",
            payload: conditionReducerCopy
        }
    )
}

export const AddLimit = (limit) => {
    return (
        {
            type: "ADD_LIMIT",
            limit: limit
        }
    )
}

const Query = (queryReducer, conditionReducer) => {
    let query = ""
    let isQueryFormed = false

    if (queryReducer["keyspace"] !== "" &&
        queryReducer["columnFamily"] !== "" &&
        queryReducer["columns"].length !== 0) {
        query += "SELECT " + [...queryReducer["columns"]] +
            " FROM " + queryReducer["keyspace"] + "." + queryReducer["columnFamily"]
        isQueryFormed = true
    }

    let placeholder = ""
    if (conditionReducer.filterByCondtion.length !== 0) {
        conditionReducer.filterByCondtion.map((obj, index) => {
            if ((obj.filterBy !== undefined && obj.operation !== undefined && obj.condition !== undefined)
                && (obj.filterBy !== "" && obj.operation !== "" && obj.condition !== "")) {
                switch (obj.filterBy["type"]) {
                    case "boolean":
                    case "integer": {
                        placeholder += obj.filterBy["column_name"] + obj.operation + obj.condition + " AND "
                        break
                    }
                    case "text": {
                        placeholder += obj.filterBy["column_name"] + obj.operation + "'" + obj.condition + "'" + " AND "
                        break
                    }
                    default: {
                        break
                    }
                }
            }
        })
    }
    if (placeholder !== "") {
        // remove last " and " from placeholder
        query += " where " + placeholder.slice(0, placeholder.length - 5)
    }

    if (queryReducer["limit"] !== "0" && isQueryFormed === true) {
        query += " LIMIT " + queryReducer["limit"]
    }

    if (isQueryFormed === true) {
        query += " ALLOW FILTERING"
    }
    return query
}