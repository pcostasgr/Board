import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {CardCheckList,CardCheckListItem} from '../Model/ListModel';
import {boardFacade} from '../store/Repository';


const getListItemByIdSelector=(state:CardCheckList[],listId:number):number=>{
    
    var index= state.findIndex( (elem) => {
        return elem.checklistid===listId
    } );
    
    return index;
}


const getListDetailItemSelector=(list:CardCheckList,itemId:number):number=>{

    var index= list.items.findIndex( (elem) => {
        return elem.itemListId===itemId
    } );

    return index;
}

const getMaxListSelector=(state:CardCheckList[]):number=>{

    if(state.length==0) return 1;

    var maxItemId:number=Math.max.apply(Math,state.map((elem)=>{
        return elem.checklistid;
    }));
    return maxItemId+1;
}

const getMaxItemSelector=(state:CardCheckList[],item:CardCheckListItem):number=>{

    if(item.itemListId>0) {
        return item.itemListId;
    }

    var maxItemId:number=Math.max.apply(Math,state.map((elem)=>{

        var items=elem.items;

        if(items.length==0) return 0;

        if(!items) return 0;

        return Math.max.apply(Math,items.map(
            (item_:CardCheckListItem)=>{
                return item_.itemListId;
            }
            ));
        
    }));
    return maxItemId+1;
}

const initialState:CardCheckList[]=[];
const cardListItemSlice=createSlice(
{
    name:"cardlistItemDisplay",
    initialState:initialState,
    reducers:{
        getCheckLists(state:CardCheckList[],action:PayloadAction<number>){
            var state_=boardFacade.GetDataCheckList(action.payload);
            console.log("cardlistitemdisplay");
            console.log(state_);
            return state_;
        },
        insertCheckList(state:CardCheckList[],action:PayloadAction<CardCheckList>){

            console.log("Action Check Id:" + action.payload.checklistid);

            var maxCheckListId=action.payload.checklistid<0?
            getMaxListSelector(state)
            :action.payload.checklistid;

            console.log("Max Check Id:" + maxCheckListId);

            state.push(
                    {
                        ...action.payload,
                        checklistid:maxCheckListId,
                        title:"New List" + maxCheckListId,
                    }
            );

            return state;
        },
        deleteCheckList(state:CardCheckList[],action:PayloadAction<number>){
            var index=getListItemByIdSelector(state,action.payload);
            if(index<0) return state;
            var items=state.splice(index,1);
            return state;
        },
        updateCheckList(state:CardCheckList[],action:PayloadAction<CardCheckList>){
            var index=getListItemByIdSelector(state,action.payload.checklistid);
            if(index<0) return state;
            
            state[index]={...state[index],title:action.payload.title};
            return state;
        },
        insertCheckListItem(state:CardCheckList[],action:PayloadAction<CardCheckListItem>){
            var itemId=action.payload.itemListId;

            if(itemId<0){
                itemId=getMaxItemSelector(state,action.payload);
            }

            if(itemId<=0) return state;

            var listIndex=getListItemByIdSelector(state,action.payload.checkListId);
            if(listIndex<0) return state;

            var list=state[listIndex];
            list.items.push({...action.payload,itemListId:itemId,itemTitle:"New Item"+itemId });

            return state;
        },
        deleteCheckListItem(state:CardCheckList[],action:PayloadAction<CardCheckListItem>){
            var listIndex=getListItemByIdSelector(state,action.payload.checkListId);
            if(listIndex<0) return state;

            var list=state[listIndex];

            var index=getListDetailItemSelector(list,action.payload.itemListId);
            if(index<0) return state;

            //console.log("deleted item index:" + index);
            var items=list.items.splice(index,1);

            return state;
        },
        updateCheckListItem(state:CardCheckList[],action:PayloadAction<CardCheckListItem>){
            var listIndex=getListItemByIdSelector(state,action.payload.checkListId);
            if(listIndex<0) return state;

            var list=state[listIndex];

            var index=getListDetailItemSelector(list,action.payload.itemListId);
            if(index<0) return state;

            list.items[index]={...action.payload};

            return state;
        },
    }

  })


  export const {
      getCheckLists,
      insertCheckList,
      updateCheckList,
      deleteCheckList,
      insertCheckListItem,
      deleteCheckListItem,
      updateCheckListItem
  }=cardListItemSlice.actions;

  export default cardListItemSlice.reducer;

