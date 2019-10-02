import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Signin from './user/signin'
import Signup from './user/signup'

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
            </BrowserRouter>
        </div>
    )
}

export default Routes;

