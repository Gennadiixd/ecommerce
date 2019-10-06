import React, {useState, useEffect} from 'react';
import Layout from '../core/layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct} from './apiAdmin'

export default function AddProduct() {
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
    //componentDidMount analog
    useEffect(() => {
        setValues({
            ...values,
            formData: new FormData()
        })
    }, [])

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

    const newPostForm = () => (
        <form className="mb-3">
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
                <textarea
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
                    <option value="Node">Node</option>
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
