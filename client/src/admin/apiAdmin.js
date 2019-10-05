import {API} from '../config';

export const createCategory = (userId, token, name) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name
        })
    })
        .then(resp => resp.json())
        .catch(console.error)
}
