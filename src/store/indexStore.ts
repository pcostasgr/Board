import {configureStore,applyMiddleware} from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducers';
import {getComponentDb} from './mockdb';
import * as lm from '../model/ListModel';
import {Logger,TestCreateCard} from './../middleware/middleware';

const data=getComponentDb();

const store=configureStore({reducer:rootReducer
    ,middleware:[Logger]});

export type AppDispatch=typeof store.dispatch;
export default store;
