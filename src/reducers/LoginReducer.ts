import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {User} from '../model/Users';

const LoginSlice=createSlice(
{
    name:"Login",
    initialState:{id:0,firstname:"",lastname:"",username:"",password:"",token:""},
    reducers:{
        setUser(state:User,action:PayloadAction<User>){
            state=action.payload;
            return state;
        }
    }

  })


  export const {
      setUser
  }=LoginSlice.actions;

  export default LoginSlice.reducer;

