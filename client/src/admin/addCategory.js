import React, {useState} from 'react';
import Layout from '../core/layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin'

export default function AddCategory() {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const handleChange = (event) => {
        setError(false);
        setSuccess(false);
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false);
        setSuccess(false);
        createCategory(user._id, token, name)
            .then(data => {
                if (data.error) {
                    setError(true);
                } else {
                    setError(false);
                    setSuccess(true);
                }
            })
    }

    const showSuccess = () => {
        if (success) {
            return (
                <h3 className="text-success">{name} is successfully created</h3>
            )
        }
    }
    const showError = () => {
        if (error) {
            return (
                <h3 className="text-danger">
                    {name} already existis,<br /> shuld be unique
                </h3>
            )
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    )

    const newCategoryForm = () => (
        <form
            onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                />
            </div>
            <button className="btn btn-outline-primary">
                Create Category
            </button>
        </form>
    );

    return (
        <Layout
            title="Add a new Category"
            className="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}
