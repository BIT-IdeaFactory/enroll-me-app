import { combineReducers } from 'redux'
import selection from './selection'
import data from './data'
import appState from './appState'

export default combineReducers({
  selection,
  data,
  appState
})
