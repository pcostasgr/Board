


export type TVisibility = "hidden" | "visible"
export type Nullable<T> = T | null

export type ListItem={
    item:string
    description?:string
    done:number
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
        lists:ListData[]
        
    }

export type MenuPosType={
    topValue:number;
    leftValue:number;
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