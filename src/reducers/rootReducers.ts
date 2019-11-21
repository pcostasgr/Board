import {combineReducers} from '@reduxjs/toolkit'
import listDisplayReducer from './ListReducer'

const rootReducer=combineReducers({
    listDisplay:listDisplayReducer
})

export default rootReducer;