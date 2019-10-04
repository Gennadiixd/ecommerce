import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import isAuthenticated from './index.js';

export default function PrivateRoute({component: Component, ...restProps}) {
    return (
        <Route
            {...restProps}
            render={
                props => isAuthenticated() ? (
                    <Component
                        {...props}
                    />
                ) : (
                        <Redirect to={{
                            pathname: '/signin',
                            state: props.location
                        }}
                        />
                    )
            }
        />
    )
}
