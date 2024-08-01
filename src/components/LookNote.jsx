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
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

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

export const getMood = async (memberId, isbn) => {
    try {
      const response = await axios.get(`/desk/${memberId}/${isbn}/looknote/mood`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch emotion counts:", error);
      return null;
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


const ShortModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
`;

const ShortModalContent = styled.div`
  width:640px;
  height:510px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border-radius: 20px;
  background: #FFF;
  padding: 40px 48px 28px 48px;
  margin-top:230px;
  
  .left-arrow-icon{
    color: #000000;
    font-size: 25px;
  }

  .left-arrow-icon:hover{
            color:#FF6E23;
    }
    
  .right-arrow-icon{
    color: #000000;
    font-size: 25px;
  }

  .right-arrow-icon:hover{
            color:#FF6E23;
    }
`;

const LongModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
`;

const LongModalContent = styled.div`
  width:960px;
  height:800px;
  padding: 20px;
  border-radius: 8px 8px 8px 8px;
  text-align: center;
  border-radius: 20px;
  background: #FFF;
  padding: 40px 48px 28px 48px;
  margin-top:50px;
  overflow: auto;
   
  .close{
    margin-left:800px;
    cursor: default;
  }

  .line1{
    width:850px;
    height:1px;
    margin-top: 40px;
    margin-left: 50px;
    background-color:rgba(112, 115, 124, 0.22);
  }

  .top1{
    width:820px;
    height:50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
    margin-left: 60px;
    background-color: beige;

    .heart{
        margin-left: 550px;
    }

    .bookmark{
        margin-left:10px;
    }
    .chatIcon{
        margin-top: 3px;
        margin-left: 10px;
        font-size: 19px;
    }
  }

  .top2{
    width:820px;
    height:30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 60px;
    background-color: aqua;

    .modalCreateDate{
        font-family: "Pretendard JP";
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        color: #989BA2;
    }

    .modalNickname{
        width:70px;
        height:30px;
        display:flex;
        flex-direction: row;            
        justify-content: center;
        align-items: center;
        color: #01524D;
        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;
        /* Label 2/Bold */
        font-family: "Pretendard JP";
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        //line-height: 138.5%; /* 18.005px */
        //letter-spacing: 0.252px;
        background-color: beige;
    }
  }

  .modalLongWritingBox{
    width:940px;
    height:500px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    background-color:aqua;

    .modalLongWriting{
        width:800px;
        height:490px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: beige;
    }
    .left-arrow-icon{
        color: default;
        font-size: 35px;

    }
    .left-arrow-icon:hover{
            color:#FF6E23;
    
        }
    .right-arrow-icon{
        color: default;
        font-size: 35px;
    
    }
    .right-arrow-icon:hover{
            color:#FF6E23;
        }
  }

  .likeLine{
    width:850px;
    height:50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-left:50px;

    .line2{
        width:380px;
        height:1px;
        background-color:rgba(112, 115, 124, 0.22);
    }

    .heartBox{
        width:90px;
        height:35px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 40px;
        border: 1px solid var(--Line-Solid-Normal, #E1E2E4);
        background: #FFF;

        .likeText{
            color: #989BA2;
            margin-left: 5px;
        }
    }
  }

  .modalBookBox{
    width:400px;
    height:80px;
    border-radius: 4px;
    background: #F2F2F7;
    padding: 16px 24px;
    margin-top: 40px;
    margin-left:240px;
    

    .modalBookInfo{
        width:170px;
        height:50px;
        margin-left:160px;
        background-color: #01524D;
    }

    .modalBookTitle{
        width:160px;
        height:20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-family: "Pretendard JP";
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        background-color: palegreen;
        margin: 0; 
        margin-top: 10px;
        margin-right: 190px;
    }

    .modalBookAuthor{
        width:160px;
        height:20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-family: "Pretendard JP";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        background-color: red;
        margin: 0; 
        margin-right: 190px;
    }
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
const [memberId, setMemberId] = useState('');
const [isbn, setMyBookId] = useState('');
const [short_review_id, setShortReviewId] = useState('');
const [long_review_id, setLongReviewId] = useState('');
const [activeSubNav, setActiveSubNav] = useState('myrecords');
const [isModalOpen, setModalOpen] = useState(false);
const [selectedNote, setSelectedNote] = useState(null);
const [clickedWritingIndex, setClickedWritingIndex] = useState(null);


//더미 데이터
const [shortNotes, setShortNotes] = useState([
    { id: 1, comment: "책을 읽고 느낀 점을 자유롭게 적어주세요.가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라", date: "2021.09.09" },
    { id: 2, comment: "자신의 가치를 발견하고 존중하는 것이 진정한 웰빙의 시작이다.", date: "2024.07.19" },
    { id: 3, comment: "타인의 기대에 부응하는 삶이 아닌, 내가 진정으로 원하는 삶을 추구하는 것이 중요하다. 이는 나의 웰빙과 만족도를 높이는 핵심 요소다.", date: "2024.07.19" },
    { id: 4, comment: "타인의 기대보다 자신의 꿈과 목표를 우선시하는 용기가 필요하다.", date: "2024.07.19" },
    { id: 5, comment: "나를 위한 시간 투자가 곧 삶의 만족도를 높이는 길이다.", date: "2024.07.19" },
    { id: 6, comment: "건강한 자기에만 주번 사람들에게도 긍정적인 영향을 미친다. 나를 돌보는 것이 이기적인 것이 아니라 필수적인 일이다.", date: "2024.07.19" }
  ]);
  
  const [longNotes, setLongNotes] = useState([
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
  

const [emotions, setEmotions] = useState([
  { id: 1, type: "good", displayName: "좋아요", count: 0, img: goodImage },
  { id: 2, type: "okay", displayName: "괜찮아요", count: 0, img: okayImage },
  { id: 3, type: "tired", displayName: "피곤해요", count: 0, img: tiredImage },
  { id: 4, type: "sad", displayName: "슬퍼요", count: 0, img: sadImage },
  { id: 5, type: "worried", displayName: "걱정돼요", count: 0, img: worriedImage },
]);

  


const [isQuestions, setIsQuestions] = useState([
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
      const notes = await getShortNotes(memberId, isbn);
      setShortNotes(notes);
    };
    fetchShortNotes();
  }, []);

useEffect(() => {
    const fetchLongNotes = async () => {
      const notes = await getLongNotes(memberId, isbn);
      setLongNotes(notes);
    };
    fetchLongNotes();
  }, []);

  useEffect(() => {
    const fetchMood = async () => {
      const notes = await getMood(memberId, isbn);
      setIsQuestions(notes);
    };
    fetchMood();
  }, []);


  useEffect(() => {
    const updateEmotionCounts = async () => {
      const data = await getMood();
      if (data) {
        setEmotions(emotions =>
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

const shortGoToPrevious = () => {
   setClickedWritingIndex(prevIndex =>
       prevIndex === 0 ? shortNotes.length - 1 : prevIndex - 1
   );
};

const shortGoToNext = () => {
   setClickedWritingIndex(prevIndex =>
       prevIndex === shortNotes.length - 1 ? 0 : prevIndex + 1
   );
};

const longGoToPrevious = () => {
  setClickedWritingIndex(prevIndex =>
      prevIndex === 0 ? longNotes.length - 1 : prevIndex - 1
  );
};

const longGoToNext = () => {
  setClickedWritingIndex(prevIndex =>
      prevIndex === longNotes.length - 1 ? 0 : prevIndex + 1
  );
};

const emoGoToPrevious = () => {
  setClickedWritingIndex(prevIndex =>
      prevIndex === 0 ? isQuestions.length - 1 : prevIndex - 1
  );
};

const emoGoToNext = () => {
  setClickedWritingIndex(prevIndex =>
      prevIndex === isQuestions.length - 1 ? 0 : prevIndex + 1
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
                         {shortNotes.map((note, index) => (
                             <NoteCard key={note.short_review_id} onClick={()=>showInfo(index)}>
                                  <NoteText>{note.short_comment}</NoteText>
                                  <NoteActions>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                     <NoteDate>{new Date(note.created_at).toLocaleDateString()}</NoteDate>
                                    </div>
                                    <div>
                                     <EditButton><Emoji src={modifyButton} /></EditButton>
                                     <DeleteButton><Emoji src={deleteButton} /></DeleteButton>
                                     </div>
                                  </NoteActions>
                            
                            {clickedWritingIndex === index && (
                                     <ShortModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <ShortModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                            <div className="prevBtn" onClick={shortGoToPrevious} style={{
                                                color: index === 0 ? '#989BA2 ' : '#000000 ',
                                                pointerEvents: index === 0 ? 'none' : 'auto',
                                                }}>
                                                <span className="material-icons left-arrow-icon">
                                                    arrow_circle_left
                                                </span>
                                            </div>
                                            <div className="modalShortWriting">{note.short_comment}</div>
                                            <div className="nextBtn" onClick={shortGoToNext} style={{
                                                    color: index === shortNotes.length - 1 ? '#989BA2 ' : '#000000',
                                                    pointerEvents: index === shortNotes.length - 1 ? 'none' : 'auto',
                                                }}>
                                                <span className="material-icons right-arrow-icon">
                                                    arrow_circle_right
                                                </span>
                                            </div>
                                        </ShortModalContent>
                                     </ShortModalOverlay>    
                                 )}
                    </NoteCard>
                    ))}
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
                            <DeleteButton><Emoji src={deleteButto} /></DeleteButton>
                         </NoteActions>
                     </DetCard>
                 ))*/}
                 
                 {longNotes.map((note,index) => (
                     <DetCard key={note.long_review_id}  onClick={()=>showInfo(index)}>
                         <DetTitle>{note.review_title}</DetTitle>
                         <NoteText>{note.long_text}</NoteText>
                         <NoteActions>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                              <NoteDate>{new Date(note.created_at).toLocaleDateString()}</NoteDate>
                            </div>
                            <div>
                            <EditButton><Emoji src={modifyButton}/></EditButton>
                            <DeleteButton><Emoji src={deleteButton}/></DeleteButton>
                            </div>
                         </NoteActions>
                         {clickedWritingIndex === index && (
                              <LongModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                    <LongModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                          <span className="material-icons close" onClick={closeModal}>
                                            close
                                          </span>
                                          <div className="line1"></div>
                                          <div className="top1">
                                            <div className="modalTitle">{note.review_title}</div>
                                            <div className="heart">
                                                <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                                                  <div className="heartNum">{note.like_count}</div>
                                            </div>
                                                <div className="bookmark">
                                                  <FontAwesomeIcon icon={faBookmark} />
                                                </div>
                                                <span className="material-icons chatIcon">
                                                    chat
                                                </span>
                                            </div>
                                            <div className="top2">
                                                <div className="modalCreateDate">{note.created_at}</div>
                                                <div className="modalNickname">{note.nickname}</div>
                                            </div>
                                            <div className="modalLongWritingBox">
                                                <div className="prevBtn" onClick={longGoToPrevious} style={{
                                                color: index === 0 ? '#989BA2 ' : '#000000 ',
                                                pointerEvents: index === 0 ? 'none' : 'auto',
                                                }}>
                                                    <span className="material-icons left-arrow-icon">
                                                        arrow_circle_left
                                                    </span>
                                                </div>
                                                <div className="modalLongWriting">{note.long_text}</div>
                                                <div className="nextBtn" onClick={longGoToNext} style={{
                                                    color: index === longNotes.length - 1 ? '#989BA2 ' : '#000000',
                                                    pointerEvents: index === longNotes.length - 1 ? 'none' : 'auto',
                                                }}>
                                                    <span className="material-icons right-arrow-icon">
                                                        arrow_circle_right
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="likeLine">
                                                <div className="line2"></div>
                                                <div className="heartBox">
                                                    <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                                                    <div className="likeText">좋아요</div>
                                                </div>
                                                <div className="line2"></div>
                                            </div>

                                            <div className="modalBookBox">
                                                <div className="modalCover"></div>
                                                <div className="modalBookInfo">
                                                    <div className="modalBookTitle">{note.book_title}</div>
                                                    <div className="modalBookAuthor">{note.book_author}</div>
                                                </div>
                                            </div>
                                            
                                  </LongModalContent>
                          </LongModalOverlay>           
                        )}
                     </DetCard>
                    ))}
                </NoteCardContainer>
             )}

             {activeTab === 'emotion' && ( //감정기록
                <FormContainer>
                    
                    <EmotionIconsContainer>
                        {emotions.map(emotion => (
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
                        {isQuestions.map((question,index) => (
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
                                    <ShortModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <ShortModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                            <div className="prevBtn" onClick={emoGoToPrevious}>
                                                <span className="material-icons left-arrow-icon">
                                                    arrow_circle_left
                                                </span>
                                            </div>
                                            <div className="modalShortWriting">{question.question}</div>
                                            <div className="modalShortWriting">{question.answer}</div>
                                            <div className="nextBtn" onClick={emoGoToNext}>
                                                <span className="material-icons right-arrow-icon">
                                                    arrow_circle_right
                                                </span>
                                            </div>
                                        </ShortModalContent>
                                     </ShortModalOverlay>    
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