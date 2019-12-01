import React from 'react';
import {connect, useSelector} from 'react-redux';
import './../cardlist.css';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { MuiThemeProvider } from 'material-ui/styles';

import PopUpDim from './PopUpDim';
import CardMenuList from './CardMenuList';
import CardComponentList from './CardComponentList';
import {addList} from '../reducers/ListReducer';
import {setPopUpTextTitle} from '../reducers/PopUpReducer';

import { TVisibility ,MenuPosType, ListData, ListDataArray} from '../model/ListModel';

type CardBoardProps={
    boardList:ListData[];
    popUpInitialValue:string;
    createNewListEvent:()=>void;
    setPopUpTextTitleEvent:(value:string)=>void;
}

type CardBoardState={
    divPointerEvent:"all" | "none";
    opacity:number;
    editMenuVisibility:TVisibility,
    menuTopValue:number;
    menuLeftValue:number;
    cardListTitle:string;
    cardMenuVisibility:TVisibility;
    selectedTitle:string;
}

class CardBoard extends React.Component<CardBoardProps,CardBoardState> {

    disableContainer_:(m:MenuPosType,t:any)=>void;
    enableContainer_:(e:any)=>void;
    listContainer:any;
    popup:any;
    selectedListTitle:string 
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
            cardMenuVisibility: "hidden",
            selectedTitle:""
        }

        this.selectedListTitle="";
        this.selectedListId=0;
        this.selectedCardId=0;
    }

     disableContainer(rect:any, componentRef:any) {
        this.listContainer = componentRef;
        this.selectedListTitle=rect.data;
        this.selectedListId=rect.id;
        this.selectedCardId=rect.cardId;

        this.props.setPopUpTextTitleEvent(this.selectedListTitle);

        if (this.listContainer.name.localeCompare("CardListContainer") == 0) {
             this.setState({divPointerEvent: "none", opacity: 0.4, editMenuVisibility: "visible",
             menuTopValue: rect.topValue, menuLeftValue: rect.leftValue
             ,selectedTitle:this.selectedListTitle});
        }

        if (this.listContainer.name.localeCompare("CardComponent") == 0) {
            this.setState({divPointerEvent: "none", opacity: 0.4, 
            cardMenuVisibility: "visible", 
            menuTopValue: rect.topValue, menuLeftValue: rect.leftValue
        });
        }


    }

    enableContainer(e:any) {

       this.selectedListTitle=e;

       this.setState({divPointerEvent:"all", opacity: 1, editMenuVisibility: "hidden",
         cardMenuVisibility: "hidden"});
         
        if (this.listContainer.name.localeCompare("CardListContainer") == 0) {
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
        var listData = cardList.map(function (e) {
            return <td id={"tdlist" + e.listid} className="board-table-cell">

                <div className="card-list-head">
                   
                        <CardComponentList
                            listId={e.listid}
                            listTitle={e.listTitle}
                            menuEvent={menuEvent}
                            data={e}
                            />
                 
                </div>

            </td>

        }, this);

        //var callbackf_ = this.callbackFunc;
        var topValue = 100;
        var leftValue = 50;
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
                    this
                        .props
                        .setPopUpTextTitleEvent("List Title")
                }}>Add new list</button>


                <CardMenuList
                    selectedListId={this.selectedListId}
                    selectedCardId={this.selectedCardId}
                    visibility={this.state.cardMenuVisibility}
                    callf={this.enableContainer}
                    topValue={this.state.menuTopValue}
                    leftValue={this.state.menuLeftValue}
                />

                <PopUpDim
                    selectedListId={this.selectedListId}
                    callf={this.enableContainer}
                    visibility={this.state.editMenuVisibility}
                    topValue={this.state.menuTopValue}
                    leftValue={this.state.menuLeftValue}
                />

                <div>
                    <table
                        className="board-header-table"
                        style={{
                        pointerEvents:this.state.divPointerEvent,
                        opacity: this.state.opacity
                    }}>
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
        //popUpInitialValue:state.popUpDisplay
    };
};

function mapDispatchToProps(dispatch:any) {
    return {
        createNewListEvent: () => {
            dispatch(addList("Brand New List"))
        },

        setPopUpTextTitleEvent:(value:string) =>{
            dispatch(setPopUpTextTitle(value))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardBoard);
