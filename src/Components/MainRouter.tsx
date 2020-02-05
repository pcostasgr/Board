import React from 'react';
import {Switch,Route} from 'react-router-dom';
import CardBoard from './CardBoard';
import Login from './Login';
import NotFound from './NotFound';

const MainRouter=()=>(
    <main>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/board' component={CardBoard} />
            <Route path='*' component={NotFound} />
        </Switch>
    </main>
)


export default MainRouter;