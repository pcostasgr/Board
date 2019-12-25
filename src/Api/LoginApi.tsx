import ApiBase from './ApiBase';
import {setUser} from './../reducers/LoginReducer'

type LoginUserType={
    username:string,
    password:string 
};

const headers={
    'Content-type':'application/json',
};

export const loginUser=({username,password}:LoginUserType)=>{
    return (dispatch:any)=>{
        
        return ApiBase.post('users/authenticate',{username:username,password:password},{headers:headers})
        .then(response=>{
            dispatch(setUser(response.data));
        })
        .catch(error => {
            console.log(error.response);
        });
    };
};