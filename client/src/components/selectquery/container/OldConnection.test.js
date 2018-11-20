import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Oldconnection } from './Oldconnection'
import { CircularProgress } from '@material-ui/core'
import Notification from "./../../Common/Notification"

const connectionsReducer = {
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

describe("<Oldconnection />", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<Oldconnection connectionsReducer classes={{ card: "testCard", root: "testRoot" }} />)
        wrapper.setState({ isProgress: true })
    })

    it("should display <CircularProgress /> when {isProgress: true}", () => {
        expect(wrapper.find(CircularProgress)).toHaveLength(1)
    })

    it("should NOT display <CircularProgress /> when {isProgress: false}", () => {
        wrapper.setState({ isProgress: false })
        expect(wrapper.find(CircularProgress)).toHaveLength(0)
    })

    it("should display <Notification /> when { notificationIsShown: true }", () => {
        wrapper.setProps({ notificationIsShown: true })
        expect(wrapper.find(Notification)).toHaveLength(1)
    })

})