import { BehaviorSubject } from 'rxjs';

export type User={
    id:number,
    firstname:string,
    lastname:string,
    username:string,
    password:string,
    token:string,
}


const getEmptyUser=():User => {
    return {
        id:0,
        firstname:"",
        lastname:"",
        username:"",
        password:"",
        token:"",
    };
}


const getUserFromStorage=():User => {
    var ls=localStorage.getItem("currentUser");   
    if(ls ==='undefined'){
        return getEmptyUser(); 
    }else{
        return JSON.parse(ls?ls:"");
    } 
};

const currentUserSubject = new BehaviorSubject<User>(getUserFromStorage());


export const authenticationService = {
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    logIn:(user:User)=>{
         localStorage.setItem('currentUser', JSON.stringify(user));
         currentUserSubject.next(user);

         var userValue=getUserFromStorage();
         console.log("user from storage")
         console.log(userValue)
         console.log("user from object");
         console.log(user);
         console.log("-----------------------------------------");
    },
    logOut:()=>{
        localStorage.removeItem('currentUser');
        currentUserSubject.next(getEmptyUser());
    }
};