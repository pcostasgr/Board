import ApiBase,{contentTypeHeader,fullHeader} from './ApiBase';
import {addList,getList,updateListTitle,deleteList} from '../reducers/ListReducer';
import { ListDataArray,ListData, CardData} from '../Model/ListModel';
import {getComponentDb,getCheckListsDb,getLabelItemsDb} from '../store/mockdb';
import { Dispatch } from 'react';

export interface ICardApi{
    getByListIdApi:(listId:number)=>(dispatch:any)=>Promise<void>;
    insertCardApi:(listid:number,listtitle:string,userid:number)=>(dispatch:any)=>Promise<void>;
    updateCardApi:(card:CardData)=>(dispatch:any)=>Promise<void>;
    deleteCardApi:(cardId:number)=>(dispatch:any)=>Promise<void>;
}

export class CardApi 
    implements ICardApi{

    constructor() {}


    getByListIdApi=(listId:number)=>{
        return (dispatch:any)=>{
            return ApiBase.get(`api/cards/listid/${listId}`,{headers:fullHeader()})
            .then(response=>{
                //dispatch(getList(response.data));
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };

    insertCardApi=(listid:number,listtitle:string,userid:number)=>{
        return (dispatch:any)=>{
            return ApiBase.post('api/lists',{listid:listid,listtitle:listtitle,userid:userid}
                ,{headers:fullHeader()})
            .then(response=>{
                const newlist:ListData=response.data;
                //dispatch(addList({listid:newlist.listid,listTitle:listtitle,userid:userid,cardData:null}));
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };
   

    updateCardApi=(card:CardData)=>{
        return (dispatch:any)=>{
            return ApiBase.put('api/cards',card,{headers:fullHeader()})
            .then(response=>{
                //dispatch(updateListTitle({listid:list.listid,listTitle:list.listTitle}));
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };

    deleteCardApi=(cardId:number)=>{
        return (dispatch:any)=>{
            return ApiBase.delete(`api/cards/${cardId}`,{headers:fullHeader()})
            .then(response=>{
                //dispatch(deleteList(listId));
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };
}

