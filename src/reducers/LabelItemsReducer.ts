import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {LabelItem} from '../Model/ListModel';
import {boardFacade} from '../store/Repository';

const initialState:LabelItem[]=boardFacade.getLabelItems();

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

