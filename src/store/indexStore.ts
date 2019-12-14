import {configureStore,applyMiddleware} from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducers';
import {Logger,TestCreateCard} from './../middleware/middleware';


const store=configureStore({reducer:rootReducer
    ,middleware:[Logger]});

export type AppDispatch=typeof store.dispatch;
export default store;
