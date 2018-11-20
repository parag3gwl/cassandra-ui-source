import React, { Component } from "react";
import ReactExport from "react-data-export";
import IconButton from '@material-ui/core/IconButton'
import FileDownload from '@material-ui/icons/FileDownload'
import Tooltip from '@material-ui/core/Tooltip'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ExportToExcel extends Component {
  transformData = (data) => {
    let transformedArray = []
    data.map(obj => {
      let transformedObj = {}

      Object.keys(obj).map(val => {
        if (typeof obj[val] === "object") {
          let strVal = JSON.stringify(obj[val])
          transformedObj = { ...transformedObj, [val]: strVal }
        }
        else {
          transformedObj = { ...transformedObj, [val]: obj[val] }
        }
      })
      transformedArray.push(transformedObj)
    })
    return transformedArray
  }

  render() {
    console.log("render() : ExportToExcel")
    return (
      <ExcelFile filename={this.props.fileName}
        element={
        <Tooltip id="newConn" title="Export to Excel">
            <IconButton
              variant="fab"
              aria-label="add" style={{ background: '#4CAF50' }}>
              <FileDownload style={{ height: '15px', width: '15px', color: 'white' }} />
            </IconButton>
        </Tooltip>
      }>
        <ExcelSheet data={this.transformData(this.props.data)} name={this.props.sheetName}>
          {
            this.props.columnDetails.map((obj, index) => {
              return <ExcelColumn key={index} label={obj["column_name"]} value={obj["column_name"]} />
            }
            )}
        </ExcelSheet>
      </ExcelFile>
    )
  }
}