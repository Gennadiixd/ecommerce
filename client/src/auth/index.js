import {API} from '../config';

export const signup = (user) => {
    return fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            ...user
        })
    })
        .then(resp => resp.json())
        .catch(console.error)
}