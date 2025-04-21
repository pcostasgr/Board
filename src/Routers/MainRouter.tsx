import React from 'react';
import {Routes, Route} from 'react-router-dom';
import CardBoard from '../Components/CardBoard';
import Login from '../Components/Login';
import NotFound from '../Components/NotFound';
import BoardRouter from './BoardRouter';

const MainRouter=()=>(

        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/board/*' element={<BoardRouter />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
);


export default MainRouter;