import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {User} from '../Model/Users';

const LoginSlice=createSlice(
{
    name:"Login",
    initialState:{userId:-1,firstName:"",lastName:"",username:"",password:"",token:""},
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

