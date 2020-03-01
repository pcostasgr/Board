import React from 'react';
import {Switch,Route} from 'react-router-dom';
import CardBoard from '../Components/CardBoard';
import Login from '../Components/Login';
import NotFound from '../Components/NotFound';
import BoardRouter from './BoardRouter';

const MainRouter=()=>(
    <main>
        <Switch>
            <Route exact path='/' component={Login} />
            <BoardRouter exact path='/board' component={CardBoard}  />
            <Route path='*' component={NotFound} />
        </Switch>
    </main>
)


export default MainRouter;