import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {getComponentDb} from './../store/mockdb'

import * as lm from '../model/ListModel'
import {AddCardPayLoad,DelCardPayload} from './../model/PayLoads'

let initialState:lm.ListDataArray=getComponentDb();
const listDisplaySlice=createSlice(
    {
        name:"listDisplay",
        initialState,
        reducers:{
            addList(state:lm.ListDataArray,action:PayloadAction<string>){
               var maxListId=0;
                if(state.lists.length>0){
                        var maxListId:number=Math.max.apply(Math,state.lists.map((elem)=>{
        
                        return elem.listid
                    }));
                }
                
                var newKey=maxListId+1;
                state.lists.push({
                    listid:newKey,
                    listTitle:action.payload+ newKey,
                    cardData:[]
                });
                
                return state;
            },

            deleteList(state:lm.ListDataArray,action:PayloadAction<number>){
                
                console.log("selIndex",action.payload);
                var listIndex=state.lists.findIndex(
                    (elem)=>{
                        return elem.listid===action.payload;
                    }
                );
                
                if(listIndex !=-1){
                    state.lists.splice(listIndex,1);
                }

                console.log("listIndex Total Lists{1}",listIndex,state.lists.length);
                return state;
            },
            addCard(state:lm.ListDataArray,action:PayloadAction<AddCardPayLoad>){
                var listIndex= state.lists.findIndex( (elem) => {
                    return elem.listid===action.payload.listId
                } );
                
                if(listIndex==-1) return state;

                var dateNow=new Date();

                var cardData=state.lists[listIndex].cardData;

                if(!cardData){
                    cardData=[];
                }
                
                var maxCardId:number=Math.max.apply(Math,state.lists.map((elem)=>{
    
                    var cards:lm.Nullable<lm.CardData[]>=elem.cardData;
                    if(!cards) return 0;

                     return Math.max.apply(Math,cards.map(
                        (cardElem:lm.CardData)=>{return cardElem.id;}
                        ));
                    
                }));
                
                var cardid=maxCardId+1;
                var title=action.payload.cardTitle+ " " + cardid;

                cardData.push({
                            id:cardid,
                            title:title,
                            cardDate:dateNow.toDateString(),
                            listItems:[],
                            labelItems:[]
                });
        

                return state;
            },
            deleteCard(state:lm.ListDataArray,action:PayloadAction<DelCardPayload>){

                var listIndex= state.lists.findIndex( (elem) => {
                    return elem.listid===action.payload.listId
                });
                
                if(listIndex==-1) return state;

                var cardData=state.lists[listIndex].cardData;

                if(cardData){

                    var cardIndex=cardData.findIndex((elem)=>{
                        return elem.id==action.payload.cardId;
                    });
                    
                    if(cardIndex==-1) return state;

                    cardData=cardData.splice(cardIndex,1);

                    return state;
                }
                return state;
                
            }
            ,
        }
    }
)

export const {
    addList,
    deleteList,
    addCard,
    deleteCard
}=listDisplaySlice.actions

export default listDisplaySlice.reducer;