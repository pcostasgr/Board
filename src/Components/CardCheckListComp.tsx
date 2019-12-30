import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { CardCheckList, CardCheckListItem } from '../Model/ListModel';
import * as cr from '../reducers/CardListItemReducer';
import { EventEmitter } from 'events';

type CardCheckListCompProps={
    cardid:number,
    lists:any;
    loadDataEvent:(cardId:number)=>void;
    insertItemEvent:(checkListItem:CardCheckListItem)=>void;
    deleteItemEvent:(checkListItem:CardCheckListItem)=>void;
    updateItemEvent:(checkListItem:CardCheckListItem)=>void;
    insertListEvent:(checkList:CardCheckList)=>void;
    deleteListEvent:(checkListId:number)=>void;
    updateListEvent:(checkList:CardCheckList)=>void;
};

const CardCheckListComp=(props:CardCheckListCompProps) => {
    const {cardid,loadDataEvent,insertItemEvent,deleteItemEvent,updateItemEvent,
          insertListEvent,deleteListEvent,updateListEvent}
          =props;

    useEffect(
        () => {
         console.log("useEffect 1");
            loadDataEvent(cardid);
        },[]
    );

    const listData=props.lists.map( (listElem:CardCheckList)=>{
        const key_:string="_"+cardid+"_"+listElem.checkListId+"_"; 

        const itemRows=listElem.items.map((elem:CardCheckListItem)=>{
            
            return <tr>
                    <td>
                        <input type="checkbox" 
                        id={"item"+key_+elem.itemListId} 
                        onChange={(event:any)=>{
                            var elem_={...elem,ischecked:event.target.checked};
                             updateItemEvent(elem_);
                        }}
                        checked={elem.ischecked}
                        value={elem.itemListId}
                        >
                        </input>
                        <textarea id={"textArea"+key_+elem.itemListId} 
                        rows={1} cols={30} 
                        defaultValue={elem.itemTitle}
                        value={elem.itemTitle}
                        onChange={(event:any)=>{
                            var elem_={...elem,itemTitle:event.target.value};
                             updateItemEvent(elem_);
                        }}
                         >
                        </textarea>
                        <button 
                            id={"button" + key_ + elem.itemListId}
                            type="button"
                            onClick={(event:any)=>{
                                var elem_={...elem};
                                deleteItemEvent(elem_);
                            }}
                            value={[elem.itemListId.toString(),elem.checkListId.toString()]}
                        >
                            Delete
                        </button> 
                </td></tr>;
        });

        return <div id={"ChackListDiv"+key_}> 
            <table id={"table"+key_}>
            <tr>
                <td>
                     <textarea id={"ListtextArea"+key_} 
                        rows={1} cols={50} 
                        defaultValue={listElem.checkListTitle}
                        value={listElem.checkListTitle}
                        onChange={(event:any)=>{
                            var elem_={...listElem,checkListTitle:event.target.value};
                             updateListEvent(elem_);
                        }}
                         >
                        </textarea>
                    <button
                    onClick={() => {
                        console.log("Add checklist item");
                        insertItemEvent(
                            {
                                itemListId:-1,
                                itemTitle:"New List Item",
                                ischecked:false,
                                checkListId:listElem.checkListId
                            }
                        );
                }}>Add list item</button>
                 <button
                    onClick={() => {    
                        deleteListEvent(listElem.checkListId);
                }}>Delete list</button>
                </td>
            </tr>
            {itemRows}
            </table>
            </div>;
    });

    

    return <div>
            <button
                onClick={(event)=>{
                    insertListEvent({
                        cardId:cardid,
                        checkListId:-1,
                        checkListTitle:"New List",
                        items:[]
                    });
                }}
            >Create List</button>
            <br></br>
            {listData}
           </div>
};


const mapStateToProps = (state:any) => {
    return {
        lists:state.cardListDisplay
    };
}

function mapDispatchToProps(dispatch:any) {
    return {
        loadDataEvent:(cardId:number)=>{
            dispatch(cr.getCheckLists(cardId))
        },
        insertItemEvent: (checkListItem:CardCheckListItem) => {
            dispatch(cr.insertCheckListItem(checkListItem));
        },
		deleteItemEvent:(checkListItem:CardCheckListItem)=>{
            dispatch(cr.deleteCheckListItem(checkListItem));
		},
		updateItemEvent:(checkListItem:CardCheckListItem)=>{
            dispatch(cr.updateCheckListItem(checkListItem));
        },
        insertListEvent:(checkList:CardCheckList)=>{
            dispatch(cr.insertCheckList(checkList));
        },
        deleteListEvent:(checkListId:number)=>{
            dispatch(cr.deleteCheckList(checkListId));
        },
        updateListEvent:(checkList:CardCheckList)=>{
            dispatch(cr.updateCheckList(checkList));
        },
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CardCheckListComp);