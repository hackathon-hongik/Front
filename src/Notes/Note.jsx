import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../api";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import goodImage from '../assets/좋아요.png';
import okayImage from '../assets/괜찮아요.png';
import tiredImage from '../assets/피곤해요.png';
import sadImage from '../assets/슬퍼요.png';
import worriedImage from '../assets/걱정돼요.png';
import info from '../assets/info.png';
import noteImage from '../assets/note.png';
import contract from '../assets/contract.png';
import logo from "../assets/Logo.png";



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

const Header = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled.img`
    width: 145px;
    height: 44px;
    margin-top:58px;
    background: #FFF;

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
  border: none;
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
    width:112px;
    height:110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    border-radius: 8px 8px 0px 0px;
    background: #FFF;

    p{
        cursor: default;


        &:hover {
            color: gray;
          }
    }
`;

const TabsContainer = styled.div`
    width: 180px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 8px;
    background: var(--BG-Secondary, #F2F2F7);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 66px;
    margin-bottom: 25px; 
`;

const Tab = styled.button`
    // 마우스로 눌렀을 때 색상, 글자색 변경
    background-color: ${props => (props.active ? '#FF6E23' : '#F2F2F7')};
    color: ${props => (props.active ? '#FFF' : '##989BA2')};
    display: inline-flex;
    font-feature-settings: 'ss10' on;
    font-family: "Pretendard JP";
    font-style: normal;
    font-weight: ${props => (props.active ? '600' : '500')};
    font-size: 14px;
    height: 32px;
    padding: 6px 10px;
    width: 85px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 8px;
    border: none;
    margin: 0px;
    cursor: pointer;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;

    // 마우스 호버 설정
   &:hover {
    background-color: ${props => (props.active ? '#FF6E23' : '#ddd')};
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

`;

const SetQuestions=[
  "01.인간 관계 - 내가 겪고 있는 인간관계 문제의 원인은 무엇이라고 생각하며, 책에서 제안한 해결책 중 어떤 것을 시도해볼 수 있을까요?",
  "02.인간 관계 - 책을 읽으면서 가장 공감한 부분은 무엇이며, 그것이 나의 인간관계 방식에 어떻게 적용될 수 있을까요?",
  "03.진로 - 책의 주요 메시지나 교훈이 내 현재 진로 고민에 어떤 통찰을 제공했나요? ",
  "04.진로 - 책을 읽고 나서 내 진로에 대한 새로운 아이디어나 방향성이 생겼다면, 그것을 구체적으로 어떻게 실행할 수 있을까요?",
  "05.경제 - 책을 통해 알게 된 투자 리스크 관리 방법 중 나에게 적합한 것은 무엇이며, 그것을 어떻게 실행할 수 있을까요?",
  "06.경제 - 책에서 소개된 성공적인 재정 관리 사례를 내 삶에 적용한다면, 어떤 변화가 필요할까요?",
  "07.건강 - 이 책에서 배운 중요한 건강 관리 원칙은 무엇이며, 그것을 어떻게 내 생활에 적용할 수 있을까요?",
  "08.건강 - 책에서 소개된 성공적인 건강 관리 사례를 내 삶에 적용한다면, 어떤 변화가 필요할까요?",
  "09.직장 생활 - 내가 직장에서 버겁게 느끼는 부분은 무엇이며, 책에서 제안한 해결책 중 어떤 것을 시도해볼 수 있을까요?",
  "10.직장 생활 - 책을 읽고 난 후 나의 직장 업무 방식을 재구성해야 한다면, 어떤 변화가 필요하다고 생각하나요?"
]


