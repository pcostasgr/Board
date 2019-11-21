import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import {getComponentDb} from '../store/mockdb'

type Nullable<T> = T | null

type ListItem={
    item:string
    description?:string
    done:number
}

type LabelItem={
    color:string
    width:number
    height:number
}

type LabelItemRows={
    rows:Nullable<LabelItem[]>
}
type CardData={
    id:number
    title:string
    cardDate:Nullable<string>
    listItems:Nullable<ListItem[]>
    labelItems:Nullable<LabelItemRows[]>
}


type ListData={
    listid:number
    listTitle:string
    cardData:Nullable<CardData[]>
}

type ListDataArray={
    lists:ListData[]
}

let initialState:ListDataArray=getComponentDb();

const listDisplaySlice=createSlice(
    {
        name:"listDisplay",
        initialState,
        reducers:{
            addList(state:ListDataArray,action:PayloadAction<string>){
                let count=state.lists.length+1;
                state.lists.push({
                    listid:count,
                    listTitle:action.payload,
                    cardData:[]
                });
                
                return state;
            }
        }
    }
)

export const {
    addList
}=listDisplaySlice.actions

export default listDisplaySlice.reducer;