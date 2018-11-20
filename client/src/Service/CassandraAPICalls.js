import axios from 'axios'

export default class CassandraAPICalls {
    static fireGetQuery = (queryStatement) => {
        return axios("http://localhost:5000/api/getRecords", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            data: JSON.stringify({
                query: queryStatement
            })
        })
    }


    static fireQuery = (queryStatement) => {
        return axios("http://localhost:5000/api/execute", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            data: JSON.stringify({
                query: queryStatement
            })
        })
    }

    static fireUpdateQuery(queryStatement) {
        console.log(queryStatement)
        return axios("http://localhost:5000/api/executeUpdate", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            data: JSON.stringify({
                query: queryStatement
            })
        })
    }

    static makeConnection = (connection, resp) => {
        return fetch("http://localhost:5000/api/makeConnection", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({ connection })
        }).then((res) => resp = res)
    }
}