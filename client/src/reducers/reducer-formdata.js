const initialState = {
  keyspaces: [], 
  columnFamilies: [], 
  columnDetails: [], 
  filterBy: [], 
  operation: ["=","!="],
  condition: "",
  result: "",
}

export default function formDataReducer(state = initialState, action = {}){
  switch (action.type) {
    case "ADD_KEYSPACES": {
      const newState = {
        ...state,
        keyspaces: [...action.keyspaces]
      }
      return newState
    }
    case "ADD_COLUMN_FAMILIES": {
      const newState = {
        ...state,
        columnFamilies: [...action.columnFamilies]
      }
      return newState
    }
    case "ADD_COLUMNS": {
      let newState = {...state}
      newState = {
        ...state,
        columnDetails: [...action.ColumnDetails],
        filterBy: [...action.ColumnDetails],
      }
      return newState
    }  
    case "RESET_STATE": {
      return initialState
    }
    case "KEYSPACE_VALUE_CHANGED": {
      const newState = {
        ...state,
        keyspace: action.keyspace,
        columnFamilies: initialState.columnFamilies,
        columnDetails: initialState.columnDetails,
      }
      return newState
    }

    default:
      return state
  }
}
