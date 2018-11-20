import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import allReducers from "./reducers/index"
import CassandraUI from "./components/selectquery/component/CassandraUI"
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension"
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './components/Header/cassTheme'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['connectionsReducer', 'queryReducer', 'formDataReducer'],
}
const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(thunk)))
let persistor = persistStore(store)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
        <CassandraUI />
      </MuiThemeProvider> 
        </PersistGate>
      </Provider>
    )
  }
}

export default App