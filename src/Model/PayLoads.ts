import { number } from "prop-types"

export type AddCardPayLoad={
    listId:number,
    cardTitle:string ,
}

export type DelCardPayload={
    listId:number,
    cardId:number
}
