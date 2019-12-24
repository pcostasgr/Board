import {combineReducers} from '@reduxjs/toolkit'
import listDisplayReducer from './ListReducer'
import popUpReducer from './PopUpReducer'
import loginReducer from './LoginReducer'

const rootReducer=combineReducers({
    listDisplay:listDisplayReducer,
    popUpDisplay:popUpReducer,
    loginDisplay:loginReducer,

})

export default rootReducer;