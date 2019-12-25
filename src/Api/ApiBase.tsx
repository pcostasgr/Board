import axios from 'axios';
import {authenticationService} from '../Model/Users';

export default axios.create({
    baseURL:"http://localhost:4000/"
});

export const contentTypeHeader={
    'Content-type':'application/json',
};


export const authHeader=()=> {
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { 'Authorization': `Bearer ${currentUser.token}` };
    } else {
        return { 'Authorization':''};
    }

};