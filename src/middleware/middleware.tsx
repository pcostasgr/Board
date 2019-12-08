
export const Logger=(store:any)=>(next:any)=>(action:string)=>{
    console.log("dispatching",action);
    let result=next(action);
    console.log("next state",store.getState());
    return result;
}

export const TestCreateCard=(store:any)=>(next:any)=>(action:any)=>{

    console.log("Add Card before dispatching",action.type,action);

    if(action.type!="listDisplay/addCard"){
        return store; 
    }
    console.log("Add Card dispatched",action);
    let result=next(action);
    return result
}