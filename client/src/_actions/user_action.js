import axios from 'axios';
import { LOGIN_USER , REGISTER_USER, AUTH_USER } from './types'

export function loginUser(dataToSubit){
    const req = axios.post('/api/users/login', dataToSubit)
            .then(res => res.data)
    return {
        type: LOGIN_USER,
        payload: req

    }
}

export function registerUser(dataToSubit){
    const req = axios.post('/api/users/register', dataToSubit)
            .then(res => res.data)
    return {
        type: REGISTER_USER,
        payload: req
    }
}

export function auth(){
    const req = axios.get('/api/users/auth')
            .then(res => res.data)
    return {
        type: AUTH_USER,
        payload: req
    }
}