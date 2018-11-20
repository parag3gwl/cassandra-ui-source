import CassandraAPICalls from "./../Service/CassandraAPICalls"

export function makeConnection(connection) {
    return function (dispatch) {
        CassandraAPICalls.makeConnection(connection).then(information => {
        }).catch(error => {
            throw (error)
        })
    }
}
export function setConnectedDBIndex(index) {
    return {
        type: "SET_CONNECTION_INDEX",
        index: index,
    }
}
export const AddNewConnection = (connections, connection) => {
    console.log("AddNewConnection : ")
    connections.push(connection)
    return (
        {
            type: "ADD_CONNECTION",
            connections: connections,
        }
    )
}

export const deleteConnection = (connections, index) => {
    console.log("deleteConnection : ")
    connections.splice(index, 1)
    return (
        {
            type: "DELETE_CONNECTION",
            connections: connections,
        }
    )
}