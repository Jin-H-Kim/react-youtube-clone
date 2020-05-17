import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types'

export default function(preState = {}, action){
    switch (action.type) {
        case LOGIN_USER:
            return ({
                ...preState, 
                loginData: action.payload
            })
            break;
        case REGISTER_USER:
            return ({
                ...preState, 
                registerData: action.payload
            })
        case AUTH_USER:
            return({
                ...preState,
                userData: action.payload
            })
        default:
            return preState
            break;
    }
}