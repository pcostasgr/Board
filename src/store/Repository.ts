import {getComponentDb,getCheckListsDb,getLabelItemsDb} from './mockdb';
import * as lm from '../Model/ListModel';
import {getListByUserApiInit}  from '../Api/ListsApi';

interface IRepository {
    GetData(userId:number):lm.ListDataArray;
    GetCheckListData(cardId:number):lm.CardCheckList[];
    AddList(list:lm.ListData):{status:number,errmsg:string};
    AddCard(card:lm.CardData):{status:number,errmsg:string };
    UpdateCard(card:lm.CardData):{status:number,errmsg:string};
    DeleteCard(cardId:number):{status:number,errmsg:string};
    DeleteList(listId:number):{status:number,errmsg:string};
    GetLabelItemsData(cardId:number):lm.LabelItem[];
};


class MockRepository 
    implements IRepository {

    constructor(){}

    GetData(userId:number=0){
        return getComponentDb();
    }

    GetCheckListData(cardId:number){
        return getCheckListsDb();
    }

    AddList(list:lm.ListData){
        var errmsg:string="OK";
        var status:number=0;
        return {status,errmsg};
    }
    
    AddCard(card:lm.CardData){
        var errmsg:string="OK";
        var status:number=0;
        return {status,errmsg};
    }

    UpdateCard(card:lm.CardData){
        var errmsg:string="OK";
        var status:number=0;
        return {status,errmsg};
    }

    DeleteCard(cardId:number){
        var errmsg:string="OK";
        var status:number=0;
        return {status,errmsg};
    }

    DeleteList(listId:number){
        var errmsg:string="OK";
        var status:number=0;
        return {status,errmsg};
    }

    GetLabelItemsData(cardId:number=0){
        return getLabelItemsDb(cardId);
    }
}

class NetCoreRepository 
    implements IRepository {

    constructor(){}

    GetData(userId:number=0){
        var response=getListByUserApiInit(userId);
        return response;
    }

    GetCheckListData(cardId:number){
        return getCheckListsDb();
    }

    AddList(list:lm.ListData){
        var errmsg:string="OK";
        var status:number=0;
        return {status,errmsg};
    }
    
    AddCard(card:lm.CardData){
        var errmsg:string="OK";
        var status:number=0;
        return {status,errmsg};
    }

    UpdateCard(card:lm.CardData){
        var errmsg:string="OK";
        var status:number=0;
        return {status,errmsg};
    }

    DeleteCard(cardId:number){
        var errmsg:string="OK";
        var status:number=0;
        return {status,errmsg};
    }

    DeleteList(listId:number){
        var errmsg:string="OK";
        var status:number=0;
        return {status,errmsg};
    }

    GetLabelItemsData(cardId:number=0){
        return getLabelItemsDb(cardId);
    }
}

export class StoreFront {
    repo:IRepository;
    constructor(repository:IRepository){
        this.repo=repository;
    }

    GetData(userId:number=0){
        return this.repo.GetData(userId);    
    }

    GetDataCheckList(cardId:number){
        return this.repo.GetCheckListData(cardId);
    }

    getLabelItems(cardId:number=0){
        return this.repo.GetLabelItemsData(cardId);
    }
}

export const  boardRepo=new StoreFront(new MockRepository());