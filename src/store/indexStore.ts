import {configureStore,applyMiddleware} from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducers';
import {Logger,LoginMid,TestCreateCard} from './../middleware/middleware';
import thunk from 'redux-thunk';

const store=configureStore({reducer:rootReducer
    ,middleware:[Logger,thunk,LoginMid]});

export type AppDispatch=typeof store.dispatch;
export default store;
