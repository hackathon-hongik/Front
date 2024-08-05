import { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from "react";
import styled from "styled-components";
import findLogo from "../assets/findLogo.png";
import {bookAPI} from "../api";
import { axiosInstance } from '../api';
import axios from 'axios';
import logo from "../assets/Logo.png";



const RecommendationPage = styled.div`
    width:1620px;
    height:930px;
    display: flex;
    flex-direction: column;
    align-items: center;
    //background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;
    background-color:  #FFF4F3;

    .text1{
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
        margin-top: 40px;
        width:400px;
        height:50px;
        }
`;

const Header = styled.div`
  width:1600px;
    height:120px;
    display: flex;
    flex-direction: row;
    /*background-color: aqua;*/
    .logo{
    width: 145px;
    height: 44px;
    margin-top:58px;
    margin-left: 300px;
    background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;
    }


    .nav{
    width:500px;
    height:50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top:45px;
    margin-left: 620px;
    /*background-color: antiquewhite;*/
        .nav a{
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 142.9%; /* 20.006px */
        letter-spacing: 0.203px;
        }

        .nav a:hover{
        color:gray;
        cursor: default;
        }

        .orangeText{
            color: #FF6E23;
        }

        .orangeText:hover{
            color:gray;
            cursor: default;
        }

        .nav li{
        list-style-type: none;
        margin-left: 24px;
        }
    
    }
    .mypageBtn{
    width:112px;
    height: 34px;
    display: flex;
    padding: 8px 18px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    color: #FFF;
    border: none;
    text-align: center;
    font-feature-settings: 'ss10' on;
    font-family: "Pretendard JP";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;
    background: #FF6E23;
    position: relative;
    }

    .toggleList{
      width:112px;
    height:110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    border-radius: 8px 8px 0px 0px;
    background: #FFF;

    }
`;

const RecommendationList = styled.div`
  width: 520px;
  height: 600px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //background-color: blue; 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QuestionContainer = styled.div`
  width: 420px;
  height: 64px;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  //background-color:red; 
`;

const RadioButton = styled.input`
  display: none;  //진짜 라디오버튼은 보이지 않도록 설정
  &:checked + label .bigCircle {
    background-color: white;
    border-color: #ff6e23;
  }

  &:checked + label .smallCircle {
    background-color: #ff6e23;
    border-color: #ff6e23;
  }

  &:checked + label {
    background-color: #ff6e23;
    color: white;
  }
`;

const Label = styled.label`    //선택칸
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-right: 10px;
  border: 2px solid #ddd;
  border-radius: 30px;
  cursor: pointer;
  font-family: "Pretendard JP";
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;   

  &:hover {
    background-color: #ff6e23;
    color: white;
  }

  .worry{
    color: var(--kakao-logo, #000);
    font-feature-settings: 'ss10' on;
    /* Body 1/Normal - Medium */
    font-family: "Pretendard JP";
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: 150%; /* 24px */
    letter-spacing: 0.091px;
    margin-left:30px;
  }
`;

const Circle = styled.span`   //내가 만든 가짜 라디오버튼
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #ddd;
  display: inline-block;
  margin-left: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .smallCircle{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: none;
    display: inline-block;
    background-color: white;
  }
`;

const RecommendBtn=styled.button`
        display: flex;
        width: 194px;
        height: 56px;
        flex-direction: row;
        justify-content: center;  
        align-items: center; 
        border-radius: 8px;
        background: ${props => (props.disabled ? '#989BA2':'#FF6E23')};   //props를 전달받아서 disable일때는 회색으로, able상태일때는 주황색으로 버튼 색상 변경
        margin-top:20px;                             
        border: none;
        color: #FFF;
        text-align: center;
        font-family: "Pretendard JP";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
`;

export function Recommend() {
    const navigate = useNavigate();
    const [isCheck, setCheck] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [index,setIndex]=useState(6);
    const location = useLocation();
    const token = location.state?.token || '';
    const refresh = location.state?.refresh || '';

  //   useEffect(() => {
  //     console.log(token);
  //     console.log(refresh);

  // }, []);

    const questions = [
      "진로 - 앞으로의 진로가 막막해요.",
      "인간관계 - 주변 사람들과의 관계가 힘들어요.",
      "경제 - 돈 관리와 투자에 어려움을 겪고 있어요.",
      "건강 - 건강을 어떻게 챙기면 좋을지 고민이에요",
      "커리어 - 직장 생활이 너무 버거워요"
    ];

    const categories=[
      "진로",
      "인간관계",
      "경제",
      "건강",
      "커리어"
    ];

    const searchData=async(index)=>{
      console.log(token)
      //console.log(index);
        try{
          const response=await axiosInstance.get(`/recommendation/${index}/book/`);
          const results = response.data.map(doc => ({
            id:doc.id,
            isbn:doc.book.isbn,
            title:doc.book.title,
            author: doc.book.author,
            date:doc.book.date,
            publisher:doc.book.publisher,
            thumbnail: doc.book.thumbnail,
            contents: doc.book.content,
           
          }));   

          console.log(response.data);

          navigate("/afterlogin/recommendation/recommendresult", {state:{results, token, refresh, category:selectedQuestion}});  //selectedQuestion-> 어떤 고민에 대한 추천인지를 알기 위해서
    
  }
        catch(e){
          console.log(e);
        }
    }
  
    const handleItemClick=(path,token,refresh,isbn)=>{
      navigate(path,{state:{token,refresh,isbn}});
  };
  
    const handleRadioChange = (index) => {
        setSelectedQuestion(categories[index]);
        setIndex(index+1);
    };

    const handleSearch=(index)=>{
        searchData(index);
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
    return (
    <RecommendationPage>   
        <Header>
        <img className="logo" src ={logo} onClick={()=>handleItemClick('/afterlogin',token)}/>

  
          <ul className="nav">
            <li>
              <a className="orangeText" onClick={() => handleItemClick('/afterlogin/mylibrary')}>내 서재</a>
            </li>
            <li>
              <a onClick={() => handleItemClick("/afterlogin/community")}>커뮤니티</a>
            </li>
            <li>
              <div className="buttonToggle">
                <button className="mypageBtn" onClick={() => { setCheck((e) => !e) }}>마이페이지</button>
                {isCheck && (
                  <div className="toggleList">
                  <p onClick={()=>handleItemClick('/afterlogin/changenickname',token)}>닉네임 변경</p>
                  <p>로그아웃</p>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </Header>
        <div className="text1">최근 어떤 고민이 있나요?</div>
        <RecommendationList>
          {questions.map((question, index) => (
            
            <QuestionContainer key={index}>
              <RadioButton 
              type="radio" 
              id={`question-${index}`} 
              name="question"
              onChange={() => handleRadioChange(index)}  //라디오 버튼을 클릭시 맞춤처방 버튼 활성화하기 위해
              />
              <Label htmlFor={`question-${index}`}>
                <div className="worry">
                    {question}
                </div>
                <Circle className="bigCircle">
                    <div className="smallCircle"></div>
                </Circle> 
              </Label>
            </QuestionContainer>
          ))}
        <RecommendBtn disabled={selectedQuestion === null} onClick={()=>handleSearch(index)}>맞춤책 처방받기</RecommendBtn>  {/*label이 선택되지 않았으면(null) disabled에 true, 그리고 이걸 styled component에 props처럼 전달*/}
        </RecommendationList>                                                                                                                                            
      </RecommendationPage>
    );
  }
  