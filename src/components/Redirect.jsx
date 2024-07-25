
import React, { useEffect } from "react";
import axiosInstance from '../api';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Redirect(){
    const navigate=useNavigate();
    let access_code=new URL(window.location.href).searchParams.get('code');
    console.log(access_code);
    return(
        <p>로그인중입니다</p>
    );  
}