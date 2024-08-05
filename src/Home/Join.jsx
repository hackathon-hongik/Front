import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { axiosInstance } from "../api";
import styled from "styled-components";
import logo from "../assets/Logo.png";
import loginLogo from "../assets/로그인로고.png";
import bookImage from "../assets/로그인책장.png";


const JoinPage=styled.div`

    width:1620px;
    height:1000px;
    display:flex;
    flex-direction:column;
    align-items: center;
    margin:auto;
    font-family: "Pretendard JP";
    background-color: #FFFFFF;

    .JoinSet{
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

    .realJoin{
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

        .joinText{
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
            margin-top:0;
            margin-bottom: 30px;
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
            margin-top:80px;
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

const Text = styled.div`
    width: 468px;
    height: 16px;
    color: var(--kakao-logo, #000);

    
    /* Headline 1/Medium */
    font-family: "Pretendard JP";
    font-size: 18px;
    font-style: bold;
    font-weight: 500;
    line-height: 144.5%; /* 26.01px */
    letter-spacing: -0.004px;
    text-align: left;
    margin-bottom: 20px;

`;


const Input = styled.input`
  width: 400px;
  height: 32px;
  padding: 19px 32px;
  border: 2px solid ${props => (props.hasValue ? '#FF6E23' : '#ccc')};
  border-radius: 5px;
  margin-bottom: 20px;
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
            <div className="JoinSet">
                <div className="orangeX">
                    <img className="loginLogo" src={loginLogo}/>
                    <img className="bookImage" src={bookImage}/>
                </div>
            <div className="realJoin">
                <div className="Xbar">
                    <span className="material-icons close" onClick={()=>navigate("/")}>
                        close
                    </span>
                </div>
                <div className="joinText">
                회원가입
                </div>
                <Text>아이디</Text>
                <Input
                        type="text"
                        value={id}
                        onChange={handleIdChange}
                        placeholder="이메일 입력"
                        onKeyDown={handleKeyDown}
                        hasValue={id.length > 0}
                        />
                <Text>비밀번호</Text>
                <Input
                        type="text"
                        value={password}
                        onChange={handlePwChange}
                        placeholder="비밀번호 입력"
                        onKeyDown={handleKeyDown}
                        hasValue={password.length > 0}
                        />
                <Text>비밀번호 확인</Text>
                <Input
                        type="text"
                        value={confirmPassword}
                        onChange={handlePwConfirmChange}
                        placeholder="비밀번호 확인"
                        onKeyDown={handleKeyDown}
                        hasValue={confirmPassword.length > 0}
                        />
                <Text>닉네임</Text>
                <Input
                        type="text"
                        value={nickname}
                        onChange={handleNicknameChange}
                        placeholder="닉네임"
                        onKeyDown={handleKeyDown}
                        hasValue={nickname.length > 0}
                        />
                <Button type="submit" onClick={handleJoinClick} hasValue={id.length > 0 && password.length > 0 && confirmPassword.length > 0 && nickname.length > 0} disabled={nickname.length === 0 || id.length === 0}>회원가입</Button>
                <div className="textBtn">
                    <p>회원이신가요?</p>
                    <p className="gotoLoginBtn" onClick={()=>navigate("/login")}>로그인</p>
                </div>
            </div>
            </div>
        </JoinPage> 
    );
}