import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { axiosInstance } from "../api";
import styled from "styled-components";


const JoinPage=styled.div`
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

    .realJoin{
        width:820px;
        height:900px;
        display:flex;
        flex-direction:column;
        align-items:center;
        margin-top:0px;

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
            margin-top:80px;
        }

        .idInput{
            width: 400px;
            height: 64px;
            border-radius: 8px;
            border: 2px solid #FF6E23;
            background: #FFF;
            margin-top: 10px;
        }

        .pwInput{
            width: 400px;
            height: 64px;
            border-radius: 8px;
            border: 2px solid #FF6E23;
            background: #FFF;
            margin-top: 10px;
        }

        .pwConfirmInput{
            width: 400px;
            height: 64px;
            border-radius: 8px;
            border: 2px solid #FF6E23;
            background: #FFF;
            margin-top: 10px;
        }

        .nicknameInput{
            width: 400px;
            height: 64px;
            border-radius: 8px;
            border: 2px solid #FF6E23;
            background: #FFF;
            margin-top: 10px;
        }

        .idText{
            color: var(--kakao-logo, #000);
            /* Headline 1/Medium */
            font-family: "Pretendard JP";
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 144.5%; /* 26.01px */
            letter-spacing: -0.004px;
            margin-top: 20px;
            margin-right: 358px;
        }
        .pwText{
            color: var(--kakao-logo, #000);
            /* Headline 1/Medium */
            font-family: "Pretendard JP";
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 144.5%; /* 26.01px */
            letter-spacing: -0.004px;
            margin-top: 20px;
            margin-right: 340px;
        }
        .pwConfirmText{
            color: var(--kakao-logo, #000);
            /* Headline 1/Medium */
            font-family: "Pretendard JP";
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 144.5%; /* 26.01px */
            letter-spacing: -0.004px;
            margin-top: 20px;
            margin-right: 299px;
        }

        .nicknameText{
            color: var(--kakao-logo, #000);
            /* Headline 1/Medium */
            font-family: "Pretendard JP";
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 144.5%; /* 26.01px */
            letter-spacing: -0.004px;
            margin-top: 20px;
            margin-right: 360px;
        }

        .joinBtn{
            display: flex;
            width: 400px;
            height: 64px;
            //padding: 18px 174px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
            border-radius: 8px;
            background: #FF6E23;
            margin-top:50px;
            color: #FFF;

            text-align: center;
            font-feature-settings: 'ss10' on;
            /* Heading 2/Bold */
            font-family: "Pretendard JP";
            font-size: 15px;
            font-style: normal;
            font-weight: 600;
            line-height: 140%; /* 28px */
            letter-spacing: -0.24px;
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

            .gotoLoginBtn{
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
export function Join(){
    const[id,setId]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const [nickname,setNickname]=useState("");
    const navigate=useNavigate();

    const handleItemClick = (path) => {
        navigate(path);
      };

      const handleKeyDown = (e) => {       //책 검색 후 엔터버튼을 눌렀을때 책 검색이 이루어지도록 -> 돋보기 표시 클릭했을때와 같은 기능
        if (e.key === 'Enter') {
            handleJoinClick();
        }               
    };

    const joinMember=async()=>{

        try{
            const newMember={
                email:id,
                nickname:nickname,
                password:password,
                password2:confirmPassword
            }
            const response=await axiosInstance.post('/auth/register/',newMember)
            alert('회원가입이 성공하였습니다');
            handleItemClick('/');
            console.log(response);
        }
        catch(e){
            if(e.response && e.response.status===400){
                alert("비밀번호가 일치하지 않습니다.");
                console.log(e);
            }

            else if(e.response && e.response.status===409){
                alert("이미 존재하는 이메일입니다");
            }

            else if(e.response && e.response.status===406){
                alert("이미 존재하는 닉네임입니다.");
            }
        }
    }
    
    const handleIdChange=(e)=>{
        setId(e.target.value);
    }

   const handlePwChange=(e)=>{
       setPassword(e.target.value);
   }

   const handlePwConfirmChange=(e)=>{
        setConfirmPassword(e.target.value);
   }

   const handleNicknameChange=(e)=>{
        setNickname(e.target.value);
   }

   const handleJoinClick=()=>{
    joinMember();
   }
    return(
        <JoinPage>
            <div className="orangeX">
                <button className="Btn" onClick={()=>navigate("/")}>X</button>
            </div>
            <div className="realJoin">
                <p>회원가입</p>
                <div className="idText">아이디</div>
                <input type="text" className="idInput" value={id} placeholder="이메일 입력" onChange={handleIdChange} onKeyDown={handleKeyDown}></input>
                <div className="pwText">비밀번호</div>
                <input type="text" className="pwInput" value={password} placeholder="비밀번호 입력" onChange={handlePwChange} onKeyDown={handleKeyDown}></input>
                <div className="pwConfirmText">비밀번호 확인</div>
                <input type="text" className="pwConfirmInput" value={confirmPassword} placeholder="비밀번호 확인" onChange={handlePwConfirmChange} onKeyDown={handleKeyDown}></input>
                <div className="nicknameText">닉네임</div>
                <input type="text" className="nicknameInput" value={nickname} placeholder="닉네임" onChange={handleNicknameChange} onKeyDown={handleKeyDown}></input>
                <button className="joinBtn" onClick={handleJoinClick}>회원가입</button>
                <div className="textBtn">
                    <p>회원이신가요?</p>
                    <p className="gotoLoginBtn" onClick={()=>navigate("/login")}>로그인</p>
                </div>
            </div>

        </JoinPage> 
    );
}