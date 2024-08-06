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
import qImage from '../assets/Q.png';
import aImage from '../assets/A.png';
import logo from "../assets/Logo.png";


export const getShortNotes = async (memberId, isbn) => {
    try {
      const response = await axios.get(`/desk/${memberId}/${isbn}/looknote/short`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch short notes:", error);
      return [];
    }
  };

export const getLongNotes = async (memberId, isbn) => {
    try {
      const response = await axios.get(`/desk/${memberId}/${isbn}/looknote/long`);
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

    p{
        cursor: default;


        &:hover {
            color: gray;
          }
    }

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
  justify-content: flex-start; /* 카드 사이의 간격을 고르게 분배 */
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
  width:600px;
  height:520px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border-radius: 20px;
  background: #FFF;
  padding: 40px 48px 28px 48px;
  margin-top:230px;
  
  .top0{
    width: 500px;
    display: flex;
    flex-direction: row;
    //background: aqua;
    margin-left: 50px;
    margin-top: 10px;

    .detail{
      width: 200px;
      font-size: 15px;
      //background: beige;
      margin-right: 50px;
      margin-top: 10px;
      overflow: hidden;
      color: #989BA2;
      font-feature-settings: 'ss10' on;
      text-overflow: ellipsis;


      font-family: "Pretendard JP";
      font-style: normal;
      font-weight: 400;
      line-height: 138.5%; /* 18.005px */
      letter-spacing: 0.252px;
    }
    
    .close{
    margin-left:260px;
    font-size: 33px;
    cursor: default;
    //background-color: magenta;
    }
  }

  .line1{
    width:500px;
    height:1px;
    margin-top: 20px;
    margin-left: 50px;
    background-color:rgba(112, 115, 124, 0.22);
  }

  .top1{
    width:500px;
    height:20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 50px;
   // background-color: beige;
  }

  .top2{
    width:500px;
    height:20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 50px;
   // background-color: aqua;

    .modalCreateDate{
        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        color: #989BA2;
    }

    /* .modalNickname{
        width:70px;
        height:20px;
        display:flex;
        flex-direction: row;            
        justify-content: center;
        align-items: center;
        color: #01524D;
        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;
        font-family: "Pretendard JP";
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        line-height: 138.5%; 
        letter-spacing: 0.252px;
       background-color: beige;
    } */
  }

  .modalShortWritingBox{
    width:600px;
    height:300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    //background-color: aqua;

    .modalShortWriting{
        width:500px;
        height:300px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      //  background-color: beige;
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
        
    /* .prevBtn, .nextBtn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    } */

    .modalBookBox{
    width: 500px;
    height: 100px;
    border-radius: 4px;
    background: #F2F2F7;
    margin-left: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;


    .modalInerBox{
      display: flex;
      align-items: center;
      justify-content : flex-start;

      .modalCover{
      border-radius: 4px;
      width: 40px;
      height: 60px;
      background: #FFF;

      img{
        width:40px;
        height:60px;
      }
    }
    

    .modalBookInfo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: auto;
        margin-left:20px;
        //background-color: #01524D;
    }

    .modalBookTitle{
        display: inline-flex;
        width: auto;
        height:20px;
        overflow: hidden;
        color: var(--kakao-logo, #000);
        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;
        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        align-items: center;
        //background-color: palegreen;
        
    }

    .modalBookAuthor{
        display: inline-flex;
        width: auto;
        height:20px;
        overflow: hidden;
        color: #989BA2;
        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;

        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        align-items: center;
        //background-color: red;
    }
    }
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

const LongModalWrapper = styled.div`
  width: 960px;
  height: 800px;
  padding: 30px;
  padding-right: 0px;
  border-radius: 20px;
  background: #FFF;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`;


const LongModalContent = styled.div`
  flex: 1;
  overflow: auto;
  //padding: 40px 48px 28px 48px;
   
  .top0{
    width: 850px;
    display: flex;
    flex-direction: row;
    //background: aqua;
    margin-left: 50px;
    margin-top: 10px;

    .detail{
      width: 200px;
      font-size: 15px;
      margin-right: 50px;
      margin-top: 10px;
      text-align: left;
      overflow: hidden;
      color: #989BA2;
      font-feature-settings: 'ss10' on;
      text-overflow: ellipsis;
      //background: beige;


      font-family: "Pretendard JP";
      font-style: normal;
      font-weight: 400;
      line-height: 138.5%; /* 18.005px */
      letter-spacing: 0.252px;
    }
    
    .close{
    margin-left:570px;
    font-size: 33px;
    cursor: default;
    //background-color: magenta;
    }
  }

  .line1{
    width:850px;
    height:1px;
    margin-top: 20px;
    margin-left: 50px;
    background-color:rgba(112, 115, 124, 0.22);
  }

  .top1{
    width:850px;
    height:50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
    margin-left: 50px;
    //background-color: beige;


    .modalTitle{
      color: var(--kakao-logo, #000);

      /* Headline 1/Bold */
      font-family: "Pretendard JP";
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 144.5%; /* 26.01px */
      letter-spacing: -0.004px;
    }
  }

  .top2{
    width:850px;
    height:30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 50px;
    //background-color: aqua;

    .modalCreateDate{
      overflow: hidden;
      color: #989BA2;
      font-feature-settings: 'ss10' on;
      text-overflow: ellipsis;
      font-family: "Pretendard JP";
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 138.5%; /* 18.005px */
      letter-spacing: 0.252px;
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
   //background-color:aqua;

    .modalLongWriting{
      overflow: auto;
      color: var(--kakao-logo, #000);
      font-feature-settings: 'ss10' on;
      text-overflow: ellipsis;

      /* Body 2/Reading - Regular */
      font-family: "Pretendard JP";
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 200%; /* 24px */
      letter-spacing: 0.144px;
        width:850px;
        height:500px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
       //background-color: beige;
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


    .line2{
        width:380px;
        height:1px;
        background-color:rgba(112, 115, 124, 0.22);
    }

    .modalBookBox{
    width: 500px;
    height: 100px;
    border-radius: 4px;
    background: #F2F2F7;
    margin-left: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 20px;



    .modalInerBox{
      display: flex;
      align-items: center;
      justify-content : flex-start;

      .modalCover{
      border-radius: 4px;
      width: 40px;
      height: 60px;
      background: #FFF;

      img{
        width:40px;
        height:60px;
      }
    }
    

    .modalBookInfo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: auto;
        margin-left:20px;
        //background-color: #01524D;
    }

    .modalBookTitle{
        display: inline-flex;
        width: auto;
        height:20px;
        overflow: hidden;
        color: var(--kakao-logo, #000);
        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;
        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        align-items: center;
        //background-color: palegreen;
        
    }

    .modalBookAuthor{
        display: inline-flex;
        width: auto;
        height:20px;
        overflow: hidden;
        color: #989BA2;
        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;

        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        align-items: center;
        //background-color: red;
    }
    }
  }
`;

const EmogModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
`;

const EmogModalContent = styled.div`
  width:600px;
  height:520px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border-radius: 20px;
  background: #FFF;
  padding: 40px 48px 28px 48px;
  margin-top:230px;
  
  .top0{
    width: 500px;
    display: flex;
    flex-direction: row;
    //background: aqua;
    margin-left: 50px;
    margin-top: 10px;

    .detail{
      width: 200px;
      font-size: 15px;
      //background: beige;
      margin-right: 50px;
      margin-top: 10px;
      overflow: hidden;
      color: #989BA2;
      font-feature-settings: 'ss10' on;
      text-overflow: ellipsis;


      font-family: "Pretendard JP";
      font-style: normal;
      font-weight: 400;
      line-height: 138.5%; /* 18.005px */
      letter-spacing: 0.252px;
    }
    
    .close{
    margin-left:260px;
    font-size: 33px;
    cursor: default;
    //background-color: magenta;
    }
  }

  .line1{
    width:500px;
    height:1px;
    margin-top: 20px;
    margin-left: 50px;
    background-color:rgba(112, 115, 124, 0.22);
  }

  .top1{
    width:500px;
    height:20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 50px;
   // background-color: beige;
  }

  .top2{
    width:500px;
    height:20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 50px;
   // background-color: aqua;

    .modalCreateDate{
        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        color: #989BA2;
    }
  }

  .modalShortWritingBox{
    width:600px;
    height:300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    //background-color: aqua;

    .line3{
    width:500px;
    border-top: 3px dotted #ccc; /* 점선 설정 */
    margin: 20px 0;
  }

    .QNA{
        margin-top : 100px;
        width:500px;
        height:300px;
        display: flex;
        flex-direction: column;
        //background: aqua;

      .QnaShow{
        display: flex;
        flex-direction: row;
      }
      
      .iconQBox{
        width:50px;
        height:60px;
        //background: magenta;
      }

      .iconABox{
        width:50px;
        height:200px;
        //background: green;
      }
      
      .icon{
        width: 30px;
        height: 30px;
      }

      .modalQuestion{
        color: var(--kakao-logo, #000);
        font-feature-settings: 'ss10' on;

        /* Body 2/Reading - Bold */
        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: 160%; /* 24px */
        letter-spacing: 0.144px;
        width:450px;
        height:60px;
        display: flex;
        flex-direction: row;
        text-align: left;
        //background-color: blue;
        
      }


      .modalAnswer{
        color: var(--kakao-logo, #000);
        font-feature-settings: 'ss10' on;

        /* Body 2/Reading - Regular */
        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 24px */
        letter-spacing: 0.144px;
        width:450px;
        height:200px;
        display: flex;
        flex-direction: row;
        text-align: left;
        //background-color: beige;
      }

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
        
    /* .prevBtn, .nextBtn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    } */

    .modalBookBox{
    width: 500px;
    height: 100px;
    border-radius: 4px;
    background: #F2F2F7;
    margin-left: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    //padding: 10px;


    .modalInerBox{
      display: flex;
      align-items: center;
      justify-content : flex-start;

      .modalCover{
      border-radius: 4px;
      width: 40px;
      height: 60px;
      background: #FFF;

      img{
        width: 40px;
        height: 60px;
      }
    }
    

    .modalBookInfo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: auto;
        margin-left:20px;
        //background-color: #01524D;
    }

    .modalBookTitle{
        display: inline-flex;
        width: auto;
        height:20px;
        overflow: hidden;
        color: var(--kakao-logo, #000);
        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;
        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        align-items: center;
        //background-color: palegreen;
        
    }

    .modalBookAuthor{
        display: inline-flex;
        width: auto;
        height:20px;
        overflow: hidden;
        color: #989BA2;
        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;

        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        align-items: center;
        //background-color: red;
    }
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
//const [isbn, setMyBookId] = useState('');
const [short_review_id, setShortReviewId] = useState('');
const [long_review_id, setLongReviewId] = useState('');
const [activeSubNav, setActiveSubNav] = useState('myrecords');
const [isModalOpen, setModalOpen] = useState(false);
const [selectedNote, setSelectedNote] = useState(null);
const [clickedWritingIndex, setClickedWritingIndex] = useState(null);
const [shortNotes, setShortNotes] = useState([]);
const [longNotes, setLongNotes] = useState([]);
const [good, setGood] = useState('');
const [okay, setOkay] = useState('');
const [tired, setTired] = useState('');
const [sad, setSad] = useState('');
const [worried, setWorried] = useState('');
const [feelings, setFeelings] = useState([]);
const location = useLocation();
const token = location.state?.token || '';
const refresh=location.state?.refresh||'';
const isbn=location.state?.isbn || '';
const [emogi, setEmogi] = useState([]);

//더미 데이터
// const [short, setShort] = useState([
//     { short_review_id: 1, img:"", book_title:'해리포터', book_author:'롤링', isbn: "9791188331793" , created_at: "2024-07-28T05:41:31.341060+09:00", short_comment: "책을 읽고 느낀 점을 자유롭게 적어주세요.가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라"},
//     { short_review_id: 2, img:"", book_title:'나를 위해 살지 않으면 남을 위해 살게 된다', book_author:'빅터프랭클', isbn: "9791188331793" , created_at: "2024-07-28T05:41:31.341060+09:00", short_comment: "자신의 가치를 발견하고 존중하는 것이 진정한 웰빙의 시작이다."},
//     { short_review_id: 3, img:"", book_title:'해리포터', book_author:'롤링', isbn: "9791188331793" , created_at: "2024-07-28T05:41:31.341060+09:00", short_comment: "타인의 기대에 부응하는 삶이 아닌, 내가 진정으로 원하는 삶을 추구하는 것이 중요하다. 이는 나의 웰빙과 만족도를 높이는 핵심 요소다."},
//     { short_review_id: 4, img:"", book_title:'해리포터', book_author:'롤링', isbn: "9791188331793" , created_at: "2024-07-28T05:41:31.341060+09:00", short_comment: "타인의 기대보다 자신의 꿈과 목표를 우선시하는 용기가 필요하다."},
//     { short_review_id: 5, img:"", book_title:'해리포터', book_author:'롤링', isbn: "9791188331793" , created_at: "2024-07-28T05:41:31.341060+09:00", short_comment: "나를 위한 시간 투자가 곧 삶의 만족도를 높이는 길이다."},
//     { short_review_id: 6, img:"", book_title:'해리포터', book_author:'롤링', isbn: "9791188331793" , created_at: "2024-07-28T05:41:31.341060+09:00", short_comment: "건강한 자기에만 주번 사람들에게도 긍정적인 영향을 미친다. 나를 돌보는 것이 이기적인 것이 아니라 필수적인 일이다."}
//   ]);
  
  // const [long, setLong] = useState([
  //   { long_review_id: 1, 
  //     isbn: "9791188331793",
  //     book_title: "나를 위해 살지 않으면 남을 위해 살게 된다",
  //     book_author: "빅터프랭클",
  //     review_title: "사람은 미래에 대한 기대가 있어야만 세상을 살아갈 수 있다.", 
  //     long_text: "'나를 위해 살지 않으면 남을 위해 살게 된다' 책을 읽고 난 후, 나의 웰빙에 대한 새로운 관점을 얻게 되었다. 우리는 종종 타인의 기대에 부응하려고 하며, 그 과정에서 자신을 잃어버리기 쉽다. 이 책은 자신을 위한 삶의 중요성을 강조하며, 스스로의 행복과 만족을 우선시하는 것이 왜 중요한지에 대해 다시 한 번 생각해 보게 한다.나의 웰빙은 단순히 신체적 건강을 넘어선다. 정신적, 감정적 건강 또한 중요한 부분이다. 이 책을 통해 나는 나 자신에게 더 많은 시간을 투자하고, 내가 진정으로 원하는 것을 추구하는 것이 얼마나 중요한지 깨달았다. 타인의 기대에 얽매이지 않고, 나만의 목표와 꿈을 향해 나아갈 때 비로소 진정한 웰빙을 실현할 수 있다. 또한, 자기 자신을 돌보는 것이 이기적인 것이 아님을 깨달았다. 내가 행복하고 건강할 때, 주변 사람들에게도 긍정적인 영향을 미칠 수 있다. 따라서 나의 웰빙을 위해 나를 위한 시간을 갖고, 나의 가치를 존중하며 살아가는 것이 중요하다. 이 책은 나에게 새로운 동기부여가 되었고, 앞으로의 삶에서 나를 위해 더 많이 살 것을 다짐하게 만들었다.", 
  //     created_at: "2024-07-28T05:41:31.341060+09:00" },
  //   { long_review_id: 2, 
  //     isbn: "9791188331793",
  //     review_title: "글 제목 입력",
  //     book_title: "나를 위해 살지 않으면 남을 위해 살게 된다",
  //     book_author: "빅터프랭클",
  //     long_text: "이건 두번째 칸이에요.>=<이건 두번째 칸이에요.>=<이건 두번째 칸이에요.>=<이건 두번째 칸이에요.>=<이건 두번째 칸이에요.>=<이건 두번째 칸이에요.>=<", 
  //     created_at: "2024-07-28T05:41:31.341060+09:00" },
  //  { long_review_id: 3, 
  //    isbn: "9791188331793",
  //    review_title: "글 제목 입력",
  //    book_title: "나를 위해 살지 않으면 남을 위해 살게 된다",
  //    book_author: "빅터프랭클",
  //    long_text: "이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ이건 세번째 칸이랍니다? ㅇ0ㅇ", 
  //    created_at: "2024-07-28T05:41:31.341060+09:00" }  
  // ]);
  

// const [emo, setEmo] = useState([
//   { id: 1, type: "good", displayName: "좋아요", count: 0, img: goodImage },
//   { id: 2, type: "okay", displayName: "괜찮아요", count: 0, img: okayImage },
//   { id: 3, type: "tired", displayName: "피곤해요", count: 0, img: tiredImage },
//   { id: 4, type: "sad", displayName: "슬퍼요", count: 0, img: sadImage },
//   { id: 5, type: "worried", displayName: "걱정돼요", count: 0, img: worriedImage },
// ]);

  


const [isQue, setIsQue] = useState([
    { id: 1,
      ShortReviewList:{
      question: "책을 읽고 나서 내 진로에 대한 새로운 아이디어나 방향성이 생겼다면, 그것을 구체적으로 어떻게 실행할 수 있을까요?", 
      answer: "진로에 대한 새로운 아이디어가 떠올랐다. 먼저, 관련 업계의 동향을 조사하고 필요한 기술과 지식을 정리해야겠다. 작은 프로젝트를 통해 실전 경험을 쌓고, 인턴십이나 프리랜서 활동을 통해 실력을 키워야지. 전문가들과 네트워킹하며 조언을 얻고 꾸준히 학습하며 목표를 향해 나아가야겠다. 오늘은 정말 유익한 하루였다.",
      created_at: "2024-07-28T05:41:31.341060+09:00", 
      title: "나를 위해 살지 않으면 남을 위해 살게 된다",
      author: "빅터프랭클",
      mood: goodImage} },
    { id: 1,
      ShortReviewList:{
      question: "책을 읽고 나서 내 진로에 대한 새로운 아이디어나 방향성이 생겼다면, 그것을 구체적으로 어떻게 실행할 수 있을까요?", 
      answer: "진로에 대한 새로운 아이디어가 떠올랐다. 먼저, 관련 업계의 동향을 조사하고 필요한 기술과 지식을 정리해야겠다. 작은 프로젝트를 통해 실전 경험을 쌓고, 인턴십이나 프리랜서 활동을 통해 실력을 키워야지. 전문가들과 네트워킹하며 조언을 얻고 꾸준히 학습하며 목표를 향해 나아가야겠다. 오늘은 정말 유익한 하루였다.",
      created_at: "2024-07-28T05:41:31.341060+09:00", 
      title: "나를 위해 살지 않으면 남을 위해 살게 된다",
      author: "빅터프랭클",
      mood: sadImage} }
  ]);
  


// useEffect(() => {
//     const memberIdFromQuery = query.get("memberId");
//     const myBookIdFromQuery = query.get("isbn");
//     if (memberIdFromQuery && myBookIdFromQuery) {
//       setMemberId(memberIdFromQuery);
//       setMyBookId(myBookIdFromQuery);
//     }
//   }, [query]);

const fetchShortNotes = async () => {
  try{
    const response=await axiosInstance.get(`/desk/books/${isbn}/note/short`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    setShortNotes(response.data);
  }
  catch(e){
    console.log(e);
    alert("짧은글");
  }
 
};

const fetchLongNotes=async()=>{
  try{
    const response=await axiosInstance.get(`/desk/books/${isbn}/note/long`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    setLongNotes(response.data);
  }
  catch(e){
    console.log(e);
    alert("긴글");
  }
}

const fetchEmotionNotes=async()=>{
  try{
    const response=await axiosInstance.get(`/desk/books/${isbn}/note/mood`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    const newEmogi = [
      { type: "good", displayName: "좋아요", count: response.data.good_count, img: goodImage },
      { type: "okay", displayName: "괜찮아요", count: response.data.okay_count, img: okayImage },
      { type: "tired", displayName: "피곤해요", count: response.data.tired_count, img: tiredImage },
      { type: "sad", displayName: "슬퍼요", count: response.data.sad_count, img: sadImage },
      { type: "worried", displayName: "걱정돼요", count: response.data.worried_count, img: worriedImage },
    ];

    setEmogi(newEmogi);
    setFeelings(response.data.short_notes);

  }
  catch(e){
    console.log(e);
  }
}

useEffect(() => {
    console.log(isbn);
    fetchShortNotes();
    fetchLongNotes();
    fetchEmotionNotes();
  }, []);

// useEffect(() => {
//     const fetchLongNotes = async () => {
//       const notes = await getLongNotes(memberId, isbn);
//       setLongNotes(notes);
//     };
//     fetchLongNotes();
//   }, []);

//   useEffect(() => {
//     const fetchMood = async () => {
//       const notes = await getMood(memberId, isbn);
//       setIsQuestions(notes);
//     };
//     fetchMood();
//   }, []);


//   useEffect(() => {
//     const updateEmotionCounts = async () => {
//       const data = await getMood();
//       if (data) {
//         setEmotions(emotions =>
//           emotions.map(emotion => ({
//             ...emotion,
//             count: data[emotion.type + "_count"] || 0
//           }))
//         );
//       }
//     };
//     updateEmotionCounts();
//   }, []);
  

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
      prevIndex === 0 ? feelings.length - 1 : prevIndex - 1
  );
};

const emoGoToNext = () => {
  setClickedWritingIndex(prevIndex =>
      prevIndex === feelings.length - 1 ? 0 : prevIndex + 1
  );
};

const handleItemClick = (path, token, refresh, isbn, id) => {
  navigate(path, { state: { token, refresh, isbn, id } });
};


const deleteNoteShort = async (token, isbn, id) => {
  try {
      await axiosInstance.delete(`/desk/books/${isbn}/note/short/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      alert("노트가 삭제되었습니다.");
      // 노트 삭제 후 필요한 추가 작업이 있으면 여기에 추가
  } catch (error) {
      console.log("노트 삭제 실패:", error);
      alert("노트 삭제에 실패했습니다.");
  }
};

const deleteNoteLong = async (token, isbn, id) => {
  try {
      await axiosInstance.delete(`/desk/books/${isbn}/note/long/${id}`,{
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      alert("노트가 삭제되었습니다.");
      // 노트 삭제 후 필요한 추가 작업이 있으면 여기에 추가
  } catch (error) {
      console.log("노트 삭제 실패:", error);
      alert("노트 삭제에 실패했습니다.");
  }
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


    return(

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
                <Tab active={activeTab === 'emotion'} onClick={() => setActiveTab('emotion')}>감정 기록</Tab>
                <Tab active={activeTab === 'detailed'} onClick={() => setActiveTab('detailed')}>자유 기록</Tab>
                </TabsContainer>
            
                 {activeTab === 'simple' && (  //하루 기록
                    <NoteCardContainer>
                         {shortNotes.map((note, index) => ( 
                             <NoteCard key={note.id} onClick={()=>showInfo(index)}>
                                  <NoteText>{note.short_note.short_comment}</NoteText>
                                  <NoteActions>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                     <NoteDate onClick={(e) => e.stopPropagation()}>{new Date(note.created_at).toLocaleDateString()}</NoteDate>
                                    </div>
                                    <div>
                                    <EditButton onClick={(e) => {e.stopPropagation(); handleItemClick("/afterlogin/looknote/modifynote", token, refresh, isbn , note.id); }}>
                                      <Emoji src={modifyButton} />
                                    </EditButton>
                                    <DeleteButton onClick={(e) => {e.stopPropagation(); deleteNoteShort(token, isbn, note.id);}}><Emoji src={deleteButton} /></DeleteButton>
                                     </div>
                                  </NoteActions>
                            
                            {clickedWritingIndex === index && (
                                     <ShortModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <ShortModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                        <div className="top0">
                                          <span className="detail"> 책 속 한 줄 상세보기</span>
                                          <span className="material-icons close" onClick={closeModal}>
                                            close
                                          </span>
                                        </div>

                                          <div className="line1"></div>
                                          <div className="top1">
                                            </div>
                                            <div className="top2">
                                                <div className="modalCreateDate">{new Date(note.created_at).toLocaleDateString()}</div>
                      
                                            </div>

                                            <div className="modalShortWritingBox">  
                                                <div className="prevBtn" onClick={shortGoToPrevious} style={{
                                                color: index === 0 ? '#989BA2 ' : '#000000 ',
                                                pointerEvents: index === 0 ? 'none' : 'auto',
                                                }}>
                                                    <span className="material-icons left-arrow-icon">
                                                        arrow_circle_left
                                                    </span>
                                                </div>
                                                <div className="modalShortWriting">{note.short_note.short_comment}</div>
                                                <div className="nextBtn" onClick={shortGoToNext} style={{
                                                    color: index === shortNotes.length - 1 ? '#989BA2 ' : '#000000',
                                                    pointerEvents: index === shortNotes.length - 1 ? 'none' : 'auto',
                                                }}>
                                                    <span className="material-icons right-arrow-icon">
                                                        arrow_circle_right
                                                    </span>
                                                </div>
                                              </div>   
                                            <div className="modalBookBox">
                                               <div className="modalInerBox">
                                                <div className="modalCover">
                                                  <img src={note.book.thumbnail}></img>
                                                </div>
                                                <div className="modalBookInfo">
                                                    <div className="modalBookTitle">{note.book.title}</div>
                                                    <div className="modalBookAuthor">{note.book.author.replace(/[\[\]']+/g, '')}</div>
                                                </div>
                                                </div>
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
                 {longNotes.map((note,index) => (
                     <DetCard key={note.id}  onClick={()=>showInfo(index)}>
                         <DetTitle>{note.long_note.long_title}</DetTitle>
                         <NoteText>{note.long_note.long_text}</NoteText>
                         <NoteActions>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                              <NoteDate>{new Date(note.created_at).toLocaleDateString()}</NoteDate>
                            </div>
                            <div>
                            <EditButton onClick={(e) => {e.stopPropagation(); handleItemClick("/afterlogin/looknote/modifynote", token, refresh,  isbn , note.id); }}>
                                      <Emoji src={modifyButton} />
                            </EditButton>
                            <DeleteButton onClick={(e) => {e.stopPropagation(); deleteNoteLong(token, isbn, note.id);}}><Emoji src={deleteButton} /></DeleteButton>
                            </div>
                         </NoteActions>
                         {clickedWritingIndex === index && (
                              <LongModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                    <LongModalWrapper onClick={(e) => e.stopPropagation()}>
                                     <LongModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                          <div className="top0">
                                              <span className="detail"> 자유기록 상세보기</span>
                                              <span className="material-icons close" onClick={closeModal}>
                                               close
                                              </span>
                                          </div>
                                          <div className="line1"></div>
                                          <div className="top1">
                                            <div className="modalTitle">{note.long_note.long_title}</div>
                                            </div>
                                            <div className="top2">
                                                <div className="modalCreateDate">{new Date(note.created_at).toLocaleDateString()}</div>
                                                <div className="modalNickname">{note.writer}</div>
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
                                                <div className="modalLongWriting">{note.long_note.long_text}</div>
                                                <div className="nextBtn" onClick={longGoToNext} style={{
                                                    color: index === longNotes.length - 1 ? '#989BA2 ' : '#000000',
                                                    pointerEvents: index === longNotes.length - 1 ? 'none' : 'auto',
                                                }}>
                                                    <span className="material-icons right-arrow-icon">
                                                        arrow_circle_right
                                                    </span>
                                                </div>
                                    
                                            </div>
                                            <div className="modalBookBox">
                                               <div className="modalInerBox">
                                                <div className="modalCover">
                                                  <img src={note.book.thumbnail}></img>
                                                </div>
                                                <div className="modalBookInfo">
                                                    <div className="modalBookTitle">{note.book.title}</div>
                                                    <div className="modalBookAuthor">{note.book.author.replace(/[\[\]']+/g, '')}</div>
                                                </div>
                                                </div>
                                            </div>
                                    
                                  </LongModalContent>
                                </LongModalWrapper>
                          </LongModalOverlay>           
                        )}
                     </DetCard>
                    ))}
                </NoteCardContainer>
             )}

             {activeTab === 'emotion' && ( //감정기록
                <FormContainer>
                    
                    <EmotionIconsContainer>
                        {emogi.map(emotion => (
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
                        {feelings.map((question,index) => (

                        <QuestionCard key={question.id}  onClick={()=>showInfo(index)}>
                            <QuestionText>Q. {question.short_note.question}</QuestionText>
                            <AnswerText>A. {question.short_note.answer}</AnswerText>
                            <NoteActions>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                     <NoteDate onClick={(e) => e.stopPropagation()}>{new Date(question.created_at).toLocaleDateString()}</NoteDate>
                                     {/* <EmotionImg onClick={(e) => e.stopPropagation()} src={question.ShortReviewList.mood}/> */}
                                    </div>
                                    <div>
                                    <EditButton onClick={(e) => {e.stopPropagation(); handleItemClick("/afterlogin/looknote/modifynote", token, refresh,  isbn , question.id); }}>
                                      <Emoji src={modifyButton} />
                                    </EditButton>
                                    <DeleteButton onClick={(e) => {e.stopPropagation(); deleteNoteShort(token, isbn, question.id);}}><Emoji src={deleteButton} /></DeleteButton>
                                     </div>
                            </NoteActions>

                                  {clickedWritingIndex === index && (
                                     <EmogModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <EmogModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                        <div className="top0">
                                          <span className="detail"> 오늘의 질문 상세보기</span>
                                          <span className="material-icons close" onClick={closeModal}>
                                            close
                                          </span>
                                        </div>

                                          <div className="line1"></div>
                                          <div className="top1">
                                            </div>
                                            <div className="top2">
                                                <div className="modalCreateDate">{new Date(question.created_at).toLocaleDateString()}</div>
                      
                                            </div>

                                            <div className="modalShortWritingBox">  
                                                <div className="prevBtn" onClick={emoGoToPrevious} style={{
                                                color: index === 0 ? '#989BA2 ' : '#000000 ',
                                                pointerEvents: index === 0 ? 'none' : 'auto',
                                                }}>
                                                    <span className="material-icons left-arrow-icon">
                                                        arrow_circle_left
                                                    </span>
                                                </div>
                                                <div className="QNA">
                                                  <div className="QnaShow">
                                                    <div className="iconQBox"><img className="icon" src={qImage}/></div>
                                                    <div className="modalQuestion">{question.short_note.question}</div>
                                                  </div>
                                                  <div className="line3"></div>
                                                  <div className="QnaShow">
                                                    <div className="iconABox"><img className="icon" src={aImage}/></div>
                                                    <div className="modalAnswer">{question.short_note.answer}</div>
                                                  </div>
                                                </div>
                                                <div className="nextBtn" onClick={emoGoToNext} style={{
                                                    color: index === feelings.length - 1 ? '#989BA2 ' : '#000000',
                                                    pointerEvents: index === feelings.length - 1 ? 'none' : 'auto',
                                                }}>
                                                    <span className="material-icons right-arrow-icon">
                                                        arrow_circle_right
                                                    </span>
                                                </div>
                                              </div>   
                                            <div className="modalBookBox">
                                               <div className="modalInerBox">
                                                <div className="modalCover">
                                                  <img src={question.book.thumbnail}></img>
                                                </div>
                                                <div className="modalBookInfo">
                                                    <div className="modalBookTitle">{question.book.title}</div>
                                                    <div className="modalBookAuthor">{question.book.author.replace(/[\[\]']+/g, '')}</div>
                                                </div>
                                                </div>
                                            </div>
                                        </EmogModalContent>
                                     </EmogModalOverlay>    
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