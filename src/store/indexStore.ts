import {configureStore,applyMiddleware} from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducers';
import {Logger,LoginMid,ListReducerMid} from './../middleware/middleware';
import thunk from 'redux-thunk';

const store=configureStore({reducer:rootReducer
    ,middleware:[Logger,thunk,LoginMid,ListReducerMid]});

export type AppDispatch=typeof store.dispatch;
export default store;
