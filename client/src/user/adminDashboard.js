import React from 'react';
import Layout from '../core/layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';

export default function AdminDashboard() {

    const {user: {_id, name, email, role}} = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link
                            to='/create/category'
                            className='nav-link'
                        >
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                            to='/create/product'
                            className='nav-link'
                        >
                            Create Product
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => (
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

    return (
        <div>
            <Layout
                title="Dashboard"
                description={`Greetings, ${name}!`}
                className="container"
            >
                <div className="row">
                    <div className="col-3">
                        {adminLinks()}
                    </div>
                    <div className="col-9">
                        {adminInfo()}
                    </div>
                </div>
            </Layout>
        </div>
    )
}