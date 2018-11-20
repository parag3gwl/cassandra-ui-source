const initialState = {
  filterByCondtion: [],
  count: 1,
}


export default function conditionReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "ADD_UPDATE_CONDITION": {
      return {
        ...state,
        filterByCondtion: action.filterByCondtion
      }
    }

    case "INCREASE_CONDITION": {
      const newState = {
        ...state,
        count: state.count + 1
      }
      return newState
    }

    case "DECREASE_CONDITION": {
      const newState = {
        ...state,
        ...action.payload
      }
      return newState
    }
    case "RESET_STATE":
    case "RESET_ALL_CONDITIONS":
      {
        return {
          ...state,
          filterByCondtion: [],
          count: 1,
        }
      }
    default:
      return state
  }
}  
