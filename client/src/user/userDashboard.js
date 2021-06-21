import React from 'react';
import Layout from '../core/layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom'

export default function Dashboard() {

    const {user: {_id, name, email, role}} = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link
                            to='/cart'
                            className='nav-link'
                        >
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                            to='/profile/update'
                            className='nav-link'
                        >
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User ingormation</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    Name: {name}
                </li>
                <li className="list-group-item">
                    Email: {email}
                </li>
                <li className="list-group-item">
                    Role: {role === 1 ? 'Admin' : 'Registered User'}
                </li>
            </ul>
        </div>
    )

    const purchaseHistory = () => (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    history
                </li>
            </ul>
        </div>
    )

    return (
        <div>
            <Layout
                title="Dashboard"
                description={`Greetings, ${name}!`}
                className="container"
            >
                <div className="row">
                    <div className="col-3">
                        {userLinks()}
                    </div>
                    <div className="col-9">
                        {userInfo()}
                        {purchaseHistory()}
                    </div>
                </div>
            </Layout>
        </div>
    )
}