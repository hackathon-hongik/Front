import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { all } from '../../node_modules/@eslint/eslintrc/node_modules/js-yaml/index';
import goodImage from './좋아요.png';
import okayImage from './괜찮아요.png';
import tiredImage from './피곤해요.png';
import sadImage from './슬퍼요.png';
import worriedImage from './걱정돼요.png';


const AppContainer = styled.div`
    width:1920px;
    height:1840px;
    flex-direction: column;
    align-items: center;
    display: flex;
    margin:auto;
    background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;
`;


const NoteContainer = styled.div`
    font-family: "Pretendard JP";
    background-color: #FFFFFF;
    width:1200px;
    height:1840px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    width: 200px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 8px;
    background: var(--BG-Secondary, #F2F2F7);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0; 
`;

const Tab = styled.button`
    // 마우스로 눌렀을 때 색상, 글자색 변경
    background-color: ${props => (props.active ? '#FF6E23' : '#F2F2F7')};
    color: ${props => (props.active ? '#FFF' : '##989BA2')};
    display: inline-flex;
    height: 32px;
    padding: 6px 10px;
    width: 95px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 8px;
    border: none;
    margin: 0px;
    cursor: pointer;
    line-height: 32px;

    // 마우스 호버 설정
   &:hover {
    background-color: ${props => (props.active ? '#FF6E23' : '#ddd')};
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 480px;
  margin-top: 20px;


  > * {
    margin-bottom: 32px; // 요소마다 32px씩 떨어지도록
  }
`;

const SetContainer = styled.div`
    width: 100%;
`;

const InputPage = styled.div`
  display: flex;
  align-items: center;
  //justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  //justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  color: var(--kakao-logo, #000);
  font-feature-settings: 'ss10' on;
  /* Body 1/Normal - Bold */
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: 0.091px;
  margin-bottom: 10px;
`;

const PageLabel = styled.label` 
    color: var(--kakao-logo, #000);
    font-feature-settings: 'ss10' on;
    /* Caption 1/Regular */
    font-family: "Pretendard JP";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 133.4%; /* 16.008px */
    letter-spacing: 0.302px;

`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #F2F2F7;
`;

const PageInput = styled.input`
  width: 64px;
  height: 40px;
  flex-shrink: 0;
  background-color: #F2F2F7;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;

  &:last-child {
    margin-right: 0;
  }
`;

const Span = styled.div`
    margin : 0 8px;

`;

const SmallInput = styled.button`
  width: 86px;
  height: 40px;
  flex-shrink: 0;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #F2F2F7;
  border-radius: 8px;

  &:last-child {
    margin-right: 0;
  }
`;


const SmallInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  &:last-child {
    margin-right: 0;
  }
`;

const Emoji = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
`;

const SmallInputLabel = styled.label`
  margin-top: 8px;
  font-size: 14px;
  color: #989ba2;
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: none;
  background-color: #F2F2F7;
`;

const SubmitButton = styled.button`
    display: flex;
    width: 200px;
    height: 56px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border: none;
    border-radius: 8px;
    background: #FF6E23;
    color: #fff;
    font-style : bold;
    cursor: pointer;
`;


//여기부터 체크박스용 

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: ${(props) => (props.checked ? "#FF6E23" : "#fff")};
  border-radius: 3px;
  transition: all 150ms;
  border: 1px solid #ccc;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #ff6e23;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const TextContainer = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
`;

const MainText = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const SubText = styled.span`
  font-size: 12px;
  color: #989ba2;
`;

const Checkbox = ({ checked, onChange }) => (
    <CheckboxContainer onClick={onChange}>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );

// 여기까지 체크박스용


// 여기부터 글 공개여부 부분

const OpenSet = styled.div`
  display: flex;
  width: 480px;
  margin-bottom: 30px;
`;

const OpenSetLabel = styled.label`
  color: var(--kakao-logo, #000);
  text-align: left;
  font-feature-settings: 'ss10' on;
  margin-right: 20px;

/* Label 1/Normal - Medium */
    font-family: "Pretendard JP";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;
`;

const OpenSetContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const OpenSetInput = styled.input`
  margin-right: 5px;
  accent-color: ${props => (props.checked ? "#FF6E23" : "#000")};
`;


//여기까지 글 공개여부

