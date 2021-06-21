import React, {useState, useEffect} from 'react';
import Layout from '../core/layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct, getCategories} from './apiAdmin';

export default function AddProduct() {
    //componentDidMount analog
    useEffect(() => {
        init();
    }, [])

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData,
    } = values

    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error
                    })
                } else {
                    setValues({
                        ...values,
                        categories: data,
                        formData: new FormData()
                    })
                }
            })
    }

    const {user, token} = isAuthenticated();

    const handleChange = (name) => (event) => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value

        formData.set(name, value)
        setValues({
            ...values,
            error: false,
            [name]: value,
        })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true
        });
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error
                    })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        loading: 'false',
                        createProduct: data.name,
                    })
                }
            })
    }

    const newPostForm = () => (
        <form
            className="mb-3"
            onSubmit={clickSubmit}
        >
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange('photo')}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>

            <div className="form-group">
                <label
                    className="text-muted"
                >
                    Name
                </label>
                <input
                    onChange={handleChange('name')}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label
                    className="text-muted"
                >
                    Description
                </label>
                <textarea
                    onChange={handleChange('description')}
                    type="text"
                    className="form-control"
                    value={description}
                />
            </div>

            <div className="form-group">
                <label
                    className="text-muted"
                >
                    Price
                </label>
                <input
                    onChange={handleChange('price')}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>

            <div className="form-group">
                <label
                    className="text-muted"
                >
                    Category
                </label>
                <select
                    onChange={handleChange('category')}
                    className="form-control"
                >
                    <option value="5d98f967560ca90ea7df927c">Node</option>
                    <option value="5d98f967560ca90ea7df927c">Node</option>
                </select>
            </div>

            <div className="form-group">
                <label
                    className="text-muted"
                >
                    Quantity
                </label>
                <input
                    onChange={handleChange('quantity')}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <div className="form-group">
                <label
                    className="text-muted"
                >
                    Shipping
                </label>
                <select
                    onChange={handleChange('shipping')}
                    className="form-control"
                >
                    <option value="0">
                        No
                    </option>
                    <option value="1">
                        Yes
                    </option>
                </select>
            </div>

            <button
                className="btn btn-outline-primary"
            >
                Create product
            </button>
        </form>
    )

    return (
        <Layout
            title="Add a new Product"
            className="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}
