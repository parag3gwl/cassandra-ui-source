const initialState = {
    connections: [
        {
            contactPoints: "localhost",
            port: 9042,
            uid: "",
            pwd: "",
            keyspace: "system_schema",
            name: "localhost"
        }
    ],
    connectedIndex: -1
}

export default function connectionReducer(state = initialState, action = {}) {
    switch (action.type) {
        case "IMPORT_CONNECTIONS": {
            const connections = [...state.connections, ...action.connections]
            const newState = {
                ...state,
                connections: connections
            }
            return newState
        }
        case "ADD_CONNECTION": {
            const connections = [...state.connections, action.connections]
            const newState = {
                ...state,
                connections: connections
            }
            return newState
        }
        case "DELETE_CONNECTION": {
            const newState = {
                ...state,
                connections: action.connections
            }
            return newState
        }
        case "SET_CONNECTION_INDEX": {
            return {
                ...state,
                connectedIndex: action.index,
            }
        }
        default:
            return state
    }
}