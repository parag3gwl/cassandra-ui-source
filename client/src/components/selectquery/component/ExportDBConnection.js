import React from 'react'
import { connect } from 'react-redux'

const ExportDBConnection = (props) => {

    const handleOnClick = () => {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(props.connectionsReducer.connections)], { type: 'text/plain' });
        a.href = URL.createObjectURL(file);
        a.download = 'DB_Connections.json';
        a.click();
    }

    return (
        <label style={{
            color: 'blue',
            padding: '5px'
        }}
            onClick={handleOnClick}>
            <u>Export</u>
        </label>)
}


const mapStateToProps = (state) => {
    return {
        connectionsReducer: state.connectionsReducer
    }
}

export default connect(mapStateToProps)(ExportDBConnection)
