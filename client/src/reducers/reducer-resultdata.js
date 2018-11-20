const initialState = {
  result: [],
}

export default function resultDataReducer(state = initialState, action = {}){
  switch (action.type) {
    case "ADD_RESULT": {
      const newState = {
        ...state,
        result: [...action.result]
      }
      return newState
    }
    case "RESET_STATE": {
      return initialState
    }
    default:
      return state
  }
}