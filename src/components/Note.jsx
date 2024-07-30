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

`

const SetQuestions = [
  "오늘 읽은 책이 나에게 어떤 도움이 될 수 있을까요?",
  "책을 읽으면서 떠오른 나의 개인적인 경험이나 기억은 무엇인가요?",
  "이 책을 읽으면서 가장 강렬하게 느꼈던 감정은 무엇인가요?",
  "이 책이 나의 희망이나 두려움에 어떤 영향을 주었나요?",
  "책의 내용을 통해 느낀 위로나 치유는 무엇인가요?",
  "이 책이 나의 가치관이나 신념에 어떤 영향을 미쳤나요?"
];


const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #F2F2F7;
  
  &:focus {
    border-color: #989BA2;
    outline: none;
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
  border: 1px solid #ccc;
  background-color: ${({ active }) => (active ? '#FFF2EB' : '#F2F2F7')}; // active prop에 따라 배경 색 변경
  border: ${({ active }) => (active ? '1px solid #FF6E23' : '1px solid #ccc')}; // active prop에 따라 테두리 색 변경
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

const SubmitDiv = styled.div`
  width: 480px;
  display: flex;
  justify-content: center; // 가운데 정렬
  margin: 0 auto; // 가운데 정렬을 위한 마진
  padding: 20px 0; // 상하 패딩 (선택 사항)
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
  const[mood,setMood]=useState('');
  const[answer,setAnswer]=useState('');
  const[title,setTitle]=useState('');
  const[short_comment,setShortComment]=useState('');
  const[long_comment,setLongComment]=useState('');
  const[memberId,setMemberId]=useState('');
  const[myBookId,setMyBookId]=useState('');
  const[short_review_id,setShortReviewId]=useState('');
  const[long_review_id,setLongReviewId]=useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(SetQuestions[0]);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const memberIdFromQuery = query.get("memberId");
    const myBookIdFromQuery = query.get("myBookId");
    if (memberIdFromQuery && myBookIdFromQuery) {
      setMemberId(memberIdFromQuery);
      setMyBookId(myBookIdFromQuery);
    }
  }, [query]);


  const handleItemClick = (path) => {
    navigate(path);
  };

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
  

const handleOptionChange = (event) => { //글 공개여부설정
    setSelectedOption(event.target.value);
  };

const handleMoodChange=(selectedMood)=>{
    setMood(selectedMood);
};


// 질문 선택
const handleQuestionChange = (event) => {
  setSelectedQuestion(event.target.value);
  setQuestion(event.target.value);
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


  // 짧은기록 넘겨주기 함수 
  const handleShortNoteSubmit = async (memberId, myBookId) => {
    try{
      const newShortNote = {
        short_review_id : short_review_id,
        memberId : memberId,
        myBookId : myBookId,
        start_page : start,
        end_page : end,
        mood : mood,
        question : question,
        answer : answer,
        short_comment : short_comment,
        created_at: new Date().toISOString(),
        open: selectedOption === "public", // 공개여부
        checked: checked // 읽기 완료 체크박스
      }
      
      const response = await axiosInstance.post(`/desk/${memberId}/${myBookId}/note/short`, newShortNote);
      console.log(response.data);
      // fetchNotes(); // 전체 노트를 get 하는 함수

    } catch(e){
      console.log(e);
  }

  };

  // 자세한기록 넘겨주기 함수
  const handleLongNoteSubmit = async (memberId, myBookId) => {
    try {
      const newLongNote = {
        long_review_id: long_review_id,
        member_id: memberId,
        my_book_id: myBookId,
        start_page: start,
        end_page: end,
        review_title: title,
        long_text: long_comment,
        created_at: new Date().toISOString(),
        open: selectedOption === "public" // boolean 값으로 설정
      };
      const response = await axiosInstance.post(`/desk/${memberId}/${myBookId}/note/long`, newLongNote);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  


  return ( 
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
      <TabsContainer>
        <Tab active={activeTab === 'simple'} onClick={() => setActiveTab('simple')}>짧은 기록</Tab>
        <Tab active={activeTab === 'detailed'} onClick={() => setActiveTab('detailed')}>자세한 기록</Tab>
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
                    <SmallInput  active={mood === '좋아요'} onClick={() => handleMoodChange('좋아요')}>
                        <Emoji src={goodImage} alt="좋아요" />  
                    </SmallInput>
                    <SmallInputLabel>좋아요</SmallInputLabel>
                </SmallInputContainer>

                <SmallInputContainer>
                    <SmallInput active={mood === '괜찮아요'} onClick={() => handleMoodChange('괜찮아요')}>
                        <Emoji src={okayImage} alt="괜찮아요" />
                    </SmallInput>
                    <SmallInputLabel>괜찮아요</SmallInputLabel>
                </SmallInputContainer>
                
                <SmallInputContainer>
                   <SmallInput active={mood === '피곤해요'} onClick={() => handleMoodChange('피곤해요')}>
                        <Emoji src={tiredImage} alt="피곤해요" />
                    </SmallInput>
                <SmallInputLabel>피곤해요</SmallInputLabel>
                </SmallInputContainer>

                <SmallInputContainer>
                    <SmallInput active={mood === '슬퍼요'} onClick={() => handleMoodChange('슬퍼요')}>
                        <Emoji src={sadImage} alt="슬퍼요" />
                    </SmallInput>
                    <SmallInputLabel>슬퍼요</SmallInputLabel>
                </SmallInputContainer>

                <SmallInputContainer>
                    <SmallInput active={mood === '걱정돼요'} onClick={() => handleMoodChange('걱정돼요')}>
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
          <Label>04. 인상 깊은 한 줄</Label>
          <div style={{ width: '97%' }}>
            <TextArea placeholder="인상 깊은 한 줄" 
            rows="4" 
            value={short_comment}
            onChange={handleShortComentChange} 
            />
          </div>
          </SetContainer>
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
