import {createSlice , PayloadAction} from '@reduxjs/toolkit'

const cardSlice=createSlice(
{
    name:"cardPreview",
    initialState:"",
    reducers:{
        getCardDetails(state:string,action:PayloadAction<string>){
            state=action.payload;
            return state;
        }
    }

  })


  export const {
      getCardDetails
  }=cardSlice.actions;

  export default cardSlice.reducer;

