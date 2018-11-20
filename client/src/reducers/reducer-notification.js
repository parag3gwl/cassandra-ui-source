const initialState = {
  isShown: false,
  message: '',
  nature: 'success',
}

export default function notificationReducer(state = initialState, action = {}){
  switch (action.type) {
      case "SHOW_NOTIFICATION": {
        const newState = {
          ...state,
          isShown: action.isShown_,
          message: action.message_,
          nature: action.nature_
        }
        return newState
      }
      default:
          return state
  }
}