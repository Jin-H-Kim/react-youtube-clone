import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
    //console.log(props)
    const dispath = useDispatch();

    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const onEmailHandler = (e) => {
        setEmail(e.target.value)
    }
    const onNameHandler = (e) => {
        setName(e.target.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    }

    const onRegisterHandler = (e) => {
        e.preventDefault();
        if(Password !== ConfirmPassword){
            return alert('비밀번호가 일치 하지 않습니다.')
        }
        const body = {
            email: Email,
            name: Name,
            password: Password
        }
        // axios.post('/api/users/register', body)
        //     .then(res => console.log(res.data))
        
        //Redux 이용하기
        
        dispath(registerUser(body))
            .then(res => {
                //console.log(res)
                if(res.payload.success){
                    props.history.push('/login')
                }else{
                    alert('회원가입 실패')
                }
            })

        //console.log(body)
    }
    return (
        <div>
            <form onSubmit={onRegisterHandler}>
                <label>email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <br />
                <label>name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <br />
                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <label>confirm password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button>회원가입</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
