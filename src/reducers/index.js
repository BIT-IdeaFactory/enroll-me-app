import { combineReducers } from 'redux'
import selection from './selection'
import data from './data'

export default combineReducers({
  selection,
  data
})
