import {configureStore} from '@reduxjs/toolkit'
import rootReducer from '../reducers/rootReducers';
import {getComponentDb} from './mockdb'
import * as lm from '../model/ListModel'

const data=getComponentDb();

const store=configureStore({reducer:rootReducer});

export type AppDispatch=typeof store.dispatch;
export default store;
