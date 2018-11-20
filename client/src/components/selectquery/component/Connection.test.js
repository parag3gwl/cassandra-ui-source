import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

import {Connection} from './Connection'
import {Oldconnection} from './../container/Oldconnection'
import NewConnection from './../container/NewConnection'

describe("<Connection />", ()=>{
    let wrapper
    beforeEach(()=>{
    wrapper = shallow(<Connection classes={{card: "testCard", root: "testRoot"}} />)
    wrapper.setState({isProgress: true})
    })

    it("should display <NewConnection />", () => {
        expect(wrapper.find(NewConnection)).toHaveLength(1)
    })

    // it("should display <Oldconnection />", () => {
    //     //expect(wrapper.find(Oldconnection)).toHaveLength(1)
    //     expect(wrapper.find(Oldconnection)).toHaveLength(1)
    // })
})