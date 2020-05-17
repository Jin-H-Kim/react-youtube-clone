import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action'
//import { withRouter } from 'react-router-dom'

function LoginPage(props) {
    //console.log(props)
    const dispatch = useDispatch()

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const onEmailHandler = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const onLoginHandler = (e) => {
        e.preventDefault();
        const body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))//액션 이름에 넣기
            .then(res => {
                console.log(res)
                if(res.payload.loginSuccess){
                    props.history.push('/')
                }else{
                    alert('Login Error')
                }
            })
        // axios.post('/api/users/login', body)
        //     .then(res => {
        //         console.log(res.data)
        //         if(res.data.loginSuccess === true){
        //             console.log("HI")
        //         }else{
        //             console.log("Check ID")
        //         }
        //     })
        
    }

    return (
        <div>
            <form onSubmit={onLoginHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}  />
                <br />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>LOGIN</button>
            </form>
        </div>
    )
}

export default LoginPage
