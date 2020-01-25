import {getComponentDb,getCheckListsDb,getLabelItemsDb} from './mockdb';
import * as lm from '../Model/ListModel';
import { IListApi,ListApi,ListApiMock}  from '../Api/ListsApi';

interface IRepository {
    listApi:IListApi;
    GetData(userId:number):lm.ListDataArray;
    GetCheckListData(cardId:number):lm.CardCheckList[];
    GetLabelItemsData(cardId:number):lm.LabelItem[];
};


class MockRepository 
    implements IRepository {

    private _listApi:IListApi;

    constructor(){
        this._listApi=new ListApiMock();
    }

    get listApi() {
        return this._listApi;
    }

    GetData(userId:number=0){
        return getComponentDb();
    }

    GetCheckListData(cardId:number){
        return getCheckListsDb();
    }

    GetLabelItemsData(cardId:number=0){
        return getLabelItemsDb(cardId);
    }
}

class NetCoreRepository 
    implements IRepository {
    
    private _listApi:IListApi;
    constructor(){
        this._listApi=new ListApi();
    }

    public get listApi() {
        return this._listApi;
    }

    GetData(userId:number=0){
        var response=this.listApi.getListByUserApiInit(userId);
        return response;
    }

    GetCheckListData(cardId:number){
        return getCheckListsDb();
    }

    GetLabelItemsData(cardId:number=0){
        return getLabelItemsDb(cardId);
    }
}

export class StoreFacade {
    private repo:IRepository;
    
    constructor(
        repository:IRepository){
        this.repo=repository;
    }

    public get listApi() {
        return this.repo.listApi;
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

export const  boardFacade=new StoreFacade(new MockRepository());