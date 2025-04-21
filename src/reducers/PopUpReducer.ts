import {createSlice , PayloadAction} from '@reduxjs/toolkit'

const popUpSlice=createSlice(
{
    name:"popUpDisplay",
    initialState:"",
    reducers:{
        setPopUpTextTitle(state:string,action:PayloadAction<string>){
            state=action.payload;
            return state;
        }
    }

  })


  export const {
      setPopUpTextTitle
  }=popUpSlice.actions;

  export default popUpSlice.reducer;

