import React from 'react'
import {Route} from 'react-router-dom';
import {authenticationService} from '../Model/Users'
import CardBoard from '../Components/CardBoard';
import Login from '../Components/Login';

class BoardRouter extends Route {
    render() {

        var userid=authenticationService.currentUserValue.userId;
        console.log("router userid:" + userid);
        if(typeof userid==='undefined' || userid==0){
          return <Route exact path='/board' component={Login} />
        }else{
          return <Route exact path='/board' component={CardBoard} />
        }
        
        
    }
}

export default BoardRouter;