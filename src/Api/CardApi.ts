import ApiBase,{contentTypeHeader,fullHeader} from './ApiBase';
import {addCard,updateCard,deleteCard} from '../reducers/ListReducer';
import { ListDataArray,ListData, CardData} from '../Model/ListModel';

export interface ICardApi{
    getByListIdApi:(listId:number)=>(dispatch:any)=>Promise<void>;
    insertCardApi:(card:CardData)=>(dispatch:any)=>Promise<void>;
    updateCardApi:(card:CardData)=>(dispatch:any)=>Promise<void>;
    deleteCardApi:(listId:number,cardId:number)=>(dispatch:any)=>Promise<void>;
}

export class CardApiMock 
    implements ICardApi{

    constructor() {}

    getByListIdApi=(listId:number)=>{
        return (dispatch:any)=>{
            return new Promise((resolve,reject)=>{
                resolve("Success");
            })
            .then(response=>{
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };

    insertCardApi=(card:CardData)=>{
        return (dispatch:any)=>{
            return new Promise((resolve,reject)=>{
                resolve("Success");
            })
            .then(response=>{
                const newcard:CardData=card;
                dispatch(addCard({
                        cardid:newcard.cardid
                        ,cardTitle:newcard.cardtitle
                        ,userid:newcard.userid
                        ,listId:newcard.listid
                    }));
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };
   

    updateCardApi=(card:CardData)=>{
        return (dispatch:any)=>{
            return  new Promise((resolve,reject)=>{
                resolve("Success");
            })
           .then(response=>{
                dispatch(updateCard(card));
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };

    deleteCardApi=(listId:number,cardId:number)=>{
        return (dispatch:any)=>{
            return new Promise((resolve,reject)=>{
                resolve("Success");
            })
          .then(response=>{
                dispatch(deleteCard({listId,cardId}));
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };
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

    insertCardApi=(card:CardData)=>{
        return (dispatch:any)=>{
            return ApiBase.post('api/cards',card,{headers:fullHeader()})
            .then(response=>{
                console.log(response);
                const newcard:CardData=response.data;
                dispatch(addCard({
                        cardid:newcard.cardid
                        ,cardTitle:newcard.cardtitle
                        ,userid:newcard.userid
                        ,listId:newcard.listid
                    }));
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
                dispatch(updateCard(card));
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };

    deleteCardApi=(listId:number,cardId:number)=>{
        return (dispatch:any)=>{
            return ApiBase.delete(`api/cards/${cardId}`,{headers:fullHeader()})
            .then(response=>{
                dispatch(deleteCard({listId,cardId}));
            })
            .catch(error => {
                console.log(error.response);
            });
        };
    };
}

