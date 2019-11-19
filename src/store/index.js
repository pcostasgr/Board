import {createStore} from "redux"
import todoApp from './../reducers/reducers';
import {getComponentDb} from './../mockdb';

const store=createStore(todoApp,getComponentDb());

export default store;
