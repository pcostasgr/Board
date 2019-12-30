import {combineReducers} from '@reduxjs/toolkit'
import listDisplayReducer from './ListReducer'
import popUpReducer from './PopUpReducer'
import loginReducer from './LoginReducer'
import CardListItemReducer from './CardListItemReducer';

const rootReducer=combineReducers({
    listDisplay:listDisplayReducer,
    popUpDisplay:popUpReducer,
    loginDisplay:loginReducer,
    cardListDisplay:CardListItemReducer
})

export default rootReducer;