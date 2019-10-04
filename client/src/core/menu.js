import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#ff9900'}
    } else {
        return {color: '#ffffff'}
    }
}

function Menu({history}) {
    const authInfo = isAuthenticated();
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, '/')}
                        to="/"
                    >
                        Home
                    </Link>
                </li>


                {(authInfo && authInfo.user.role === 1)
                    ? (
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, '/admin/dashboard')}
                                to="/admin/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                    )
                    : (
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, '/user/dashboard')}
                                to="/user/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                    )}

                {!authInfo && (
                    <Fragment>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, '/signup')}
                                to="/signup"
                            >
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, '/signin')}
                                to="/signin"
                            >
                                Signin
                            </Link>
                        </li>
                    </Fragment>
                )}

                {authInfo && (
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{
                                cursor: 'pointer',
                                color: 'white'
                            }}
                            onClick={() => signout(() => {
                                history.push('/')
                            })}
                        >
                            Signout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu)