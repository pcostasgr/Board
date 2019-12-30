import {getComponentDb,getCheckListsDb} from './mockdb';
import * as lm from '../Model/ListModel';

interface IRepository {
    GetData():lm.ListDataArray;
    GetCheckListData(cardId:number):lm.CardCheckList[];
    AddList(list:lm.ListData):{status:number,errmsg:string};
    AddCard(card:lm.CardData):{status:number,errmsg:string };
    UpdateCard(card:lm.CardData):{status:number,errmsg:string};
    DeleteCard(cardId:number):{status:number,errmsg:string};
    DeleteList(listId:number):{status:number,errmsg:string};
};


class MockRepository 
    implements IRepository {

    constructor(){}

    GetData(){
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

}


export class StoreFront {
    repo:IRepository;
    constructor(repository:IRepository){
        this.repo=repository;
    }

    GetData(){
        return this.repo.GetData();    
    }

    GetDataCheckList(cardId:number){
        return this.repo.GetCheckListData(cardId);
    }
}

export const  boardRepo=new StoreFront(new MockRepository());