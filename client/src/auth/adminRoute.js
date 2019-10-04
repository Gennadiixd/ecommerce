import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index.js';

export default function AdminRoute({component: Component, ...restProps}) {
    const authInfo = isAuthenticated();
    return (
        <Route
            {...restProps}
            render={
                props => authInfo && authInfo.user.role === 1
                    ? (
                        <Component
                            {...props}
                        />
                    )
                    : (
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
