import {configureStore} from '@reduxjs/toolkit'
import rootReducer from '../reducers/rootReducers';

const store=configureStore({reducer:rootReducer});

export type AppDispatch=typeof store.dispatch;
export default store;
