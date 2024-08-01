import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../api";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import modifyButton from '../assets/modify.png';
import deleteButton from '../assets/delete.png';
import info from '../assets/info.png';
import noteImage from '../assets/note.png';
import contract from '../assets/contract.png';
import goodImage from '../assets/좋아요.png';
import okayImage from '../assets/괜찮아요.png';
import tiredImage from '../assets/피곤해요.png';
import sadImage from '../assets/슬퍼요.png';
import worriedImage from '../assets/걱정돼요.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const getShortNotes = async (memberId, isbn) => {
    try {
      const response = await axios.get(`/desk/${memberId}/${isbn}/note/short`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch short notes:", error);
      return [];
    }
  };

export const getLongNotes = async (memberId, isbn) => {
    try {
      const response = await axios.get(`/desk/${memberId}/${isbn}/note/long`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch short notes:", error);
      return [];
    }
  }; 

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
  margin-top: 30px;
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

const TabsContainer = styled.div`
  display: flex;
  width: 800px;
  justify-content: center;
  //border-bottom: 1px solid #ddd;
  margin-right: 410px;
  margin-top: 80px;
`;

const Tab = styled.button`
    background-color: transparent;
    color: ${props => (props.active ? '#FF6E23' : '#000')};
    border: none;
    border-bottom: ${props => (props.active ? '2px solid #FF6E23' : 'none')};
    padding: 10px 20px;
     cursor: pointer;
      font-size: 16px;
     font-weight: ${props => (props.active ? 'bold' : 'normal')};
     margin: 0 10px;

  &:hover {
    color: #FF6E23;
  }
`;


const NoteCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈을 허용하여 한 줄에 3개씩 배치되도록 함 */
  justify-content: space-between; /* 카드 사이의 간격을 고르게 분배 */
  width: 800px;
  margin-top: 20px;
`;

const NoteCard = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: calc(33.333% - 20px); /* 3개의 카드가 한 줄에 배치되도록 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const DetTitle = styled.div`
color: var(--kakao-logo, #000);
font-family: "Pretendard JP";
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 144.5%; /* 26.01px */
letter-spacing: -0.004px;
`;

const DetCard = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: calc(50% - 20px); /* 한 줄에 2개의 카드가 배치되도록 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const NoteText = styled.p`
    font-family: "Pretendard JP";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 24px */
    letter-spacing: 0.144px;
    color: #333;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 최대 5줄까지만 표시 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
`;


const Emoji = styled.img`
  width: 19px;
  height: 19px;
`;

const NoteDate = styled.div`
overflow: hidden;
color: #989BA2;
font-feature-settings: 'ss10' on;
text-overflow: ellipsis;

/* Label 2/Regular */
font-family: "Pretendard JP";
font-size: 13px;
font-style: normal;
font-weight: 400;
line-height: 138.5%; /* 18.005px */
letter-spacing: 0.252px;
margin-top: auto;
margin-right: 8px;
`;

const NoteActions = styled.div`
  display: flex;
  justify-content:space-between;
  align-items: flex-end;
  margin-top: auto;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  &:hover {
    color: #333;
  }
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

//여기부터 감정기록

const EmotionContainer = styled.div`
display: flex;
  flex-wrap: wrap; /* 줄바꿈을 허용하여 한 줄에 3개씩 배치되도록 함 */
  justify-content: space-between; /* 카드 사이의 간격을 고르게 분배 */
  width: 800px;
  margin-top: 5px;
`;

const EmotionIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 97%;
  margin-bottom: 20px;
`;

const EmotionIcon = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 144px;
  height: 64px;
  flex-shrink: 0;
  background-color: #fef3ec; /* 배경색 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
  padding-top: 10px;
`;

const EmotionImgCountWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EmotionImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const EmotionCount = styled.div`
color: #FF6E23;
text-align: center;
font-feature-settings: 'ss10' on;

/* Body 2/Normal - Medium */
font-family: "Pretendard JP";
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: 146.7%; /* 22.005px */
letter-spacing: 0.144px;
`;

const EmotionText = styled.div`
color: var(--kakao-logo, #000);
text-align: center;
font-feature-settings: 'ss10' on;

/* Caption 1/Regular */
font-family: "Pretendard JP";
font-size: 13px;
font-style: bold;
font-weight: 400;
line-height: 133.4%; /* 16.008px */
letter-spacing: 0.302px;
margin-top: 8px;

`;

const QuestionCard = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  width: calc(50% - 20px); /* 한 줄에 2개의 카드가 배치되도록 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const QuestionText = styled.div`
color: #FF6E23;
font-feature-settings: 'ss10' on;

/* Body 1/Reading - Bold */
font-family: "Pretendard JP";
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 162.5%; /* 26px */
letter-spacing: 0.091px;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const AnswerText = styled.div`
overflow: hidden;
color: var(--kakao-logo, #000);
font-feature-settings: 'ss10' on;
text-overflow: ellipsis;
white-space: nowrap;
margin: 20px 0px;

/* Body 2/Reading - Regular */
font-family: "Pretendard JP";
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 24px */
letter-spacing: 0.144px;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

// 여기부터 팝업창


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
`;

const ModalContent = styled.div`
  width:450px;
  height:510px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border-radius: 20px;
  background: #FFF;
  padding: 40px 48px 28px 48px;
  margin-top:230px;

  .modalCover{
    width:104px;
    height:156px;
  }

  .modalTitle{
    color: var(--kakao-logo, #000);
    text-align: center;
    font-feature-settings: 'ss10' on;
    /* Body 1/Reading - Bold */
    font-family: "Pretendard JP";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 162.5%; /* 26px */
    letter-spacing: 0.091px;
  }

  .modalAuthor{
    color: var(--kakao-logo, #000);
    text-align: center;
    font-feature-settings: 'ss10' on;
    /* Label 2/Medium */
    font-family: "Pretendard JP";
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 138.5%; /* 18.005px */
    letter-spacing: 0.252px;
  }

  .modalPublisher{
    color: rgba(60, 60, 67, 0.60);
    font-feature-settings: 'ss10' on;
    /* Label 2/Regular */
    font-family: "Pretendard JP";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 138.5%; /* 18.005px */
    letter-spacing: 0.252px;
  }

  .modalAddBtn{
    display: flex;
    flex-direction: row;
    width: 170px;
    height: 20px;
    padding: 20px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border:none;
    border-radius: 4px;
    background: #2EEA7E;
    color: #FFF;
    margin-left:140px;

    text-align: center;
    font-feature-settings: 'ss10' on;
    /* Label 1/Normal - Bold */
    font-family: "Pretendard JP";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;
  }

  .line{
    width:450px;
    height:1px;
    margin-top: 15px;
    background-color: rgba(112, 115, 124, 0.22);
  }

  .modalContents{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    align-self: stretch;
    overflow: hidden;
    color: var(--kakao-logo, #000);

    font-feature-settings: 'ss10' on;
    text-overflow: ellipsis;
    font-family: "Pretendard JP";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 19.5px */
    letter-spacing: 0.252px;
  }
`;



function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  

export function LookNote() {
const navigate = useNavigate();
const query = useQuery();
const [activeTab, setActiveTab] = useState('simple');
const [isCheck, setCheck] = useState(false);
const [checked, setChecked] = useState(false);
const [shortNotes, setShortNotes] = useState([]);
const [longNotes, setLongNotes] = useState([]);
const [memberId, setMemberId] = useState('');
const [isbn, setMyBookId] = useState('');
const [short_review_id, setShortReviewId] = useState('');
const [long_review_id, setLongReviewId] = useState('');
const [activeSubNav, setActiveSubNav] = useState('myrecords');
const [isModalOpen, setModalOpen] = useState(false);
const [selectedNote, setSelectedNote] = useState(null);
const [clickedWritingIndex, setClickedWritingIndex] = useState(null);


//더미 데이터
const [dummyNotes, setDummyNotes] = useState([
    { id: 1, comment: "책을 읽고 느낀 점을 자유롭게 적어주세요.가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라", date: "2021.09.09" },
    { id: 2, comment: "자신의 가치를 발견하고 존중하는 것이 진정한 웰빙의 시작이다.", date: "2024.07.19" },
    { id: 3, comment: "타인의 기대에 부응하는 삶이 아닌, 내가 진정으로 원하는 삶을 추구하는 것이 중요하다. 이는 나의 웰빙과 만족도를 높이는 핵심 요소다.", date: "2024.07.19" },
    { id: 4, comment: "타인의 기대보다 자신의 꿈과 목표를 우선시하는 용기가 필요하다.", date: "2024.07.19" },
    { id: 5, comment: "나를 위한 시간 투자가 곧 삶의 만족도를 높이는 길이다.", date: "2024.07.19" },
    { id: 6, comment: "건강한 자기에만 주번 사람들에게도 긍정적인 영향을 미친다. 나를 돌보는 것이 이기적인 것이 아니라 필수적인 일이다.", date: "2024.07.19" }
  ]);
  
const [dummyLongNotes, setDummyLongNotes] = useState([
    { long_review_id: 1, 
      isbn: "9791188331793",
      review_title: "글 제목 입력", 
      long_text: "'나를 위해 살지 않으면 남을 위해 살게 된다' 책을 읽고 난 후, 나의 웰빙에 대한 새로운 관점을 얻게 되었다. 우리는 종종 타인의 기대에 부응하려고 하며, 그 과정에서 자신의 진정한 꿈과 목표를 잃어버리곤 한다.", 
      created_at: "2024.07.21" },
    { long_review_id: 2, 
      isbn: "9791188331793",
      review_title: "글 제목 입력",
      long_text: "이건 두번째 칸이에요.>=<이건 두번째 칸이에요.>=<이건 두번째 칸이에요.>=<이건 두번째 칸이에요.>=<이건 두번째 칸이에요.>=<이건 두번째 칸이에요.>=<", 
      created_at: "2024.07.21" },
   { long_review_id: 3, 
     isbn: "9791188331793",
     review_title: "글 제목 입력",
     long_text: "이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ", 
     created_at: "2024.07.21" }  
  ]);
  

const [dummyEmotions, setDummyEmotions] = useState([
  { id: 1, type: "good", displayName: "좋아요", count: 0, img: goodImage },
  { id: 2, type: "okay", displayName: "괜찮아요", count: 0, img: okayImage },
  { id: 3, type: "tired", displayName: "피곤해요", count: 0, img: tiredImage },
  { id: 4, type: "sad", displayName: "슬퍼요", count: 0, img: sadImage },
  { id: 5, type: "worried", displayName: "걱정돼요", count: 0, img: worriedImage },
]);

const fetchEmotionCounts = async (memberId, isbn) => {
  try {
    const response = await axios.get(`/desk/${memberId}/${isbn}/looknote/mood`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch emotion counts:", error);
    return null;
  }
};
  


const [dummyQuestions, setDummyQuestions] = useState([
    { id: 1,
      question: "오늘의 질문은 최대 2줄", 
      answer: "자연 속의 평온함을 느끼며 휴식을 취하는 것만큼 좋은 것은 없습니다. 현대의 바쁜 생활 속에서 잠시라도 자연을 접하는 순간은 큰 힘이 됩니다. 새로운 에너지를 얻고 재충전할 수 있는 기회가 됩니다.",
      date: "2024.07.21", 
      mood: goodImage },
    { id: 2, 
      question: "오늘의 질문은 최대 2줄", 
      answer: "나의 대답은 최대 3줄까지지만 \"자세한 기록\" 페이지와 동일", 
      date: "2024.07.21", 
      mood: sadImage }
  ]);
  


useEffect(() => {
    const memberIdFromQuery = query.get("memberId");
    const myBookIdFromQuery = query.get("isbn");
    if (memberIdFromQuery && myBookIdFromQuery) {
      setMemberId(memberIdFromQuery);
      setMyBookId(myBookIdFromQuery);
    }
  }, [query]);


useEffect(() => {
    const fetchShortNotes = async () => {
      const notes = await getShortNotes(memberId);
      setShortNotes(notes);
    };
    fetchShortNotes();
  }, []);

useEffect(() => {
    const fetchLongNotes = async () => {
      const notes = await getLongNotes(memberId);
      setLongNotes(notes);
    };
    fetchLongNotes();
  }, []);


  useEffect(() => {
    const updateEmotionCounts = async () => {
      const data = await fetchEmotionCounts();
      if (data) {
        setDummyEmotions(emotions =>
          emotions.map(emotion => ({
            ...emotion,
            count: data[emotion.type + "_count"] || 0
          }))
        );
      }
    };
    updateEmotionCounts();
  }, []);
  

  const showInfo = (index) => {
    setClickedWritingIndex(index === clickedWritingIndex ? null : index);
};


const closeModal = () => {
   setClickedWritingIndex(null);
 };

 const goToPrevious = () => {
   setClickedWritingIndex(prevIndex =>
       prevIndex === 0 ? longNotes.length - 1 : prevIndex - 1
   );
};

const goToNext = () => {
   setClickedWritingIndex(prevIndex =>
       prevIndex === longNotes.length - 1 ? 0 : prevIndex + 1
   );
};


const handleItemClick = (path) => {
        navigate(path);
};   





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
                    <SubNavItem active={activeSubNav === 'record'} onClick={() => { handleItemClick("/afterlogin/note"); setActiveSubNav('record'); }}>
                        {activeSubNav === 'record' && <img src={noteImage} alt="active" />}
                        기록하기</SubNavItem>
                    <SubNavItem active={activeSubNav === 'myrecords'} onClick={() => { handleItemClick("/afterlogin/looknote"); setActiveSubNav('myrecords'); }}>
                        {activeSubNav === 'myrecords' && <img src={contract} alt="active" />}
                        내 기록보기</SubNavItem>
                </SubNav>  
                
                <TabsContainer>
                <Tab active={activeTab === 'simple'} onClick={() => setActiveTab('simple')}>하루 기록</Tab>
                <Tab active={activeTab === 'emotion'} onClick={() => setActiveTab('emotion')}>감정 기록</Tab>
                <Tab active={activeTab === 'detailed'} onClick={() => setActiveTab('detailed')}>자유 기록</Tab>
                </TabsContainer>
            
                 {activeTab === 'simple' && (  //하루 기록
                 <NoteCardContainer>
                         {dummyNotes.map(note  => (
                             <NoteCard key={note.id}>
                                  <NoteText>{note.comment}</NoteText>
                                  <NoteActions>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                     <NoteDate>{note.date}</NoteDate>
                                    </div>
                                    <div>
                                     <EditButton><Emoji src={modifyButton} /></EditButton>
                                     <DeleteButton><Emoji src={deleteButton} /></DeleteButton>
                                     </div>
                                  </NoteActions>
                             </NoteCard>
                            ))}
                 {/*shortNotes.map(note => (
                   <NoteCard key={note.short_review_id}>
                     <NoteText>{note.short_comment}</NoteText>
                     <NoteActions>
                      <div style={{ display: 'flex', alignItems: 'center'}}>
                       <NoteDate>{new Date(note.created_at).toLocaleDateString()}</NoteDate>
                      </div>
                      <div>
                       <EditButton><Emoji src={modifyButton} /></EditButton>
                       <DeleteButton><Emoji src={deleteButtonButton} /></DeleteButton>
                      </div>
                     </NoteActions>
                   </NoteCard>  // 서버열리면 이쪽으로 변경
                 ))*/}
               </NoteCardContainer>
             )}
            {activeTab === 'detailed' && ( //자유 기록
                <NoteCardContainer>
                    {/*longNotes.map(note => (
                      <DetCard key={note.long_review_id} onClick={() => handleNoteClick(note)}>
                         <DetTitle>{note.review_title}</DetTitle>
                         <NoteText>{note.long_text}</NoteText>
                         <NoteActions>
                            <NoteDate>{new Date(note.created_at).toLocaleDateString()}</NoteDate>
                            <EditButton><Emoji src={modifyButton} /></EditButton>
                            <DeleteButton><Emoji src={deleteButton} /></DeleteButton>
                         </NoteActions>
                     </DetCard>
                 ))*/}
                 
                 {dummyLongNotes.map((note,index) => (
                     <DetCard key={note.long_review_id}  onClick={()=>showInfo(index)}>
                         <DetTitle>{note.review_title}</DetTitle>
                         <NoteText>{note.long_text}</NoteText>
                         <NoteActions>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                              <NoteDate>{note.created_at}</NoteDate>
                            </div>
                            <div>
                            <EditButton><Emoji src={modifyButton}/></EditButton>
                            <DeleteButton><Emoji src={deleteButton}/></DeleteButton>
                            </div>
                         </NoteActions>
                         {clickedWritingIndex === index && (
                                     <ModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <ModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                            <button className="prevBtn" onClick={goToPrevious}>
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                            <div className="modalShortWriting">{note.long_text}</div>
                                            <button className="nextBtn" onClick={goToNext}>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </ModalContent>
                                     </ModalOverlay>
                                 )}
                     </DetCard>
                    ))}
                </NoteCardContainer>
             )}

             {activeTab === 'emotion' && ( //감정기록
                <FormContainer>
                    
                    <EmotionIconsContainer>
                        {dummyEmotions.map(emotion => (
                            <EmotionIcon key={emotion.id}>
                                <EmotionImgCountWrapper>
                                    <EmotionImg src={emotion.img}/>
                                    <EmotionCount>{emotion.count}</EmotionCount>
                                </EmotionImgCountWrapper>
                                <EmotionText>{emotion.displayName}</EmotionText>
                            </EmotionIcon>
                    ))}
                    </EmotionIconsContainer>
                    <EmotionContainer> 
                        {dummyQuestions.map((question,index) => (
                        <QuestionCard key={question.id}  onClick={()=>showInfo(index)}>
                            <QuestionText>Q. {question.question}</QuestionText>
                            <AnswerText>A. {question.answer}</AnswerText>
                            <NoteActions>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <NoteDate>{question.date}</NoteDate>
                                <Emoji src={question.mood} />
                            </div>
                            <div>
                                <EditButton><Emoji src={modifyButton} /></EditButton>
                                <DeleteButton><Emoji src={deleteButton} /></DeleteButton>
                            </div>
                            </NoteActions>
                            {clickedWritingIndex === index && (
                                     <ModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <ModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                            <button className="prevBtn" onClick={goToPrevious}>
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                            <div className="modalShortWriting">{question.question}</div>
                                            <div className="modalShortWriting">{question.answer}</div>
                                            <button className="nextBtn" onClick={goToNext}>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </ModalContent>
                                     </ModalOverlay>
                                 )}
                        </QuestionCard>
                         ))}
                    </EmotionContainer>
                </FormContainer>
             )}

            </NoteContainer>       

        </AppContainer>  
    )
    
}