export function Note() {
  const [activeTab, setActiveTab] = useState('simple');
  const navigate = useNavigate();
  const [isCheck, setCheck] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("public"); // 공개여부설정



  const handleItemClick = (path) => {
    navigate(path);
  };

  // 체크박스 구현

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };


  const handleOptionChange = (event) => { //글 공개여부설정
    setSelectedOption(event.target.value);
  };

  return ( 
    <AppContainer>
      <NoteContainer>
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
        <Tab active={activeTab === 'simple'} onClick={() => setActiveTab('simple')}>짧은 기록</Tab>
        <Tab active={activeTab === 'detailed'} onClick={() => setActiveTab('detailed')}>자세한 기록</Tab>
      </TabsContainer>
      {activeTab === 'simple' && (
        <FormContainer>
          
          <SetContainer>                       
          <Label>01. 읽은 페이지</Label>  
          <InputPage>
            <PageInput placeholder="입력"/>
            <Span>~</Span>
            <PageInput placeholder="입력"/>
            <PageLabel style = {{ marginLeft : "10px"}}>페이지</PageLabel>   
          </InputPage>
          <CheckboxContainer>
              <Checkbox checked={checked} onChange={handleCheckboxChange} />
              <TextContainer>
                <MainText>완독한 경우 체크</MainText>
                <SubText>체크할 경우 “지금까지 읽은 책”으로 이동됩니다.</SubText>
              </TextContainer>
            </CheckboxContainer>
          </SetContainer>  
          
          <SetContainer> 
          <Label>02. 오늘의 기분</Label>
          <InputRow>
                <SmallInputContainer>
                    <SmallInput placeholder="">
                        <Emoji src={goodImage} alt="좋아요" />  
                    </SmallInput>
                    <SmallInputLabel>좋아요</SmallInputLabel>
                </SmallInputContainer>

                <SmallInputContainer>
                    <SmallInput placeholder="">
                        <Emoji src={okayImage} alt="괜찮아요" />
                    </SmallInput>
                    <SmallInputLabel>괜찮아요</SmallInputLabel>
                </SmallInputContainer>
                
                <SmallInputContainer>
                   <SmallInput placeholder="">
                        <Emoji src={tiredImage} alt="피곤해요" />
                    </SmallInput>
                <SmallInputLabel>피곤해요</SmallInputLabel>
                </SmallInputContainer>

                <SmallInputContainer>
                    <SmallInput placeholder="">
                        <Emoji src={sadImage} alt="슬퍼요" />
                    </SmallInput>
                    <SmallInputLabel>슬퍼요</SmallInputLabel>
                </SmallInputContainer>

                <SmallInputContainer>
                    <SmallInput placeholder="" >
                        <Emoji src={worriedImage} alt="걱정돼요" />
                    </SmallInput>
                    <SmallInputLabel>걱정돼요</SmallInputLabel>
                </SmallInputContainer>
          </InputRow>
          </SetContainer>

          <SetContainer> 
          <Label>03. 질문을 생각해보며 오늘 하루를 되돌아봐요.</Label>
          <div style={{ width: '97%' }}>
            <TextArea placeholder="오늘의 질문에 대한 답을 적어보세요.(최대 200자)" rows="4" />
          </div>
          </SetContainer>
          <SetContainer>
          <Label>04. 대답</Label>
          <div style={{ width: '97%' }}>
            <TextArea placeholder="대답" rows="4" />
          </div>
          </SetContainer>

          <SetContainer>
          <Label>04. 인상 깊은 한 줄</Label>
          <div style={{ width: '97%' }}>
            <TextArea placeholder="인상 깊은 한 줄" rows="4" />
          </div>
          </SetContainer>
        </FormContainer>
      )}
      {activeTab === 'detailed' && (
        <FormContainer>
           <Label>01. 읽은 페이지</Label>  
          <InputPage>
            <PageInput placeholder="입력"/>
            <Span>~</Span>
            <PageInput placeholder="입력"/>
            <PageLabel style = {{ marginLeft : "10px"}}>페이지</PageLabel>   
          </InputPage>
           <CheckboxContainer>
              <Checkbox checked={checked} onChange={handleCheckboxChange} />
              <TextContainer>
                <MainText>완독한 경우 체크</MainText>
                <SubText>체크할 경우 “지금까지 읽은 책”으로 이동됩니다.</SubText>
              </TextContainer>
            </CheckboxContainer>
          <div style={{ width: '100%' }}>
            <Label>02. 제목</Label>
            <Input placeholder="제목 입력" />
          </div>
          <div style={{ width: '100%' }}>
            <Label>03. 내용</Label>
            <TextArea placeholder="책에 대한 감상을 자유롭게 적어보세요 (최소 80자)" rows="13" />
          </div>
        </FormContainer>
      )}
      <OpenSet>
        <OpenSetLabel>글 공개여부 설정</OpenSetLabel>
        <OpenSetContainer>
            <OpenSetInput
                type="radio"
                id="public"
                name="visibility"
                value="public"
                checked={selectedOption === "public"}
                onChange={handleOptionChange}   
            />
            <OpenSetLabel htmlFor="public">공개</OpenSetLabel>
            <OpenSetInput
                type="radio"
                id="private"
                name="visibility"
                value="private"
                checked={selectedOption === "private"}
                onChange={handleOptionChange}
            />
            <OpenSetLabel htmlFor="public">비공개</OpenSetLabel>
        </OpenSetContainer>
      </OpenSet>

        <SubmitButton>업로드</SubmitButton>
      </NoteContainer>
    </AppContainer>
  );
}

export default Note;
