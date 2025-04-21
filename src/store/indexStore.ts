import {configureStore,applyMiddleware, Middleware} from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducers';
import {Logger,LoginMid,ListReducerMid} from './../middleware/middleware';
import thunk from 'redux-thunk';



const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
        }).concat(
            Logger as Middleware<{}, ReturnType<typeof rootReducer>>,
            // Removed redundant thunk middleware
            LoginMid as Middleware<{}, ReturnType<typeof rootReducer>>,
            ListReducerMid as Middleware<{}, ReturnType<typeof rootReducer>>
        ),
});

export type AppDispatch=typeof store.dispatch;
export default store;
