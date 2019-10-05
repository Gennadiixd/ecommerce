import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Signin from './user/signin';
import Signup from './user/signup';
import Dashboard from './user/userDashboard';
import AdminDashboard from './user/adminDashboard';
import Home from './core/home';
import PrivateRoute from './auth/privateRoute';
import AdminRoute from './auth/adminRoute';
import AddCategory from './admin/addCategory';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <PrivateRoute
                        path="/user/dashboard"
                        exact
                        component={Dashboard}
                    />
                    <AdminRoute
                        path="/admin/dashboard"
                        exact
                        component={AdminDashboard}
                    />
                    <AdminRoute
                        path="/create/category"
                        exact
                        component={AddCategory}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;

