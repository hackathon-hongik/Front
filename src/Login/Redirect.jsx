
import React, { useEffect } from "react";
import {axiosInstance} from '../api';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Redirect(){
    const navigate=useNavigate();
    let access_code=new URL(window.location.href).searchParams.get('code');
    console.log(access_code);

    useEffect(() => {
        const sendCode = async (access_code) => {
            try {
                const response = await axiosInstance.post('/auth/kakao/login', {access_code:access_code});
                console.log(response);
                navigate('/afterlogin');
            }
            catch (error) {
                if (error.response && error.response.status === 404) {
                    // 404 에러 발생 시 Join으로 리디렉션
                    navigate('/join', { state: { access_code: access_code } });
                } else {
                    console.log(error);
                }
               
            }
        };
    
        sendCode(access_code);

    }, []);

    return(
        <p>로그인중입니다</p>
    );  
}