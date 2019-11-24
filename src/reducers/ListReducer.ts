import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {getComponentDb} from './../store/mockdb'

import * as lm from '../model/ListModel'
import {AddCardPayLoad} from './../model/PayLoads'

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
            },
            addCard(state:lm.ListDataArray,action:PayloadAction<AddCardPayLoad>){
                var found= state.lists.findIndex( elem => {
                    return elem.listid==action.payload.listId
                } );
                
                var dateNow=new Date();

                if(found==-1) return state;

                var cardData=state.lists[found].cardData;

                if(!cardData){
                    cardData=[];
                }

               var cardid=cardData.length+1;

                cardData.push({
                            id:cardid,
                            title:action.payload.cardTitle,
                            cardDate:dateNow.toDateString(),
                            listItems:[],
                            labelItems:[]
                });
        

                return state;
            },
        }
    }
)

export const {
    addList,
    addCard
}=listDisplaySlice.actions

export default listDisplaySlice.reducer;