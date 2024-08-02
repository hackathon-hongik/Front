
import { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from "react";
import styled from "styled-components";
import findLogo from "../assets/findLogo.png";
import {bookAPI} from "../api";
import { axiosInstance } from '../api';


export function ChangeNickName(){
    const location = useLocation();
    const token = location.state?.token || '';
    const [nickname,setNickname]=useState("");

    const handleNicknameChange=(e)=>{
        setNickname(e.target.value);
    }

    const change=async ()=>{
        try{
            const response=await axiosInstance.patch('/auth/update-nickname/',{nickname},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response);
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <>
        <input type="text" value={nickname} onChange={handleNicknameChange}></input>
        <button className="changeBtn" onClick={()=>change()}>변경</button>
        </>
    );
}