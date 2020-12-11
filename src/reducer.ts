import { combineReducers } from 'redux'
import demoStore from './until/reducer'

export default combineReducers({
    demoStore: demoStore,
})