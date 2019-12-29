import React,{useState} from 'react';
import { CardCheckList } from '../Model/ListModel';

type CardCheckListCompProps={
    cardid:number,
    list:CardCheckList;
};

const CardCheckListComp=(props:CardCheckListCompProps) => {
    const {cardid,list}=props;

    const totalIems:number=list.items.length;

    const checkValueChangedEvent=(event:any)=>{
        console.log(event.target.checked+ " " + event.target.value);
    };

    const textValueChangedEvent=(event:any)=>{
        console.log(event.target.value);
    };

    const onDeleteEvent=(event:any)=>{

    }

    const key_:string="_"+cardid+"_"+list.checkListId+"_"; 

    const itemRows=list.items.map((elem)=>{
        return <tr><td>
                <input type="checkbox" 
                   name={"item"+key_+elem.itemListId} 
                   onChange={checkValueChangedEvent}
                   checked={elem.ischecked}
                   value={elem.itemListId}
                >
                </input>
                <textarea name={"texArea"+key_+elem.itemListId} 

                rows={4} cols={50} onChange={textValueChangedEvent}>{elem.itemTitle}</textarea>
                <button 
                name={"button" + key_ + elem.itemListId}
                type="button"
                onClick={onDeleteEvent}
                value={elem.itemListId}
                >
                    Delete
                </button> 
            </td></tr>;
    });

    return <table>
            <tr>
                <td>{list.checkListTitle}</td>
            </tr>
            {itemRows};
           </table>; 
};

export default CardCheckListComp;