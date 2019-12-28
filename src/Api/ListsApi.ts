import {setUser} from './../reducers/LoginReducer'
import ApiBase,{contentTypeHeader,authHeader} from './ApiBase';
import {addList} from '../reducers/ListReducer';


export const addListApi=(listid:number,listtitle:string,userid:number)=>{
    return (dispatch:any)=>{
        return ApiBase.post('api/lists',{listid:listid,listtitle:listtitle,userid:userid})
        .then(response=>{
            dispatch(addList({listid:listid,listTitle:listtitle}));
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });
    };
};
