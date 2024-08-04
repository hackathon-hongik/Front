import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../api";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import info from '../assets/info.png';
import noteImage from '../assets/note.png';
import contract from '../assets/contract.png';

const AppContainer = styled.div`
    width:1620px;
    height:1440px;
    flex-direction: column;
    align-items: center;
    display: flex;
    margin:auto;
    background: #FFFFFF, linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%);

`;

const NoteContainer = styled.div`
    font-family: "Pretendard JP";
    background-color: #FFFFFF;
    width:1200px;
    height:1440px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin-top: 20px;
`;

const SetContainer = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Header = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled.div`
  width: 64px;
  height: 48px;
  display: flex;
  justify-content: center;  
  align-items: center;  
  background-color: grey;
  margin-left: 118px;
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
  width: 112px;
  height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  border-radius: 8px 8px 0px 0px;
  background: #fff;
`;


const SubNav = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  border-bottom: 1px solid #E0E0E2;
  margin-top: 70px;
`;

const SubNavItem = styled.div`
  position: relative;
  text-align: center;
  font-family: "Pretendard JP";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 144.5%; /* 26.01px */
  letter-spacing: -0.004px;  
  margin: 12px 40px;
  cursor: pointer;
  color: ${props => (props.active ? '#FF6E23' : '#989BA2')};
  border-bottom: ${props => (props.active ? '2px solid #FF6E23' : 'none')};

  &:hover {
    color: #FF6E23;
  }

  img {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    display: ${props => (props.active ? 'block' : 'none')};
  }
`;


export function ThisBook(){
const [isCheck, setCheck] = useState(false);
const [activeSubNav, setActiveSubNav] = useState('bookinfo');
const location = useLocation();
const token = location.state?.token || '';
//const {isbn} = location.state|| {isbn:[]};
const isbn=location.state?.isbn || '';
const navigate = useNavigate();

const navigateToNote = (memberId, myBookId) => {
        navigate(`/note?memberId=${memberId}&myBookId=${myBookId}`);
};

const handleItemClick=(path,token,isbn)=>{
  navigate(path,{state:{token,isbn}});
};

useEffect(() => {
  console.log(isbn);
}, []);


    return(
        <AppContainer>
            <NoteContainer>
                  <Header>
                      <Logo>
                         <p>로고</p>
                      </Logo>
                    <Nav>
                    <li><a onClick={() => handleItemClick("/afterlogin/mylibrary")}>내 서재</a></li>
                    <li><a onClick={() => handleItemClick("/afterlogin/community")}>커뮤니티</a></li>
                      <li>
                         <ButtonToggle>
                           <MypageBtn onClick={() => { setCheck((e) => !e) }}>마이페이지</MypageBtn>
                             {isCheck && (
                                <ToggleList>
                                 <p>닉네임 변경</p>
                                 <p>1:1 문의</p>
                                 <p>로그아웃</p>
                                 <p>회원탈퇴</p>
                                </ToggleList>
                              )}
                         </ButtonToggle>
                        </li>
                    </Nav>
                  </Header>


                  
                  <SubNav>
                        <SubNavItem active={activeSubNav === 'bookinfo'} onClick={() => { handleItemClick("/afterlogin/thisbook"); setActiveSubNav('bookinfo'); }}>
                        {activeSubNav === 'bookinfo' && <img src={info} alt="active" />}
                        책 정보보기</SubNavItem>
                        <SubNavItem active={activeSubNav === 'record'} onClick={() => { handleItemClick("/afterlogin/note",token,isbn); setActiveSubNav('record'); }}>
                        {activeSubNav === 'record' && <img src={noteImage} alt="active" />}
                        기록하기</SubNavItem>
                        <SubNavItem active={activeSubNav === 'myrecords'} onClick={() => { handleItemClick("/afterlogin/looknote",token); setActiveSubNav('myrecords'); }}>
                        {activeSubNav === 'myrecords' && <img src={contract} alt="active" />}
                        내 기록보기</SubNavItem>
                  </SubNav>  

            </NoteContainer>
        </AppContainer>



//       Note.jsx로 넘어가기 위한 버튼
//      <button onClick={() => navigateToNote('123', '456')}>Go to Note</button>

    );
}