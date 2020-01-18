import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {LabelItem} from '../Model/ListModel';
import {boardRepo} from '../store/Repository';

const initialState:LabelItem[]=boardRepo.getLabelItems();

const labelItemsSlice=createSlice(
{
    name:"labelItemsDisplay",
    initialState:initialState,
    reducers:{
        getLabelItems(state:LabelItem[],action:PayloadAction<number>){
            return state
        }
    }

  })


  export const {
      getLabelItems
  }=labelItemsSlice.actions;

  export default labelItemsSlice.reducer;

