import React from 'react'
import Header from '../../Header/Header'
import CustomizedTabs from './CustomizedTabs'
const CassandraUI = (props) => {
    return (
        <div style={{ width: '90%', paddingLeft: '5%', }}>
            <Header />
            <CustomizedTabs />
        </div>
    )
}
export default CassandraUI