const Select = styled.select`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #F2F2F7;
  overflow: auto;
  white-space: normal;
  
  &:focus {
    border-color: #989BA2;
    outline: none;
  }

  option {
    white-space: normal;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #F2F2F7;
  
  &:focus {
    border-color: #989BA2;
    outline: none; /* 기본 포커스 스타일 제거 */
  }
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

  &:focus {
    border-color: #989BA2;
    outline: none; /* 기본 포커스 스타일 제거 */
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
  border-radius: 8px;
  border: ${({ isactive }) => (isactive ? '1px solid #FF6E23' : '1px solid #ccc')};
  background-color: ${({ isactive }) => (isactive ? '#FFF2EB' : '#F2F2F7')};
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #FFDAB9; // 호버 시 배경 색
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

  &:focus {
    border-color: #989BA2;
    outline: none; /* 기본 포커스 스타일 제거 */
  }
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
  clip-path: inset(50%);
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

//여기까지 글 공개여부

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function Note() {
  const navigate = useNavigate();
  const query = useQuery();
  const [activeTab, setActiveTab] = useState('simple');
  const [isCheck, setCheck] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("public"); // 공개여부설정
  const[start,setStart]=useState('');
  const[end,setEnd]=useState('');
  const [mood, setMood] = useState('');
  const[answer,setAnswer]=useState('');
  const[title,setTitle]=useState('');
  const[short_comment,setShortComment]=useState('');
  const[long_comment,setLongComment]=useState('');
  const[memberId,setMemberId]=useState('');
  const[myBookId,setMyBookId]=useState('');
  const[short_review_id,setShortReviewId]=useState('');
  const[long_review_id,setLongReviewId]=useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(SetQuestions[0]);
  // const [question, setQuestion] = useState('');
  const [question, setQuestion] = useState('Q1');
  const [activeSubNav, setActiveSubNav] = useState('record');
  const location = useLocation();
  const token = location.state?.token || '';
  const isbn=location.state?.isbn || '';
  const refresh=location.state?.refresh||'';
  //const {isbn} = location.state|| {isbn:[]};

  // useEffect(() => {
  //   const memberIdFromQuery = query.get("memberId");
  //   const myBookIdFromQuery = query.get("myBookId");
  //   if (memberIdFromQuery && myBookIdFromQuery) {
  //     setMemberId(memberIdFromQuery);
  //     setMyBookId(myBookIdFromQuery);
  //   }

  //       // 고유 번호 생성
  //       setShortReviewId(Date.now() + '-short');
  //       setLongReviewId(Date.now() + '-long');
  // }, [query]);

  useEffect(()=>{
    console.log(isbn);   //화면 처음 랜더링 될때 찜한 정보들 띄우기
},[]);

  const handleItemClick=(path,token,refresh,isbn)=>{
    navigate(path,{state:{token,refresh,isbn}});
};

//감정 선택


// 체크박스 구현

  const handleStartChange=(e)=>{
    setStart(e.target.value);
};

const handleEndChange=(e)=>{
  setEnd(e.target.value);
};

const handleCheckboxChange = async () => {
    setChecked(!checked);
};
  
//글 공개여부설정
const handleOptionChange = (event) => { 
    setSelectedOption(event.target.value);
  };

  const handleMoodChange=(selectedMood)=>{
    setMood(selectedMood);
};


// 질문 선택
const handleQuestionChange = (event) => {
  const selectedIndex = SetQuestions.indexOf(event.target.value) + 1;
  const questionCode = `Q${selectedIndex}`;
  setSelectedQuestion(event.target.value);
  setQuestion(questionCode);
};

//질문 답변
const handleAnswerChange = (event) => {
  setAnswer(event.target.value);
};


const handleShortComentChange = (event) => {
  setShortComment(event.target.value);
};


//자세한 기록 제목
const handleTitleChange = (event) => {
  setTitle(event.target.value);
};

const handleLongCommentChange = (event) => {
  setLongComment(event.target.value);
};

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

  // 짧은기록 넘겨주기 함수 
  const handleShortNoteSubmit = async (memberId, myBookId) => {
    try{
      const newShortNote = {
         
        start_page : start,
        end_page : end,
        read_complete: checked, // 읽기 완료 체크박스
        mood : mood,
        question : question,
        answer : answer,
        short_comment : short_comment,
        open: selectedOption === "public", // 공개여부
      }
      
      const response = await axiosInstance.post(`/desk/books/${isbn}/note/short`, newShortNote,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      alert('업로드 완료!');
      // fetchNotes(); // 전체 노트를 get 하는 함수

    } catch(e){
      console.log(isbn);
      console.log(e);
  }

  };

  // 자세한기록 넘겨주기 함수
  const handleLongNoteSubmit = async (memberId, myBookId) => {
    try {
      const newLongNote = {
  
        start_page: start,
        end_page: end,
        read_complete: checked,
        long_title: title,
        long_text: long_comment,
        open: selectedOption === "public" // boolean 값으로 설정
      };
      const response = await axiosInstance.post(`/desk/books/${isbn}/note/long`, newLongNote,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      alert('업로드 완료!');
    } catch (e) {
      console.log(e);
    }
  };
  


  return ( 
    <AppContainer>
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

      <SubNav>
          <SubNavItem active={activeSubNav === 'bookinfo'} onClick={() => { handleItemClick("/afterlogin/thisbook",token,refresh,isbn); setActiveSubNav('bookinfo'); }}>
                        {activeSubNav === 'bookinfo' && <img src={info} alt="active" />}
                        책 정보보기</SubNavItem>
          <SubNavItem active={activeSubNav === 'record'} onClick={() => { handleItemClick("/afterlogin/note",token,refresh,isbn); setActiveSubNav('record'); }}>
                        {activeSubNav === 'record' && <img src={noteImage} alt="active" />}
                        기록하기</SubNavItem>
          <SubNavItem active={activeSubNav === 'myrecords'} onClick={() => { handleItemClick("/afterlogin/looknote",token,refresh,isbn); setActiveSubNav('myrecords'); }}>
                        {activeSubNav === 'myrecords' && <img src={contract} alt="active" />}
                        내 기록보기</SubNavItem>
      </SubNav>  

      <TabsContainer>
        <Tab active={activeTab === 'simple'} onClick={() => setActiveTab('simple')}>하루 기록</Tab>
        <Tab active={activeTab === 'detailed'} onClick={() => setActiveTab('detailed')}>자유 기록</Tab>
      </TabsContainer>
      {activeTab === 'simple' && (
        <FormContainer>
          
          <SetContainer>                       
          <Label>01. 읽은 페이지</Label>  
          <InputPage> {/* 페이지 입력 부분*/}
            <PageInput placeholder="입력" value={start} onChange={handleStartChange}/>
            <Span>~</Span>
            <PageInput placeholder="입력" value={end} onChange={handleEndChange}/>
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
                    <SmallInput isactive={mood === 'good'} onClick={() => handleMoodChange('good')}>
                        <Emoji src={goodImage} alt="좋아요" />  
                    </SmallInput>
                    <SmallInputLabel>좋아요</SmallInputLabel>
                </SmallInputContainer>

                <SmallInputContainer>
                    <SmallInput isactive={mood === 'okay'} onClick={() => handleMoodChange('okay')}>
                        <Emoji src={okayImage} alt="괜찮아요" />
                    </SmallInput>
                    <SmallInputLabel>괜찮아요</SmallInputLabel>
                </SmallInputContainer>
                
                <SmallInputContainer>
                   <SmallInput isactive={mood === 'tired'} onClick={() => handleMoodChange('tired')}>
                        <Emoji src={tiredImage} alt="피곤해요" />
                    </SmallInput>
                <SmallInputLabel>피곤해요</SmallInputLabel>
                </SmallInputContainer>

                <SmallInputContainer>
                    <SmallInput isactive={mood === 'sad'} onClick={() => handleMoodChange('sad')}>
                        <Emoji src={sadImage} alt="슬퍼요" />
                    </SmallInput>
                    <SmallInputLabel>슬퍼요</SmallInputLabel>
                </SmallInputContainer>

                <SmallInputContainer>
                    <SmallInput isactive={mood === 'worried'} onClick={() => handleMoodChange('worried')}>
                        <Emoji src={worriedImage} alt="걱정돼요" />
                    </SmallInput>
                    <SmallInputLabel>걱정돼요</SmallInputLabel>
                </SmallInputContainer>
          </InputRow>
          </SetContainer>

          {/* 질문선택 부분*/}
          <SetContainer> 
          <Label>03. 질문을 생각해보며 오늘 하루를 되돌아봐요.</Label>
          <Select value={selectedQuestion} onChange={handleQuestionChange}>
              {SetQuestions.map((question, index) => (
                <option key={index} value={question}>
                  {question}
                </option>
              ))}
          </Select>
          <div style={{ width: '97%' }}>
            <TextArea placeholder="오늘의 질문에 대한 답을 적어보세요.(최대 200자)" 
            rows="4"
            value={answer}
            onChange={handleAnswerChange} 
            />
          </div>
          </SetContainer>

          <SetContainer>
          <Label>04. 인상 깊은 책 속 한 줄</Label>
          <div style={{ width: '97%' }}>
            <TextArea placeholder="인상 깊은 한 줄" 
            rows="4" 
            value={short_comment}
            onChange={handleShortComentChange} 
            />
          </div>
          </SetContainer>
          <OpenSet>
             <OpenSetLabel>책 속 한 줄 공개여부 설정</OpenSetLabel>
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

           <SubmitButton onClick={() => handleShortNoteSubmit(memberId, myBookId)}>업로드</SubmitButton>
        </FormContainer>
      )}
      {activeTab === 'detailed' && (
        <FormContainer>
          <SetContainer>                       
            <Label>01. 읽은 페이지</Label>  
            <InputPage> {/* 페이지 입력 부분*/}
            <PageInput placeholder="입력" value={start} onChange={handleStartChange}/>
            <Span>~</Span>
            <PageInput placeholder="입력" value={end} onChange={handleEndChange}/>
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
          <div style={{ width: '100%' }}>
            <Label>02. 제목</Label>
            <Input placeholder="제목 입력" 
            value={title} 
            onChange={handleTitleChange} 
            />
          </div>
          <div style={{ width: '100%' }}>
            <Label>03. 내용</Label>
            <TextArea placeholder="책에 대한 감상을 자유롭게 적어보세요 (최소 80자)" 
            rows="13" 
            value={long_comment} 
            onChange={handleLongCommentChange}
            />
          </div>
          <OpenSet>
             <OpenSetLabel>책 속 한 줄 공개여부 설정</OpenSetLabel>
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
           <div style={{ width: '480px', display: 'flex', justifyContent: 'center', margin: '0 auto', padding: '20px 0' }}>
           <SubmitButton onClick={() => handleLongNoteSubmit(memberId, myBookId)}>업로드</SubmitButton>
           </div>
        </FormContainer>
      )}
      </NoteContainer>
    </AppContainer>
  );
}

export default Note;
