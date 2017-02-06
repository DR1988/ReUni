import { combineReducers } from 'redux'
import home from './Home'
import graph from './graph'
import mainPage from './main'
import InputFormer from './InputFormer'
import mainForm from './MainForm'

const rootReducer = combineReducers({ home, graph, mainPage, InputFormer, mainForm })

export default rootReducer
