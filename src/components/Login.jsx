import { useState } from "react";
import "../css/login.css";
import {useNavigate} from "react-router-dom";

import { axiosInstance } from "../api";



export function Login(){
    const[id,setId]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();


    // const loginMember=async()=>{
    //     try{
    //         const Member={
    //             login_id:id,
    //             login_pw:password,
    //         }
    //         const response=await axiosInstance.post('/login/',Member);
    //         if (response.status === 200) {
    //             navigate("/mypage", { state: { id } });
    //             console.log(response);
    //         }
    //     }
    //     catch(e){
    //         console.log(e);
    //     }
    // }

    const handleIdChange=(e)=>{
        setId(e.target.value);
    }

    const handlePassChange=(e)=>{
        setPassword(e.target.value);
    }

    const handleLoginClick=()=>{
        //loginMember();
    }

        return(
        <div className="loginPage">
            <div className="loginBox">
                <h2 className="textLogin">로그인</h2>
                <div className="inputBox">
                    <input type="text" className="idInput" placeholder="아이디" value={id} onChange={handleIdChange}></input>
                    <input type="text" className="passwordInput" placeholder="비밀번호" value={password} onChange={handlePassChange}></input>
                    <button className="submit" onClick={handleLoginClick}>로그인</button>
                </div>
            </div>
        </div>
        
        );
}