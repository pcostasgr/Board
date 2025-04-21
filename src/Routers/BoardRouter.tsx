import React from 'react'
import {Routes,Route} from 'react-router-dom';
import {authenticationService} from '../Model/Users'
import CardBoard from '../Components/CardBoard';
import Login from '../Components/Login';

const BoardRouter: React.FC = () => {
    const userid = authenticationService.currentUserValue.userId;
    console.log("router userid:" + userid);

    if (typeof userid === 'undefined' || userid === 0) {
        return  <Routes> <Route path='/' element={<Login />} /> </Routes>
    } else {
        console.log("Go to board");
        return <Routes><Route path='/' element={<CardBoard popUpInitialValue="" />} /> </Routes>;
    }

};

export default BoardRouter;