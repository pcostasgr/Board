import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {boardFacade} from './../store/Repository'
import * as lm from '../Model/ListModel'
import {AddCardPayload,SelCardPayload} from '../Model/PayLoads'

let initialState:lm.ListDataArray=boardFacade.GetData();

const listDisplaySlice=createSlice(
    {
        name:"listDisplay",
        initialState,
        reducers:{
            getList(state:lm.ListDataArray,action:PayloadAction<lm.ListData[]>){
                return {lists:action.payload,cardData:state.cardData};
            },
            addList(state:lm.ListDataArray,action:PayloadAction<lm.ListData>){
               var maxListId=0;
               var newKey=0;

               if(action.payload.listid<=0) {

                    if(state.lists.length>0){
                            var maxListId:number=Math.max.apply(Math,state.lists.map((elem)=>{
                            return elem.listid
                        }));
                    }
                    
                    newKey=maxListId+1;
                }else{
                    newKey=action.payload.listid;
                }

                state.lists.push({
                    listid:newKey,
                    listTitle:action.payload.listTitle+ newKey
                    ,userid:1
                    ,cardData:[]
                });
                
                return state;
            },
            updateListTitle(state:lm.ListDataArray,action:PayloadAction<{listid:number,listTitle:string}>){
                var listIndex:number=state.lists.findIndex(
                    (elem)=>{
                        return elem.listid===action.payload.listid;
                    }
                );

                if(listIndex<0) return state;
                
                var list=state.lists[listIndex];
                
                list.listTitle=action.payload.listTitle;

                return state;
            },
            deleteList(state:lm.ListDataArray,action:PayloadAction<number>){
                
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
            addCard(state:lm.ListDataArray,action:PayloadAction<AddCardPayload>){

                var listIndex= state.lists.findIndex( (elem) => {
                    return elem.listid===action.payload.listId
                } );
                
                if(listIndex==-1) return state;

                var dateNow=new Date();

                var cardData=state.lists[listIndex].cardData;

                if(!cardData){
                    cardData=[];
                }
                
                var cardid=action.payload.cardid;

                if (cardid<=0) {
                    
                        var maxCardId:number=Math.max.apply(Math,state.lists.map((elem)=>{
        
                        var cards:lm.Nullable<lm.CardData[]>=elem.cardData;
                        if(!cards) return 0;

                        return Math.max.apply(Math,cards.map(
                            (cardElem:lm.CardData)=>{return cardElem.cardid;}
                            ));
                        
                    }));
                    cardid=maxCardId+1;
                }                
                
                var title=action.payload.cardTitle+ " " + cardid;

                cardData.push({
                            cardid:cardid,
                            cardtitle:title,
                            listid:action.payload.listId,
                            userid:action.payload.userid,
                            carddate:dateNow.toDateString(),
                            listItems:[],
                            labelItems:[]
                });
        

                return state;
            },
            deleteCard(state:lm.ListDataArray,action:PayloadAction<SelCardPayload>){

               const [cardIndex,listIndex]=lm.GetCardIndex(action.payload.cardId,state.lists);
                if(cardIndex==-1) { return state; }
                
                var cardData=state.lists[listIndex].cardData;
                cardData=cardData?cardData.splice(cardIndex,1):[];
                return state;
                
            }
            ,
            selectCard(state:lm.ListDataArray,action:PayloadAction<SelCardPayload>){
                
                const [cardIndex,listIndex]=lm.GetCardIndex(action.payload.cardId,state.lists);

                console.log("index:"+cardIndex);

                if(cardIndex==-1) { return state; }
                
                var cardData=state.lists[listIndex].cardData;

                console.log("select Card");
                

                if(cardData){
                console.log(cardData[cardIndex]);
                    return {...state,cardData:cardData[cardIndex]};
                }else{
                    return state;
                }
            },

           updateCard(state:lm.ListDataArray,action:PayloadAction<lm.CardData>){
                const [cardIndex,listIndex]=lm.GetCardIndex(action.payload.cardid,state.lists);
                if(cardIndex==-1) { return state; }                

                var cardData=state.lists[listIndex].cardData;
                               
                if(cardData){
                    var cardDetail=cardData[cardIndex];

                    console.log(
                        "updateCard cardIndex:" + cardIndex + " date:" +action.payload.carddate
                    );

                   
                    var newState=state.lists.map((elem)=>{
                        if(state.lists[listIndex].listid===elem.listid){
                            var newCardState=
                            elem.cardData?
                            elem.cardData.map((cardElem)=>
                            {   
                                if(cardElem.cardid===cardDetail.cardid){
                                    return action.payload
                                }else{
                                    return cardElem
                                }
                            }):[];
                            return {...elem,cardData:newCardState}; 
                        }else{
                            return elem;
                        }
                    })
                    return {lists:newState,cardData:action.payload};
                } else {
                    return state;
                }

                
                
           } 
        }
    }
)

export const {
    getList,
    addList,
    updateListTitle,
    deleteList,
    addCard,
    deleteCard,
    selectCard,
    updateCard
}=listDisplaySlice.actions

export default listDisplaySlice.reducer;