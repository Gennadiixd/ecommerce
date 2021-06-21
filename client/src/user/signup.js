import React, {useState} from 'react';
import Layout from '../core/layout';
import {Link} from 'react-router-dom';
import {signup} from '../auth';

export default function Signup() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    })

    const {name, email, password, error, success} = values

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
            error: false
        })
        signup({name, email, password})
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        success: false
                    })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    }

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{display: error ? '' : 'none'}}
        >
            {error}
        </div>
    )

    const showSccuess = () => (
        <div
            className="alert alert-info"
            style={{display: success ? '' : 'none'}}
        >
            New account is created, please <Link to='/signin'>signin</Link>.
        </div>
    )

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange('name')}
                    value={name}
                />
            </div>

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
            title="Signup"
            description="Node react app"
            className="container col-md-8 offset-md-2"
        >
            {showError()}
            {showSccuess()}
            {signupForm()}
        </Layout>
    )
}
