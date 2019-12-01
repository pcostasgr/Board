
export const Logger=(store:any)=>(next:any)=>(action:string)=>{
    console.log("dispatching",action);
    let result=next(action);
    console.log("next state",store.getState());
    return result;
}