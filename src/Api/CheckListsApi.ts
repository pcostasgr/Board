import ApiBase,{contentTypeHeader,fullHeader} from './ApiBase';
import * as ch  from '../reducers/CardListItemReducer';
import {CardCheckList,CardCheckListItem} from '../Model/ListModel';

export interface ICheckListsApi {
    getByCardId:(cardId:number)=>(dispatch:any)=>Promise<void>,
    insertCheckList:(checkList:CardCheckList)=>(dispatch:any)=>Promise<void>,
    updateCheckList:(checkList:CardCheckList)=>(dispatch:any)=>Promise<void>,
    deleteCheckList:(listId:number)=>(dispatch:any)=>Promise<void>
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
}
