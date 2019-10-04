import React, {useState} from 'react';
import Layout from '../core/layout';
import {Redirect} from 'react-router-dom';
import {signin, setAuthInfo} from '../auth';

export default function Signin() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    })

    const {email, password, error, loading, redirectToReferrer} = values

    const handleChange = (name) => (event) => {
        setValues({
            ...values,
            [name]: event.target.value,
            error: false
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true
        });
        signin({email, password})
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false
                    });
                } else {
                    setAuthInfo(
                        data,
                        () => setValues({
                            ...values,
                            loading: false,
                            redirectToReferrer: true
                        })
                    )
                }
            });
    }

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{display: error ? '' : 'none'}}
        >
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div
                className="alert alert-info"
            >
                LOADING...
        </div>
        )
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/" />
        }
    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    className="form-control"
                    onChange={handleChange('email')}
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    className="form-control"
                    onChange={handleChange('password')}
                    value={password}
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={event => onSubmit(event)}
            >
                Submit
            </button>
        </form>
    )

    return (
        <Layout
            title="Signin"
            description="Node react app"
            className="container col-md-8 offset-md-2"
        >
            {redirectUser()}
            {showError()}
            {showLoading()}
            {signupForm()}
        </Layout>
    )
}
