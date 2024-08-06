import { useState } from "react";
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { axiosInstance } from "../api";
import styled from "styled-components";
import kakao from "../assets/kakaoLogin_pic.png";
import loginLogo from "../assets/로그인로고.png";
import bookImage from "../assets/로그인책장.png";

const LoginPage=styled.div`

    width:1620px;
    height:1000px;
    display:flex;
    flex-direction:column;
    align-items: center;
    margin:auto;
    font-family: "Pretendard JP";
    background-color: #FFFFFF;

    .LoginSet{
        display:flex;
        flex-direction:row;

    }


    .orangeX{
        width:820px;
        height:1000px;
        background-color:#FF6E23;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        

        .loginLogo{
            width:300px;
            height:90px;
            background-color: #FF6E23;
            margin-top: 260px;

        }
        
        .bookImage{
            width:550px;
            height:400px;
            background-color: #FF6E23;
        }

    }
    
    .realLogin{
        width:800px;
        height:1000px;
        display:flex;
        flex-direction:column;
        align-items:center;

        .Xbar{
        width: 820px;
        display: flex;
        margin-top: 20px;
        flex-direction: flex-end;
        margin-bottom: 80px;
        }

        .close{
        font-size: 33px;
        margin-left: 750px;
        }

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
            border: 2px solid ${props => (props.hasValue ? '#FF6E23' : '#ccc')};
            background: #FFF;
            margin-top: 40px;

                &:focus {
                border-color: #FF6E23;
                outline: none;
                }
        }

        .pwInput{
            width: 400px;
            height: 64px;
            border-radius: 8px;
            border: 2px solid ${props => (props.hasValue ? '#FF6E23' : '#ccc')};
            background: #FFF;
            margin-top: 20px;
            

            &:focus {
                border-color: #FF6E23;
                outline: none;
                }
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
            margin-top:90px;


            background-color: ${props => (props.hasValue ? '#FF6E23' : '#ccc')};
            color: white;

            &:disabled {
                cursor: not-allowed;
              }

                &:hover {
                background-color: ${props => (props.hasValue ? '#FF6E23' : '#ccc')};
            }
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
                margin-left: 20px;
                cursor:pointer;
            }
        }
    }

`;



const Input = styled.input`
  width: 400px;
  height: 32px;
  padding: 19px 32px;
  border: 2px solid ${props => (props.hasValue ? '#FF6E23' : '#ccc')};
  border-radius: 5px;
  margin-bottom: 40px;
  font-size: 16px;
  
  &::placeholder {
    color: #808080;
    font-family: "Pretendard JP";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 144.5%; /* 26.01px */
    letter-spacing: -0.004px;
  }

  &:focus {
    border-color: #FF6E23;
    outline: none;
  }
`;

const Button = styled.button` 
  width: 400px;
  height: 64px;
  border-radius: 8px;
  background-color: ${props => (props.hasValue ? '#FF6E23' : '#ccc')};
  color: white;
  border: none;
  cursor: pointer;
    display: flex;
    width: 480px;
    height: 64px;
    padding: 18px 174px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    color: #FFF;
    text-align: center;
    font-feature-settings: 'ss10' on;

    /* Heading 2/Bold */
    font-family: "Pretendard JP";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 28px */
    letter-spacing: -0.24px;

    &:disabled {
        cursor: not-allowed;
    }

    &:hover {
    background-color: ${props => (props.hasValue ? '#FF6E23' : '#ccc')};
  }
`;


export function Login(){
    const[id,setId]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    const [refresh,setRefresh]=useState('');
    const [token,setAccess]=useState('');

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
            const token = response.data.access;
            
            setRefresh(refresh);
            setAccess(token);

            console.log(response);
            navigate("/afterlogin", { state: { token, refresh } });
           
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
            <div className="LoginSet">
            <div className="orangeX">
                <img className="loginLogo" src={loginLogo}/>
                <img className="bookImage" src={bookImage}/>
            </div>
            <div className="realLogin">
                <div className="Xbar">
                    <span className="material-icons close" onClick={()=>navigate("/")}>
                        close
                    </span>
                </div>
                <p>로그인</p>
                <Input
                        type="text"
                        value={id}
                        onChange={handleIdChange}
                        placeholder="아이디 입력"
                        onKeyDown={handleKeyDown}
                        hasValue={id.length > 0}
                        />
                <Input
                        type="password"
                        value={password}
                        onChange={handlePwChange}
                        placeholder="비밀번호 입력"
                        onKeyDown={handleKeyDown}
                        hasValue={password.length > 0}
                        />
                <Button type="submit" onClick={handleLoginClick} hasValue={id.length > 0 && password.length > 0} disabled={id.length === 0 || password.length === 0}>로그인</Button>
                <div className="textBtn">
                    <p>회원이 아니신가요?</p>
                    <p className="gotoJoinBtn" onClick={()=>navigate("/join")}>회원가입</p>
                </div>
            </div>
           </div>
        </LoginPage>
        
        );
   
    }
