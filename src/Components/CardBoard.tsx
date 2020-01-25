import React from 'react';
import {connect} from 'react-redux';
import './../board.css';
import PopUpDim from './PopUpDim';
import CardDetailView from './CardDetailView';
import CardComponentList from './CardComponentList';
import {selectCard} from '../reducers/ListReducer';
import {setPopUpTextTitle} from '../reducers/PopUpReducer';
import { TVisibility ,MenuPosType, ListData, ListDataArray} from '../Model/ListModel';
import {CardData,CardCheckList} from '../Model/ListModel';
import {loginUser,loginGetUsers} from '../Api/LoginApi';
import {authenticationService} from '../Model/Users'
import store from '../store/indexStore';
import {boardFacade} from './../store/Repository';


type CardBoardProps={
    boardList:ListData[];
    cardDetail:CardData;
    popUpInitialValue:string;
    createNewListEvent:()=>void;
    setPopUpTextTitleEvent:(value:string)=>void;
    showCardDetail:(cardId:number,listId:number)=>void;
    loginUserEvent:(username:string,password:string)=>void;
    getUsersEvent:()=>void;
}

type CardBoardState={
    divPointerEvent:"all" | "none";
    opacity:number;
    editMenuVisibility:TVisibility,
    menuTopValue:number;
    menuLeftValue:number;
    cardListTitle:string;
    cardMenuVisibility:TVisibility;
}

class CardBoard extends React.Component<CardBoardProps,CardBoardState> {

    disableContainer_:(m:MenuPosType,t:any)=>void;
    enableContainer_:(e:any)=>void;
    listContainer:any;
    popup:any;
    selectedListId:number;
    selectedCardId:number;

    constructor(props:CardBoardProps) {
        

        super(props);
        this.disableContainer = this
            .disableContainer
            .bind(this);
        this.enableContainer = this
            .enableContainer
            .bind(this);
        
            this.disableContainer_=this.disableContainer;
            this.enableContainer_=this.enableContainer;
        this.popup={};

        this.state = {
            divPointerEvent: "all",
            opacity: 1,
            editMenuVisibility: "hidden",
            menuTopValue: 100,
            menuLeftValue: 100,
            cardListTitle: "",
            cardMenuVisibility: "hidden"
        }

        this.selectedListId=0;
        this.selectedCardId=0;
    }

     disableContainer(rect:any, componentRef:any) {
        this.listContainer = componentRef;
        this.selectedListId=rect.id;
        this.selectedCardId=rect.cardId;

        this.props.setPopUpTextTitleEvent(rect.data);

        if (this.listContainer.name.localeCompare("CardListContainer") == 0) {
             this.setState({divPointerEvent: "none", opacity: 0.4, editMenuVisibility: "visible",
             menuTopValue: rect.topValue, menuLeftValue: rect.leftValue});
        }

        if (this.listContainer.name.localeCompare("CardComponent") == 0) {
            this.setState({divPointerEvent: "none", opacity: 0.4, 
                cardMenuVisibility: "visible", 
                menuTopValue: rect.topValue, menuLeftValue: rect.leftValue
            });

            this.props.showCardDetail(this.selectedCardId,this.selectedListId);
        }


    }

    enableContainer(e:any) {
       var refresh=false;
       if(e!== ""){
            refresh=true;
       }

       this.setState({divPointerEvent:"all", opacity: 1, editMenuVisibility: "hidden",
         cardMenuVisibility: "hidden"});
         
        if (this.listContainer.name.localeCompare("CardListContainer") == 0 && refresh==true) {
            this
                .listContainer
                .onListTitleChange(e);
        }

        if (this.listContainer.name.localeCompare("CardComponent") == 0) {
            this
                .listContainer
                .onCardMenuEvent(e);
        }

    }

