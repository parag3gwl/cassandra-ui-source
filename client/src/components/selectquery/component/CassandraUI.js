import React from 'react'
import Header from '../../Header/Header'
import CustomizedTabs from './CustomizedTabs'
export default class CassandraUI extends React.Component{
    render(){
        return(
            <div style = {{ width: '90%', paddingLeft: '5%',}}>
                <Header/>
                <CustomizedTabs />
            </div>       
        )
    }
}