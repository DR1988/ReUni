import { combineReducers } from 'redux'
import home from './Home'
import graph from './graph'
import mainPage from './main'
import mainForm from './MainForm'
import modal from './Modal'

const rootReducer = combineReducers({ home, graph, mainPage, mainForm, modal })

export default rootReducer
