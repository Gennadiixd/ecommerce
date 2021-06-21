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
import AddProduct from './admin/addProduct';

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
                        Component={Dashboard}
                    />
                    <AdminRoute
                        path="/admin/dashboard"
                        exact
                        Component={AdminDashboard}
                    />
                    <AdminRoute
                        path="/create/category"
                        exact
                        component={AddCategory}
                    />
                    <AdminRoute
                        path="/create/product"
                        exact
                        component={AddProduct}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;

