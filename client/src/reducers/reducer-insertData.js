const initialState = {}

export default function insertDataReducer(state = initialState, action = {}){
    switch (action.type) {
        case "INSERT_COLUMNS": {
          const newState = {
            ...state,
            [action.clmnName]: action.clmnValue
          }
          return newState
        }
        default:
          return state
      }

}