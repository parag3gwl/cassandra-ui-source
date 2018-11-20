const initialState = {
  keyspace: "", 
  columnFamily: "", 
  columns: [], 
  filterBy: "", 
  operation: "", 
  statement: "",
  condition: "",
  limit: 100,
}

export default function queryReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "KEYSPACE_VALUE_CHANGED": {
      const newState = {
        ...state,
        keyspace: action.keyspace,
        columnFamily: initialState.columnFamily,
        columns: initialState.columns,
        filterBy: initialState.filterBy, 
        operation: initialState.operation, 
        statement: initialState.statement,
        condition: initialState.condition,
      }
      return newState
    }
    case "COLUMN_FAMILY_VALUE_CHANGED": {
      const newState = {
        ...state,
        columnFamily: action.columnFamily,
        columns: initialState.columns,
        filterBy: initialState.filterBy, 
        operation: initialState.operation, 
        statement: initialState.statement,
        condition: initialState.condition,       
      }
      return newState
    }
    case "COLUMNS_VALUE_CHANGED": {
      return {
        ...state,
        columns: [...action.columns],
      }
    }


    case "CONDITION_CHANGED": {
      const newState = {
        ...state,
        condition: action.condition
      }
      return newState
    }
    case "QUERY_FORMED": {
      const newState = {
        ...state,
        statement: action.statement
      }
      return newState
    }
    case "ADD_LIMIT": {
      const newState = {
        ...state,
        limit: action.limit
      }
      return newState
    }
    case "RESET_STATE": {
      return initialState
    }
    default: return state

 }
}

