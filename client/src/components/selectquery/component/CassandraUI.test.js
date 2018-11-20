import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

import CassandraUI from './CassandraUI'
import Header from '../../Header/Header'
import CustomizedTabs from './CustomizedTabs'

describe("<CassandraUI />", ()=>{
    let wrapper
    beforeEach(()=>{

        wrapper = shallow(<CassandraUI />)
        //console.log(wrapper.debug())
    })

    it("should display <Header />", () => {
        expect(wrapper.find(Header)).toHaveLength(1)
    })

    it("should display <CustomizedTabs />", () => {
        expect(wrapper.find(CustomizedTabs)).toHaveLength(1)
    })
})