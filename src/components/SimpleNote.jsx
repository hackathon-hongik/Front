import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AppContainer = styled.div`
   font-family: "Pretendard JP";
    width:1620px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:auto;
    background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;
`;

const Header = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
`;

const Logo = styled.div`
  width: 64px;
  height: 48px;
  margin-top: 58px;
  margin-left: 90px;
  background-color: grey;
`;

const Nav = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 45px;
  margin-left: auto;
  margin-right: 90px;

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

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  border-radius: 8px;
  background: var(--BG-Secondary, #F2F2F7);
`;

const Tab = styled.button`
  background-color: ${props => (props.active ? '#ccc' : '#f5f5f5')};
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 20px 0;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const SmallInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 9px;
  height: 40px;

  &:last-child {
    margin-right: 0;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export function SimpleNote() {
  const [activeTab, setActiveTab] = useState('simple');
  const navigate = useNavigate();
  const [isCheck, setCheck] = useState(false);

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <AppContainer>
      <Header>
        <Logo>
          <p>로고</p>
        </Logo>
        <Nav>
          <li><a onClick={() => handleItemClick("/login")}>내 서재</a></li>
          <li><a onClick={() => handleItemClick("/login")}>커뮤니티</a></li>
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
      <TabsContainer>
        <Tab active={activeTab === 'simple'} onClick={() => setActiveTab('simple')}>간단한 기록</Tab>
        <Tab active={activeTab === 'detailed'} onClick={() => setActiveTab('detailed')}>자세한 기록</Tab>
      </TabsContainer>
      {activeTab === 'simple' && (
        <FormContainer>
          <InputRow>
            <div>
              <Label>페이지</Label>
              <SmallInput placeholder="페이지" />
            </div>
            <div>
              <Label> </Label>
              <SmallInput placeholder="-" />
            </div>
          </InputRow>
          <InputRow>
            <div>
              <Label>오늘의 기분</Label>
              <SmallInput placeholder="오늘의 기분" />
            </div>
            <div>
              <Label> </Label>
              <SmallInput placeholder="" />
            </div>
            <div>
              <Label> </Label>
              <SmallInput placeholder="" />
            </div>
          </InputRow>
          <div style={{ width: '100%' }}>
            <Label>질문</Label>
            <TextArea placeholder="질문" rows="4" />
          </div>
          <div style={{ width: '100%' }}>
            <Label>대답</Label>
            <TextArea placeholder="대답" rows="4" />
          </div>
          <div style={{ width: '100%' }}>
            <Label>인상 깊은 한 줄</Label>
            <TextArea placeholder="인상 깊은 한 줄" rows="4" />
          </div>
          <SubmitButton>등록</SubmitButton>
        </FormContainer>
      )}
      {activeTab === 'detailed' && (
        <FormContainer>
          <InputRow>
            <div>
              <Label>페이지</Label>
              <SmallInput placeholder="페이지" />
            </div>
            <div>
              <Label> </Label>
              <SmallInput placeholder="-" />
            </div>
          </InputRow>
          <div style={{ width: '100%' }}>
            <Label>제목</Label>
            <Input placeholder="제목" />
          </div>
          <div style={{ width: '100%' }}>
            <Label>감상</Label>
            <TextArea placeholder="감상" rows="6" />
          </div>
          <SubmitButton>등록</SubmitButton>
        </FormContainer>
      )}
    </AppContainer>
  );
}

export default SimpleNote;
