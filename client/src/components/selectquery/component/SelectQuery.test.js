import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

import {SelectQuery} from './SelectQuery'
import KeyspaceSelect, {classes} from './../container/KeyspaceSelect'
import ColumnFamilySelect from './../container/ColumnFamilySelect'
import ColumnsSelect from './../container/ColumnsSelect'

describe('<SelectQuery />', ()=>{
    let wrapper

    beforeEach(()=>{
        wrapper = shallow(<SelectQuery />)
        wrapper.setProps({classes: {formControl: "test"}})
    })

    it('should be having one <KeyspaceSelect/>', ()=>{
        expect(wrapper.find(KeyspaceSelect)).toHaveLength(1)
    })

    it('should be having one <ColumnFamilySelect />', ()=>{    
        expect(wrapper.find(ColumnFamilySelect)).toHaveLength(1)
    })

    it('should be having one <ColumnsSelect />', ()=>{    
        expect(wrapper.find(ColumnsSelect)).toHaveLength(1)
    })
})