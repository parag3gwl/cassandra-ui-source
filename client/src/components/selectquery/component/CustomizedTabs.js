import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SelectQuery from '../component/SelectQuery'
import Connection from './Connection'
import InsertQuery from '../component/InsertQuery'

class CustomizedTabs extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state

    return (
      <div>
        <Tabs
          value={value}
          onChange={this.handleChange}
        >
          <Tab 
            disableRipple
            label="Connection"
            classes={this.props.theme}
          />
          <Tab
            disableRipple
            label="Query"
          />
          <Tab
            disableRipple
            label="Insert Record"
          />
          <Tab
            disableRipple
            label="Admin"
          />
        </Tabs>
        {value === 0 && <Connection/>}
        {value === 1 && <SelectQuery/>}
        {value === 2 && <InsertQuery/>} 
      </div>
    )
  }
}

export default (CustomizedTabs)