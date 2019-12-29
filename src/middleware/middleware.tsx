import { authenticationService } from "../Model/Users";

export const Logger=(store:any)=>(next:any)=>(action:string)=>{
    console.log("dispatching",action);
    let result=next(action);
    console.log("next state",store.getState());
    return result;
}

export const ListReducerMid=(store:any)=>(next:any)=>(action:any)=>{

    console.log("Add Card before dispatching",action.type,action);

    var action_={...action};

    /*if(action.type=='listDisplay/addList'){
        action_.payload.listTitle="NEW SUPER LIST";
    }*/

    let result=next(action_);

    return result;
}


export const LoginMid=(store:any)=>(next:any)=>(action:any)=>{

    let result=next(action);
    
    if(action.type==='Login/setUser'){
        authenticationService.logIn(result.payload);
    }
   
    return result;
}