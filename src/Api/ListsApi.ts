import ApiBase,{contentTypeHeader,fullHeader} from './ApiBase';
import {addList,getList,updateListTitle,deleteList} from '../reducers/ListReducer';
import { ListDataArray,ListData} from '../Model/ListModel';
import {getComponentDb,getCheckListsDb,getLabelItemsDb} from '../store/mockdb';
import { resolve } from 'dns';



const initCardData={
    cardid:-1,
    cardtitle:"",
    carddate:"",
    listid:0,
    userid:-1,
    listItems:[],
    labelItems:[]
};

export interface IListApi{
    //getListByUserApiInitP:(userid:number)=>Promise<ListDataArray>;
    getListByUserApiInit:(userid:number)=>ListDataArray;
    getListByUserApi:(userid:number)=>(dispatch:any)=>Promise<void>;
    insertListApi:(listid:number,listtitle:string,userid:number)=>(dispatch:any)=>Promise<void>;
    updateListApi:(list:ListData)=>(dispatch:any)=>Promise<void>;
    deleteListApi:(listId:number)=>(dispatch:any)=>Promise<void>;
}

export class ListApiMock 
    implements IListApi{

    constructor() {}

   /* getListByUserApiInitP=(userid:number):Promise<ListDataArray>=>{
        return new Promise( (resolve,reject) =>{
                resolve(getComponentDb());
            });
    }*/

    getListByUserApiInit=(userid:number):ListDataArray=>{
        return getComponentDb();
    }

    getListByUserApi=(userid:number)=>{
        return (dispatch:any)=>{
                return new Promise(()=>{})
                .then(()=>{
                    var db=getComponentDb().lists;
                    dispatch(getList(db));  
                })
        };
    };

    
    insertListApi=(listid:number,listtitle:string,userid:number)=>{
        return (dispatch:any)=>{
                    console.log('1 insertListApi Promise');
                return new Promise((resolve,reject)=>{
                    console.log('2 insertListApi Promise');
                    resolve('Sucess');
                })
                .then(result=>{
                    dispatch(addList({listid:listid,listTitle:listtitle,userid:userid,cardData:null}));
                })
        };
    };

    updateListApi=(list:ListData)=>{
        return (dispatch:any)=>{
                return new Promise((resolve,reject)=>{
                    resolve('Success');
                })
                .then(result=>{
                    dispatch(updateListTitle({listid:list.listid,listTitle:list.listTitle}));
                })
        };
    };

    deleteListApi=(listId:number)=>{
        return (dispatch:any)=>{
                return new Promise((resolve,reject)=>{
                    resolve('Success');
                })
                .then(result=>{
                    dispatch(deleteList(listId));
                })
        };
    };
}

export class ListApi 
    implements IListApi{

    constructor() {}


    getListByUserApiInit=(userid:number) :ListDataArray=>{
        var data:ListDataArray={lists:[],cardData:initCardData};
        return data;
            
    }

    getListByUserApi=(userid:number)=>{
        return (dispatch:any)=>{
            return ApiBase.get(`api/lists/userid/${userid}`,{headers:fullHeader()})
            .then(response=>{
                dispatch(getList(response.data));
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };

    insertListApi=(listid:number,listtitle:string,userid:number)=>{
        return (dispatch:any)=>{
            return ApiBase.post('api/lists',{listid:listid,listtitle:listtitle,userid:userid}
                ,{headers:fullHeader()})
            .then(response=>{
                const newlist:ListData=response.data;
                dispatch(addList({listid:newlist.listid,listTitle:listtitle,userid:userid,cardData:null}));
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };
   

    updateListApi=(list:ListData)=>{
        return (dispatch:any)=>{
            return ApiBase.put('api/lists',list,{headers:fullHeader()})
            .then(response=>{
                dispatch(updateListTitle({listid:list.listid,listTitle:list.listTitle}));
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };

    deleteListApi=(listId:number)=>{
        return (dispatch:any)=>{
            return ApiBase.delete(`api/lists/${listId}`,{headers:fullHeader()})
            .then(response=>{
                dispatch(deleteList(listId));
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };
}
