import {combineReducers} from '@reduxjs/toolkit'
import listDisplayReducer from './ListReducer'
import popUpReducer from './PopUpReducer'

const rootReducer=combineReducers({
    listDisplay:listDisplayReducer,
    popUpDisplay:popUpReducer,

})

export default rootReducer;