import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {getComponentDb} from './../store/mockdb'

import * as lm from '../model/ListModel'


/*let initialState:lm.ListDataArray={
    lists:[{
        listid:0,
        listTitle:" ",
        cardData:[]
    }]
};*/

let initialState:lm.ListDataArray=getComponentDb();
const listDisplaySlice=createSlice(
    {
        name:"listDisplay",
        initialState,
        reducers:{
            addList(state:lm.ListDataArray,action:PayloadAction<string>){
                let count=state.lists.length+1;
                state.lists.push({
                    listid:count,
                    listTitle:action.payload,
                    cardData:[]
                });
                
                return state;
            }
        }
    }
)

export const {
    addList
}=listDisplaySlice.actions

export default listDisplaySlice.reducer;