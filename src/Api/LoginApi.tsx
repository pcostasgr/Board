import {setUser} from './../reducers/LoginReducer'
import ApiBase,{contentTypeHeader,authHeader,fullHeader} from './ApiBase';

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
            console.log(error.response);
        });
    };
};

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