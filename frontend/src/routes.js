import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Compound from './pages/compound';
import Simple from './pages/simple';



export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/compound' component={Compound}/>
                <Route path='/simple' component={Simple}/>
            </Switch>
        </BrowserRouter>
    )
}