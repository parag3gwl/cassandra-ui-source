const initialState = {
    isOpen: false,
    data: {},
}

export default function editDialogReducer(state = initialState, action = {}) {
    switch (action.type) {
        case "FLIP_EDIT_DIALOG_BOX":
            {
                return {
                    ...state,
                    isOpen: !state.isOpen,
                    data: action.data,
                }
            }
        case "UPDATE_EDIT_DIALOG_DATA":
            {
                return {
                    ...state,
                    data: action.data,
                }
            }

        default:
            return state
    }
}