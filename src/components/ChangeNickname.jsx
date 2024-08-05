
import { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from "react";
import styled from "styled-components";
import findLogo from "../assets/findLogo.png";
import {bookAPI} from "../api";
import { axiosInstance } from '../api';
import logo from "../assets/Logo.png";

    


const ChangeNickNamePage = styled.div`
    width:1620px;
    height:1080px;
    flex-direction: column;
    align-items: center;
    display: flex;
    margin:auto;
    background: #FFFFFF, linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%);
    background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;
`;

const NoteContainer = styled.div`
    font-family: "Pretendard JP";
    background-color: #FFFFFF;
    width:1200px;
    height:1080px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;



const Header = styled.div`
  width: 1200px;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;
`;

const Logo = styled.img`
    width: 145px;
    height: 44px;
    margin-top:58px;
    background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;
`;

const Nav = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 45px;

  a {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;
    cursor: pointer;
    &:hover {
      color: gray;
    }
  }

  li {
    list-style-type: none;
    margin-left: 24px;
  }
`;

const MypageBtn = styled.button`
  width: 112px;
  height: 34px;
  display: flex;
  padding: 8px 18px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  font-feature-settings: 'ss10' on;
  font-family: "Pretendard JP";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 142.9%; /* 20.006px */
  letter-spacing: 0.203px;
  background: #ff6e23;
  border: none;
  position: relative;
`;

const ButtonToggle = styled.div`
  position: relative;
`;

const ToggleList = styled.div`
    width:112px;
    height:110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    border-radius: 8px 8px 0px 0px;
    background: #FFF;

`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  height: 960px;
  background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0px;
  margin-top:200px;
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  margin-top: 80px;
`;

const Label = styled.label`
color: var(--kakao-logo, #000);

/* Headline 1/Medium */
    font-family: "Pretendard JP";
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 144.5%; /* 26.01px */
    letter-spacing: -0.004px;
    align-self: flex-start;
    margin-bottom: 10px;
`;

const Input = styled.input`
  width: 416px;
  height: 40px;
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
  width: 100%;
  height: 50px;
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



export function ChangeNickName(){
    const navigate = useNavigate();
    const [isCheck, setCheck] = useState(false);
    const location = useLocation();
    const token = location.state?.token || '';
    const refresh = location.state?.refresh || '';
    const [nickname,setNickname]=useState("");

    const handleNicknameChange=(e)=>{
        setNickname(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.patch('/auth/update-nickname/', { nickname }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('닉네임 변경 성공:', response);
            alert('닉네임 변경 성공')
        } catch (error) {
            console.error('닉네임 변경 실패:', error);
            alert('닉네임 변경 실패')
        }
    };


const handleItemClick=(path,token,refresh,isbn)=>{
        navigate(path,{state:{token,refresh,isbn}});
}; 
      

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

    const handleLogOut=async()=>{
      try{
          const newRefresh={
              refresh: refresh
          }
          const response=await axiosInstance.post('/auth/logout/',newRefresh,{
              headers:{
                  Authorization: `Bearer ${token}`
              }
          });
          handleItemClick('/');
          console.log(response);
      }
      catch(e){
          console.log(e);
          alert("로그아웃 실패");
      }
  }

    return(
        <ChangeNickNamePage>
              <NoteContainer>
                <Header>
                    <Logo src ={logo} onClick={()=>handleItemClick('/afterlogin',token,refresh)}/>
                <Nav>
                  <li><a onClick={() => handleItemClick("/afterlogin/mylibrary",token,refresh)}>내 서재</a></li>
                  <li><a onClick={() => handleItemClick("/afterlogin/community",token,refresh)}>커뮤니티</a></li>
                  <li>
                    <ButtonToggle>
                      <MypageBtn onClick={() => { setCheck((e) => !e) }}>마이페이지</MypageBtn>
                      {isCheck && (
                        <ToggleList>
                        <p onClick={()=>handleItemClick('/afterlogin/changenickname',token,refresh)}>닉네임 변경</p>
                        <p onClick={handleLogOut}>로그아웃</p>
                        </ToggleList>
                      )}
                    </ButtonToggle>
                  </li>
                </Nav>
              </Header>

                <Container>
                    <Title>닉네임 변경</Title>
                    <Form onSubmit={handleSubmit}>
                        <Label htmlFor="nickname">변경할 닉네임</Label>
                        <Input
                        id="nickname"
                        type="text"
                        value={nickname}
                        onChange={handleNicknameChange}
                        placeholder="닉네임 입력"
                        hasValue={nickname.length > 0}
                        />
                        <Button type="submit" hasValue={nickname.length > 0} disabled={nickname.length === 0}>변경하기</Button>
                    </Form>
                </Container>
            </NoteContainer>
        </ChangeNickNamePage>
    );
}