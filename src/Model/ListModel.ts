


export type TVisibility = "hidden" | "visible"
export type Nullable<T> = T | null

export type ListItem={
    item:string
    description?:string
    done:number
}

export type CardCheckListItem={
    itemListId:number,
    itemTitle:string,
    ischecked:boolean,
    checkListId:number,
}

export type CardCheckList={
    checkListId:number,
    checkListTitle:string,
    cardId:number,
    items:CardCheckListItem[]
}


export type LabelItem={
    color:string
    width:number
    height:number
}

export type LabelItemRows={
    rows:Nullable<LabelItem[]>
}

export type CardData={
    id:number
    title:string
    cardDate:Nullable<string>
    listItems:Nullable<ListItem[]>
    labelItems:Nullable<LabelItemRows[]>
}


export type ListData={
    listid:number
    listTitle:string
    cardData:Nullable<CardData[]>
}

export type ListDataArray={
    lists: ListData[]
    cardData: CardData
}

export type MenuPosType={
    topValue:number;
    leftValue:number;
    id:number;
    cardId:number;
    data:any;
}
    
/*Normalized Types*/ 
    export type ListHeaderNorm={
        listid:number
        listTitle:string
        cardData:Nullable<number[]>
    }

    export type CardDataNorm={
        id:number
        title:string
        cardDate:Nullable<string>
        listItems:Nullable<number[]>
        labelItems:Nullable<LabelItemRowNorm[]>
    }

    export type ListItemsNorm={
        item:number
        description?:string
        done:number
    }

    export type LabelItemRowNorm={
        labelItem:number[]
    }
    export type LabelItemNorm={
        id:number
        color:string
        width:number
        height:number
    }

//helper functions
export function GetCardIndex(cardId:number,listData:ListData[]){

    var cardIndex=-1;
    var listIndex=-1;
    var element;
    for(var i=0;i<listData.length;i++){
        element=listData[i];
        cardIndex=element.cardData?
        element.cardData.findIndex((elem)=>{
            return elem.id===cardId;
        })
        :-1;

        if(cardIndex!=-1) { 
            listIndex=i;
            break; 
        }
    }
    return [cardIndex,listIndex];
}
