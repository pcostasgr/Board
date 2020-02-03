import ApiBase,{contentTypeHeader,fullHeader} from './ApiBase';
import * as ch  from '../reducers/CardListItemReducer';
import {CardCheckList,CardCheckListItem} from '../Model/ListModel';
import { Dispatch } from 'react';

export interface ICheckListsApi {
    getByCardId:(cardId:number)=>(dispatch:any)=>Promise<void>,
    insertCheckList:(checkList:CardCheckList)=>(dispatch:any)=>Promise<void>,
    updateCheckList:(checkList:CardCheckList)=>(dispatch:any)=>Promise<void>,
    deleteCheckList:(listId:number)=>(dispatch:any)=>Promise<void>

    insertCheckListItem:(item:CardCheckListItem)=>(dispatch:any)=>Promise<void>;
    updateCheckListItem:(item:CardCheckListItem)=>(dispatch:any)=>Promise<void>;
    deleteCheckListItem:(item:CardCheckListItem)=>(dispatch:any)=>Promise<void>;
}

export class CheckListsApiMock
    implements ICheckListsApi {
        constructor() {}

        getByCardId=(cardId:number)=>{
            return (dispatch:any)=>{
                return new Promise((resolve,reject)=>{
                    resolve("Success");
                })
                .then(response=>{
                    dispatch(ch.getCheckLists(cardId));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
        };
        insertCheckList=(checkList:CardCheckList)=>{
            return (dispatch:any)=>{
                return new Promise((resolve,reject)=>{
                    resolve("Success");
                })
                .then(response=>{
                    dispatch(ch.insertCheckList(checkList));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
        };
       
        updateCheckList=(checkList:CardCheckList)=>{
            return (dispatch:any)=>{
                return new Promise((resolve,reject)=>{
                    resolve("Success");
                })
                .then(response=>{
                    dispatch(ch.updateCheckList(checkList));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
        };
        
        deleteCheckList=(listId:number)=>{
            return (dispatch:any)=>{
                return new Promise((resolve,reject)=>{
                    resolve("Success");
                })
                .then(response=>{
                    dispatch(ch.deleteCheckList(listId));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
        };
    
    insertCheckListItem=(item:CardCheckListItem)=>{
         return (dispatch:any)=>{
                return new Promise((resolve,reject)=>{
                    resolve("Success");
                })
                .then(response=>{
                    dispatch(ch.insertCheckListItem(item));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
    };

    updateCheckListItem=(item:CardCheckListItem)=>{
             return (dispatch:any)=>{
                return new Promise((resolve,reject)=>{
                    resolve("Success");
                })
                .then(response=>{
                    dispatch(ch.updateCheckListItem(item));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };    
    };

    deleteCheckListItem=(item:CardCheckListItem)=>{
            return (dispatch:any)=>{
                return new Promise((resolve,reject)=>{
                    resolve("Success");
                })
                .then(response=>{
                    dispatch(ch.deleteCheckListItem(item));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
        };

}

export class CheckListsApi
    implements ICheckListsApi {
        constructor() {}

        getByCardId=(cardId:number)=>{
            return (dispatch:any)=>{
                return ApiBase.get(`api/checklists/cardid/${cardId}`,{headers:fullHeader()})
                    .then(response=>{
                        dispatch(ch.setCheckLists(response.data));
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
            };
        };

        insertCheckList=(checkList:CardCheckList)=>{
            return (dispatch:any)=>{
                return ApiBase.post('api/checklists',checkList,{headers:fullHeader()})
                .then(response=>{
                    var newCheckList=response.data;
                    console.log("id=>" + newCheckList.checklistid);

                    dispatch(ch.insertCheckList({
                        checklistid:newCheckList.checklistid,
                        userid:newCheckList.userid,
                        title:newCheckList.title,
                        items:newCheckList.items,
                        cardid:newCheckList.cardId
                    }));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
        };

        updateCheckList=(checkList:CardCheckList)=>{
            return (dispatch:any)=>{
                return ApiBase.put('api/checklists',checkList,{headers:fullHeader()})
                .then(response=>{
                    dispatch(ch.updateCheckList(checkList));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
        };
        
        deleteCheckList=(listId:number)=>{
            return (dispatch:any)=>{
                return ApiBase.delete(`api/checklists/${listId}`,{headers:fullHeader()})
                .then(response=>{
                    dispatch(ch.deleteCheckList(listId));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
        };
        
        insertCheckListItem=(item:CardCheckListItem)=>{
         return (dispatch:any)=>{
                return ApiBase.post('api/checklistitems',item,{headers:fullHeader()})
                .then(response=>{
                    var newItem=response.data
                    dispatch(ch.insertCheckListItem({
                        clitemid:newItem.clitemid,
                        userid:newItem.userid,
                        checklistid:newItem.checklistid,
                        itemtitle:newItem.itemtitle,
                        ischecked:newItem.ischecked
                    }));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
    };

    updateCheckListItem=(item:CardCheckListItem)=>{
             return (dispatch:any)=>{
                return  ApiBase.put('api/checklistitems',item,{headers:fullHeader()})
                .then(response=>{
                    dispatch(ch.updateCheckListItem(item));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };    
    };

    deleteCheckListItem=(item:CardCheckListItem)=>{
            return (dispatch:any)=>{
                return  ApiBase.delete(`api/checklistitems/${item.clitemid}`,{headers:fullHeader()})
                .then(response=>{
                    dispatch(ch.deleteCheckListItem(item));
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
            };
        };
}
