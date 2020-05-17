import React, { useEffect } from 'react';
//import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'

export default function(SpecificComponent, option, adminRoute = null){
    //SpecificComponent == Component
    //option null, true, false
    //null  ==> 아무나 들어올수 있음
    //true  ==> 로그인한 유저만 들어올수 있음
    //false ==> 로그인한 유저는 출입금지(ex - registerpage, login)

    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth())
                .then(res => {console.log(res)
                        //분기처리
                        //로그인 하지 않은 상태
                        if(!res.payload.isAuth){
                            if(option){
                                props.history.push('/login')
                            }
                        }else{
                            //로그인한 상태
                            if(adminRoute && res.payload.isAdmin){
                                props.history.push('/')
                            }else{
                                if(option == false){
                                    props.history.push('/')
                                }
                            }
                        }
                    }
                )
            // Axios.get('/api/users/auth')
            //     .then(res => console.log(res))
           

        }, [])
        return(
            <SpecificComponent {...props} />
        )
    }
    return AuthenticationCheck
}