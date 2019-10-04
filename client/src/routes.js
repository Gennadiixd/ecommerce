import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Signin from './user/signin';
import Signup from './user/signup';
import Dashboard from './user/userDashboard';
import Home from './core/home';
import PrivateRoute from './auth/privateRoute';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <PrivateRoute path="/dashboard" exact component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;

