import { BehaviorSubject } from 'rxjs';

export type User={
    userId:number,
    firstName:string,
    lastName:string,
    username:string,
    password:string,
    token:string,
}


const getEmptyUser=(userid:number):User => {
    return {
        userId:userid,
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        token:"",
    };
}


const getUserFromStorage=():User => {
    var ls=localStorage.getItem("currentUser");   
    if(ls ==='undefined'){
        return getEmptyUser(-1); 
    }else{
        return JSON.parse(ls?ls:"{}");
    } 
};

const currentUserSubject = new BehaviorSubject<User>(getUserFromStorage());


export const authenticationService = {
    currentUser: currentUserSubject.asObservable(),
    clearUser:()=>{
        currentUserSubject.next(getEmptyUser(0));
        localStorage.removeItem('currentUser');
    },
    get getDummyUser() { return getEmptyUser(-1); },
    get currentUserValue () { return currentUserSubject.value },
    logIn:(user:User)=>{
         localStorage.setItem('currentUser', JSON.stringify(user));
         currentUserSubject.next(user);

         var userValue=getUserFromStorage();
         console.log("user from storage")
         console.log(userValue)
         console.log("user from object");
         console.log(user);
         console.log("user from observable");
         console.log(currentUserSubject.value);
         console.log("-----------------------------------------");
    },
    logOut:()=>{
        localStorage.removeItem('currentUser');
        currentUserSubject.next(getEmptyUser(0));
    }
};