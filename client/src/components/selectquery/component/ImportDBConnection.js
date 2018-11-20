import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ImportConnections } from "./../../../actions/ConnectionActionCreater"


const ImportDBConnection = (props) => {
    let fileReader

    const handleFileRead = (e) => {
        const content = fileReader.result
        const values = JSON.parse(content)
        props.ImportConnections(values)
    }

    const handleFileChosen = (file) => {
        if (file !== undefined) {
            fileReader = new FileReader()
            fileReader.onloadend = handleFileRead
            fileReader.readAsText(file)
        }
    }

    return (
        <div>
            <label
                htmlFor="inputFile"
                style={{
                    color: 'blue',
                    padding: '5px'
                }}>
                <u>Import</u>
            </label>
            <input type='file'
                id='inputFile'
                style={{ display: 'none' }}
                accept='.json'
                onChange={e => handleFileChosen(e.target.files[0])}
            />
        </div>)
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ImportConnections: ImportConnections
    }, dispatch)
}

export default connect(null, matchDispatchToProps)(ImportDBConnection)