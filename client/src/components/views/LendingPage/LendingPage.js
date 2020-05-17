import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LendingPage(props) {
    useEffect(() => {
        axios.get('/api/hello')
            .then(res => console.log(res.data))
    }, [])
    const onLogOutHandler = (e) => {
        axios.get('/api/users/logout')
            .then(res => {
                console.log(res.data)
                if(res.data.success){
                    props.history.push('/login')
                }else{
                    alert("로그아웃 실패")
                }
            })
    }
    return (
        <div>
            시작 페이지
            <button onClick={onLogOutHandler}>로그아웃</button>
        </div>
    )
}

export default withRouter(LendingPage)