    render() {
        var cardList = this.props.boardList;
        var popup_=this.popup;
        var menuEvent=this.disableContainer_;

        console.log("Rendering All List");

        var listData = cardList.map(function (e) {
            return  <React.Fragment key={"fraglist"+e.listid}>
                    <td id={"tdlist" + e.listid} className="board-table-cell">
                        <CardComponentList
                            key={"CardComponentList"+e.listid}
                            listId={e.listid}
                            listTitle={e.listTitle}
                            menuEvent={menuEvent}
                            data={e}
                            />
                    </td>
                    </React.Fragment>

        }, this);

        //var callbackf_ = this.callbackFunc;
        var topValue = 100;
        var leftValue = 50;
        
        var checkListArr:CardCheckList[]=[{
            checkListId:1000,
            checkListTitle:"List Title",
            cardId:1,
            items:[
                {
                    itemListId:1
                    ,itemTitle:"Title 1"
                    ,ischecked:false
                    ,checkListId:1000
                },
                {
                    itemListId:2
                    ,itemTitle:"Title 2"
                    ,ischecked:true
                    ,checkListId:1000
                },
                {
                    itemListId:3
                    ,itemTitle:"Title 3"
                    ,ischecked:false
                    ,checkListId:1000
                }
            ]
        }];

        /*var cardCheckLists=
            <CardCheckListComp
                    key={"ListComp1"}
                    cardid={1}
                />;*/

        return (
            <div className="list-header">
                <button
                    id="newListButton1"
                    onClick={() => {
                    this
                        .props
                        .createNewListEvent()
                }}>Add new list</button>
                
                <button
                    id="newListButton2"
                    onClick={() => {
                        this.props.loginUserEvent("test","test");
                }}>Post Login</button>
                <button
                    id="newListButton3"
                    onClick={() => {
                        this.props.getUsersEvent();
                }}>Get All Users</button>
                <button
                    id="newListButton4"
                    onClick={() => {
                        authenticationService.logOut();
                }}>Logout</button>
                <button
                    id="Test Api"
                    onClick={() => {
                        console.log("Test Api call");
                        //store.dispatch(addListApi(-1000,"Costas Rules",20));
                        const value=1;
                        const str=`this is some ${value}`;
                        console.log('str:'+str);
                        store.dispatch(boardFacade.listApi.getListByUserApi(1));
                }}>Test Api</button>

                
                {/*{cardCheckLists}*/}

                {<CardDetailView
                    key={"CardDetailView"+this.selectedCardId}
                    selectedListId={this.selectedListId}
                    selectedCardId={this.selectedCardId}
                    visibility={this.state.cardMenuVisibility}
                    callf={this.enableContainer}
                    topValue={this.state.menuTopValue}
                    leftValue={this.state.menuLeftValue}
                />}

                {
                <PopUpDim
                    selectedListId={this.selectedListId}
                    callf={this.enableContainer}
                    visibility={this.state.editMenuVisibility}
                    topValue={this.state.menuTopValue}
                    leftValue={this.state.menuLeftValue}
                />
                }
                <div 
                    style={{
                        pointerEvents:this.state.divPointerEvent,
                        opacity:this.state.opacity,
                    }}>
                    <table>
                    <tbody>
                      <tr>
                      {listData}
                    </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state:any) => {
    //console.log(state);
    return {
        boardList: state.listDisplay.lists,
    };
};

function mapDispatchToProps(dispatch:any) {
    return {
        createNewListEvent: () => {
            const user=authenticationService.currentUserValue;
            dispatch(boardFacade.listApi.insertListApi(-1,"Brand New List",user.userId));
        },



        setPopUpTextTitleEvent:(value:string) =>{
            dispatch(setPopUpTextTitle(value))
        },

        showCardDetail:(cardId:number,listId:number) =>{
            dispatch(selectCard({cardId:cardId,listId:listId}))
        },

        loginUserEvent:(username:string,password:string) =>{
            dispatch(loginUser({username,password}));
        },

        getUsersEvent:()=>{
            dispatch(loginGetUsers());
        },

        logOutUser:()=>{
            dispatch();
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardBoard);
