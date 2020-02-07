import {setUser} from '../reducers/LoginReducer'

import ApiBase,{contentTypeHeader,authHeader,fullHeader} from './ApiBase';
import { authenticationService, User } from '../Model/Users';

type LoginUserType={
    username:string,
    password:string 
};


export const loginUser=({username,password}:LoginUserType)=>{
    return (dispatch:any)=>{
        
        return ApiBase.post('users/authenticate',{username:username,password:password},{headers:contentTypeHeader})
        .then(response=>{
            dispatch(setUser(response.data));
        })
        .catch(error => {
            console.log("Error loginUser "+ error);
            console.log(error.response);
        });
    };
};

export const doLoginUser=(username:string,password:string):any=>{
         ApiBase.post('users/authenticate',{username:username,password:password},{headers:contentTypeHeader})
        .then(response=>{
            var user:User=response.data;
            console.log("---------------------------------------------------------------");
            console.log(response.data);
            console.log("var userid=>" + user.userId)
            console.log("---------------------------------------------------------------");
            if(user.userId>0){
                authenticationService.logIn(response.data);
            }
            
        })
        .catch(error => {
            console.log("Error loginUser "+ error);
            console.log(error.response);
        });

}

export const loginGetUsers=()=>{
    return(dispatch:any)=>{
        return ApiBase.get('/users',{headers:fullHeader()})
        .then(response => {
            console.log(response);
        })
        .catch( error=> {
            console.log(error.response);
        });
    };
};