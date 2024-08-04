import { useState } from "react";
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { axiosInstance } from "../api";
import styled from "styled-components";
import kakao from "../assets/kakaoLogin_pic.png";

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
        margin-top: 80px;

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
            margin-top: 40px;
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
            margin-top:90px;
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
    const [refresh,setRefresh]=useState('');
    const [access,setAccess]=useState('');

    const handleItemClick = (path) => {
        navigate(path);
      };

      const handleKeyDown = (e) => {       //책 검색 후 엔터버튼을 눌렀을때 책 검색이 이루어지도록 -> 돋보기 표시 클릭했을때와 같은 기능
        if (e.key === 'Enter') {
            handleLoginClick();
        }               
    };


    const loginMember=async()=>{
        try{
            const Member={
                email:id,
                password:password,
            }
            const response=await axiosInstance.post('/auth/login/',Member);
            
            const refresh = response.data.refresh;
            const access = response.data.access;
            
            setRefresh(refresh);
            setAccess(access);

            console.log(response);
            navigate("/afterlogin", { state: { access, refresh } });
           
        }
        catch(e){
            console.log(e);
        }
    }

    const handleIdChange=(e)=>{
         setId(e.target.value);
     }

    const handlePwChange=(e)=>{
        setPassword(e.target.value);
    }

    const handleLoginClick=()=>{
        loginMember();
    }

        return(
        <LoginPage>
            <div className="orangeX">
                <button className="Btn" onClick={()=>navigate("/")}>X</button>
            </div>
            <div className="realLogin">
                <p>로그인</p>
                {/* <img src={kakao} alt="login" className="kakaoLoginBtn" onClick={handleLogin}/> */}
                {/* <div className="text1">
                    <div className="line">

                    </div>
                    <p>또는 이메일로 로그인</p>
                    <div className="line">

                    </div>
                </div> */}
                <input type="text" className="idInput" value={id} placeholder="아이디 입력" onChange={handleIdChange} onKeyDown={handleKeyDown}></input>
                <input type="text" className="pwInput" value={password} placeholder="비밀번호 입력" onChange={handlePwChange} onKeyDown={handleKeyDown}></input>
                <button className="loginBtn" onClick={handleLoginClick} >로그인</button>
                <div className="textBtn">
                    <p>회원이 아니신가요?</p>
                    <p className="gotoJoinBtn" onClick={()=>navigate("/join")}>회원가입</p>
                </div>
            </div>
        </LoginPage>
        
        );
   
    }
