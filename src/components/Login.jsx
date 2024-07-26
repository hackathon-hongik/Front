import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { axiosInstance } from "../api";
import styled from "styled-components";
import kakao from "./kakaoLogin_pic.png";

const LoginPage=styled.div`
    width:1620px;
    height:900px;
    display:flex;
    flex-direction:row;
    margin:auto;

    .orangeX{
        width:800px;
        height:930px;
        background-color:#FF6E23;

        .Btn{
            width:80px;
            height:80px;
            border-radius: 8px;
            background: #FFF;
            margin:64px;
        }
    }
    
    .realLogin{
        width:820px;
        height:900px;
        display:flex;
        flex-direction:column;
        align-items:center;

        p{
            color: var(--kakao-logo, #000);
            text-align: center;
            font-feature-settings: 'ss10' on;
            /* Title 2/Bold */
            font-family: "Pretendard JP";
            font-size: 28px;
            font-style: normal;
            font-weight: 700;
            line-height: 135.8%; /* 38.024px */
            letter-spacing: -0.661px;
            margin-top:120px;
        }

        .kakaoLoginBtn{
            width:400px;
            height:64px;
            margin-top:20px;
            background-color:white;
        }

        .text1{
            height:80px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            /*background-color: #808080;*/

            .line{
                width: 110px;
                height: 1px;
                flex-shrink: 0;
                background-color: #808080;
                margin-top: 60px;
            }

            p{
                color: #808080;
                text-align: center;
                /* Headline 1/Medium */
                font-family: "Pretendard JP";
                font-size: 18px;
                font-style: normal;
                font-weight: 500;
                line-height: 144.5%; /* 26.01px */
                letter-spacing: -0.004px;
                margin-top:47px;
            }
        }

        .idInput{
            width: 400px;
            height: 64px;
            border-radius: 8px;
            border: 2px solid #FF6E23;
            background: #FFF;
            margin-top: 20px;
        }

        .pwInput{
            width: 400px;
            height: 64px;
            border-radius: 8px;
            border: 2px solid #FF6E23;
            background: #FFF;
            margin-top: 20px;
        }

        .loginBtn{
            display: flex;
            width: 400px;
            height: 64px;
            padding: 18px 174px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
            border-radius: 8px;
            background: #FF6E23;
            margin-top:40px;
        }

        .textBtn{
            display:flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width:400px;
            height:10px;
            
            p{
                color: #808080;
                text-align: center;
                /* Headline 1/Regular */
                font-family: "Pretendard JP";
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: 144.5%;
                letter-spacing: -0.004px;
            }

            .gotoJoinBtn{
                color: #808080;
                /* Headline 1/Bold */
                font-family: "Pretendard JP";
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                line-height: 144.5%;
                letter-spacing: -0.004px;
                cursor:pointer;
            }
        }
    }

`;

export function Login(){
    const[id,setId]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();

    const Rest_api_key=process.env.REACT_APP_KAKAO_API_KEY;
        const redirect_uri=process.env.REACT_APP_KAKAO_REDIRECT_URI;

        const kakaoURL= `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

        const handleLogin=()=>{
            window.location.href=kakaoURL;
        };


    // // const loginMember=async()=>{
    // //     try{
    // //         const Member={
    // //             login_id:id,
    // //             login_pw:password,
    // //         }
    // //         const response=await axiosInstance.post('/login/',Member);
    // //         if (response.status === 200) {
    // //             navigate("/mypage", { state: { id } });
    // //             console.log(response);
    // //         }
    // //     }
    // //     catch(e){
    // //         console.log(e);
    // //     }
    // // }

    const handleIdChange=(e)=>{
         setId(e.target.value);
     }

    const handlePwChange=(e)=>{
        setPassword(e.target.value);
    }

    // const handleLoginClick=()=>{
    //     //loginMember();
    // }

        return(
        <LoginPage>
            <div className="orangeX">
                <button className="Btn" onClick={()=>navigate("/")}>X</button>
            </div>
            <div className="realLogin">
                <p>로그인</p>
                <img src={kakao} alt="login" className="kakaoLoginBtn" onClick={handleLogin}/>
                <div className="text1">
                    <div className="line">

                    </div>
                    <p>또는 이메일로 로그인</p>
                    <div className="line">

                    </div>
                </div>
                <input type="text" className="idInput" value={id} placeholder="아이디 입력" onChange={handleIdChange}></input>
                <input type="text" className="pwInput" value={password} placeholder="비밀번호 입력" onChange={handlePwChange}></input>
                <button className="loginBtn">로그인</button>
                <div className="textBtn">
                    <p>회원이 아니신가요?</p>
                    <p className="gotoJoinBtn" onClick={()=>navigate("/join")}>회원가입</p>
                </div>
            </div>
        </LoginPage>
        
        );
}

