import { number } from "prop-types"

export type AddCardPayload={
    listId:number,
    cardTitle:string ,
}

export type SelCardPayload={
    listId:number,
    cardId:number
}


