import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {CardCheckList,CardCheckListItem} from '../Model/ListModel';

const initialState:CardCheckList[]=[];
const cardListItemSlice=createSlice(
{
    name:"cardlistItemDisplay",
    initialState:initialState,
    reducers:{
        appendCheckList(state:CardCheckList[],action:PayloadAction<CardCheckList>){
            return state;
        },
        deleteCheckList(state:CardCheckList[],action:PayloadAction<CardCheckList>){
            return state;
        },
        appendCheckListItem(state:CardCheckList[],action:PayloadAction<CardCheckListItem>){
            return state;
        },
        deleteCheckListItem(state:CardCheckList[],action:PayloadAction<CardCheckListItem>){
            return state;
        },

    }

  })


  export const {
      appendCheckList,
      deleteCheckList,
      appendCheckListItem,
      deleteCheckListItem
  }=cardListItemSlice.actions;

  export default cardListItemSlice.reducer;

