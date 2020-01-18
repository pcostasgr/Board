import ApiBase,{contentTypeHeader,authHeader} from './ApiBase';
import {addList,getList} from '../reducers/ListReducer';
import { ListDataArray } from '../Model/ListModel';


export const addListApi=(listid:number,listtitle:string,userid:number)=>{
    return (dispatch:any)=>{
        return ApiBase.post('api/lists',{listid:listid,listtitle:listtitle,userid:userid}
            ,{headers:authHeader()})
        .then(response=>{
            dispatch(addList({listid:listid,listTitle:listtitle}));
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });
    };
};

const initCardData={
    id:-1,
    title:"",
    cardDate:"",
    listItems:[],
    labelItems:[]
};

export const getListByUserApiInit=(userid:number):ListDataArray=>{
    ApiBase.get(`api/lists/userid/${userid}`,{headers:authHeader()})
    .then(response=>{
        return {lists:response.data,cardData:initCardData};
    })
    .catch(error => {
        return {lists:[],cardData:initCardData};
    });

    return {lists:[],cardData:initCardData};
}
export const getListByUserApi=(userid:number)=>{
    return (dispatch:any)=>{
        return ApiBase.get(`api/lists/userid/${userid}`,{headers:authHeader()})
        .then(response=>{
            dispatch(getList(response.data));
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });
    };
};
