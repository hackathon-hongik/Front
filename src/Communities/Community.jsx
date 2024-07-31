import { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from "react";
import styled from "styled-components";
import findLogo from "../assets/findLogo.png";
import {bookAPI} from "../api";
import { axiosInstance } from '../api';
import orange_banner from "../assets/orange_banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const short = [
    {
        id: 1,
        short_comment: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:"해리포터",
        book_author:"롤링"

    },
    {
        id: 2,
        short_comment: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:"해리포터",
        book_author:"롤링"
    },
    {
        id: 3,
        short_comment: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:"해리포터",
        book_author:"롤링"
    },
    {
        id: 4,
        short_comment: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    {
        id: 5,
        short_comment: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    {
        id: 6,
        short_comment: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    {
        id: 7,
        short_comment: "안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"닉네임",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    {
        id: 8,
        short_comment: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    {
        id: 9,
        short_comment: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    {
        id: 10,
        short_comment: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    // 더 많은 샘플 데이터 추가
];

const long=[
    {
        id:1,
        review_title:'으아아아 힘들어',
        long_text:'이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만',
        created_at:'2024.07.31',
        nickname:'닉네임',
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    {
        id:2,
        review_title:'으아아아 힘들어',
        long_text:'이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만',
        created_at:'2024.07.31',
        nickname:'닉네임',
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    {
        id:3,
        review_title:'으아아아 힘들어',
        long_text:'이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만',
        created_at:'2024.07.31',
        nickname:'닉네임',
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    {
        id:4,
        review_title:'으아아아 힘들어',
        long_text:'나를 위해 살지 않으면 남을 위해 살게 된다 책을 읽고 난 후, 나의 웰빙에 대한 새로운 관점을 얻게 되었다. 우리는 종종 타인의 기대에 부응하려고 하며, 그 과정에서 자신을 잃어버리기 쉽다. 이 책은 자신을 위한 삶의 중요성을 강조하며, 스스로의 행복과 만족을 우선시하는 것이 왜 중요한지에 대해 다시 한 번 생각해 보게 한다. 나의 웰빙은 단순히 신체적 건강을 넘어선다. 정신적, 감정적 건강 또한 중요한 부분이다. 이 책을 통해 나는 나 자신에게 더 많은 시간을 투자하고, 내가 진정으로 원하는 것을 추구하는 것이 얼마나 중요한지 깨달았다. 타인의 기대에 얽매이지 않고, 나만의 목표와 꿈을 향해 나아갈 때 비로소 진정한 웰빙을 실현할 수 있다. 또한, 자기 자신을 돌보는 것이 이기적인 것이 아님을 깨달았다. 내가 행복하고 건강할 때, 주변 사람들에게도 긍정적인 영향을 미칠 수 있다. 따라서 나의 웰빙을 위해 나를 위한 시간을 갖고, 나의 가치를 존중하며 살아가는 것이 중요하다. 이 책은 나에게 새로운 동기부여가 되었고, 앞으로의 삶에서 나를 위해 더 많이 살 것을 다짐하게 만들었다.',
        created_at:'2024.07.31',
        nickname:'닉네임',
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
    {
        id:5,
        review_title:'으아아아 힘들어',
        long_text:'이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제',
        created_at:'2024.07.31',
        nickname:'닉네임',
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링'
    },
]


const CommunityPage=styled.div`
    width:1620px;
    height:930px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;
    //background-color:  #FFF4F3;

`;

const Header = styled.div`
  width:1600px;
    height:120px;
    display: flex;
    flex-direction: row;
    /*background-color: aqua;*/
    .logo{
    width:64px;
    height: 48px;
    margin-top:58px;
    margin-left: 300px;
    background-color: grey;
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
    height:210px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    border-radius: 8px 8px 0px 0px;
    background: #FFF;
    }
`;

const TitleBanner=styled.div`
    width:1200px;
    height:150px;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color:#FF6E23 ;
    margin-top:40px;

    p{
        color: #FFF;
        text-align: center;
        /* Display 2/Bold */
        font-family: "Pretendard JP";
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: 130%; /* 52px */
        letter-spacing: -1.128px;
    }
`;

const BtnBanner=styled.div`
    width:1200px;
    height:50px;
    display:flex;
    flex-direction: row;
    align-items: center;
    background-color: #FFEBE0;

    .meWrite{
        width:110px;
        height:50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left:850px;
        //background-color: aqua;

        .meWriteText{
            cursor: pointer;
        }
    }

    .meScrap{
        width:160px;
        height:50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left:30px;
        //background-color: red;

        .meScrapText{
            cursor: pointer;
        }
    }

    .material-symbols-outlined{
        width: 32px;
        height: 32px;
        margin-top:8px;
        cursor: pointer;
    }
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
    margin-top:50px;
`;

const Tab = styled.button`
    // 마우스로 눌렀을 때 색상, 글자색 변경
    background-color: ${props => (props.active ? '#FF6E23' : '#F2F2F7')};
    color: ${props => (props.active ? '#FFF' : '##989BA2')};
    display: inline-flex;
    height: 45px;
    padding: 6px 10px;
    width: 160px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 40px;
    border: none;
    margin: 0px;
    cursor: pointer;
    line-height: 32px;

    font-family: "Pretendard JP";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 144.5%; /* 26.01px */
    letter-spacing: -0.004px;

    // 마우스 호버 설정
   &:hover {
    background-color: ${props => (props.active ? '#FF6E23' : '#ddd')};
  }
`;

const OrangeBanner=styled.div`
    width:1200px;
    height:200px;
    margin-top:30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #FF6E23;
    .text3{
    width:800px;
    height:170px;
    margin-left:119px;
    /* background-color: #2EEA7E; */
    }

.first_row{
    color: #FFF;
    font-feature-settings: 'ss10' on;
    /* Title 2/Bold */
    font-family: "Pretendard JP";
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 135.8%; /* 38.024px */
    letter-spacing: -0.661px;
}

.second_row{
    color: #FFF;
    font-feature-settings: 'ss10' on;
    /* Title 2/Medium */
    font-family: "Pretendard JP";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 135.8%;
    letter-spacing: -0.661px;
}

.bannerPic{
    width: 300px;
    height: 170px;
    margin-left: 450px;
    margin-right: 100px;

}
`

const ShortWritingList = styled.div`
  width: 1200px;
  height:800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 50px;
  background-color: beige;
`;

const BelowShortWritingList = styled.div`
  width: 1200px;
  height: 1200px;
  background-color: antiquewhite;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 20px; /* OrangeBanner의 높이를 피하기 위한 여백 */
`;


const ShortWritingCard=styled.div`
    width:310px;
    height:270px;
    margin-left: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px 8px 8px 8px;
    border-top: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
    border-right: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
    border-left: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
    background: #FFF;
    
    &:nth-child(3n) {
    margin-right: 0;
    }
    background-color: aqua;

    .shortWriting{
        width:290px;
        height:120px;
        overflow: auto;
        margin-top:10px;
        background-color: rebeccapurple;

    }

    .likePick{
        width:290px;
        height:70px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: red;
        
        .nickName{
        width:70px;
        height:50px;
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
        .heart{
        width:50px;
        height:50px;
        background-color: blue;
        }

        .bookmark{
            margin-left: 10px;
        }   
    }

    .bookInfo{
        width:310px;
        height:70px;
        display: flex;
        flex-direction: column;
        //justify-content: center;
        //align-items: center;
        border-radius: 0px 0px 8px 8px;
        border-right: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
        border-bottom: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
        border-left: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
        background: #F2F2F7;
    }

    .bookTitle{
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
        margin-right:20px;
    }

    .bookAuthor{
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
        margin-right:20px;
    }


`;
const LongWritingList = styled.div`
  width: 1200px;
  height:1000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 50px;
  background-color: beige;
`;

const BelowLongWritingList = styled.div`
  width: 1200px;
  height: 1200px;
  background-color: antiquewhite;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 20px; /* OrangeBanner의 높이를 피하기 위한 여백 */
`;

const LongWritingCard=styled.div`
    width:510px;
    height:266px;
    margin-left: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px 8px 8px 8px;
    border-top: 1px rgba(112, 115, 124, 0.22);

    border-right: 1px rgba(112, 115, 124, 0.22);

    border-left: 1px rgba(112, 115, 124, 0.22);

    background: #FFF;
    
    &:nth-child(2n) {
    margin-right: 0;
    }
    background-color: aqua;

    .title{
        width:480px;
        color: var(--kakao-logo, #000);
        font-feature-settings: 'ss10' on;
        /* Body 1/Reading - Bold */
        font-family: "Pretendard JP";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 162.5%; /* 26px */
        letter-spacing: 0.091px;
        margin-top:10px;
    }
    .longWriting{
        width:480px;
        height:100px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        align-self: stretch;
        overflow: hidden;
        color: var(--kakao-logo, #000);
        margin-left:15px;
        margin-top: 10px;

        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;
        font-family: "Pretendard JP";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 24px */
        letter-spacing: 0.144px;
        background-color: red;
    }

    .likePick{
        width:480px;
        height:50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: beige;
        
        .createDate{
            font-family: "Pretendard JP";
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: 138.5%; /* 18.005px */
            letter-spacing: 0.252px;
            color: #989BA2;
        }

        
        .nickName{
            width:70px;
            height:50px;
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

        .heart{
        width:50px;
        height:50px;
        margin-left: 230px;
        background-color: blue;
        }

        .bookmark{
            margin-left: 10px;
        }
        
        .chatIcon{
            margin-top:3px;
            margin-left:15px;
        }
        

        .material-icons{
            font-size: 20px;
        }
    }
    .bookInfo{
        width:510px;
        height:70px;
        display: flex;
        flex-direction: column;
        //justify-content: center;
        //align-items: center;
        border-radius: 0px 0px 8px 8px;
        border-right: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
        border-bottom: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
        border-left: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
        background: #F2F2F7;
        }

        .bookTitle{
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

        .bookAuthor{
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
`;


export function Community(){
    const navigate=useNavigate();
    const [isCheck, setCheck] = useState(false);
    const [activeTab, setActiveTab] = useState('simple');
    const [shortWritings,setShortWritings]=useState([]);
    const [longWritings,setLongWritings]=useState([]);

    const handleItemClick = (path) => {
        navigate(path);
      };
    
      const fetchShortData=async()=>{
        try{
            const response=await axiosInstance.get('/community/short/');
            setShortWritings(response.data);

        }
        catch(e){
            console.log(e);
        }
      };

      const fetchLongData=async()=>{
        try{
            const response=await axiosInstance.get('/community/long/');
            setLongWritings(response.data);

        }
        catch(e){
            console.log(e);
        }
      };

    return(
        <CommunityPage>
            <Header>
                <div className="logo">
                    <p>로고</p>
                </div>
        
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
                            <p>닉네임 변경</p>
                            <p>1:1 문의</p>
                            <p>로그아웃</p>
                            <p>회원탈퇴</p>
                        </div>
                        )}
                    </div>
                    </li>
                </ul>
            </Header>

            <TitleBanner>
                <p>커뮤니티</p>
            </TitleBanner>
            <BtnBanner>
                <div className="meWrite" onClick={()=>handleItemClick('/afterlogin/community/communitywrite')}>
                    <p className="meWriteText">내가 쓴 글</p>
                    <span class="material-symbols-outlined">
                        arrow_right
                    </span>
                </div>
                <div className="meScrap" onClick={()=>handleItemClick('/afterlogin/community/communityscrap')}>
                    <p className="meScrapText">내가 스크랩한 글</p>
                    <span class="material-symbols-outlined">
                        arrow_right
                    </span>
                </div>
            </BtnBanner>

            <TabsContainer>
                <Tab active={activeTab === 'simple'} onClick={() => setActiveTab('simple')}>함께하는 책 속 한 줄</Tab>
                <Tab active={activeTab === 'detailed'} onClick={() => setActiveTab('detailed')}>함께하는 자유 기록장</Tab>
            </TabsContainer>
            {activeTab==='simple'&&(<>        
            <ShortWritingList>
                {short.slice(0, 6).map((item, index) => (
                <ShortWritingCard key={index}>
                    <div className="shortWriting">{item.short_comment}</div>
                    <div className="likePick">
                        <div className="nickName">{item.nickname}</div>
                        <div className="heart">
                            <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                            <div className="heartNum">{item.like_count}</div>
                        </div>
                        <div className="bookmark">
                            <FontAwesomeIcon icon={faBookmark} />
                        </div>
                    </div>
                    <div className="bookInfo">
                        <div className="bookTitle">{item.book_title}</div>
                        <div className="bookAuthor">{item.book_author}</div>
                    </div>
                </ShortWritingCard>
                ))}
            </ShortWritingList>
            
            <OrangeBanner onClick={()=>handleItemClick("/afterlogin/recommendation")}>
                <div className="text3">
                    <p className="first_row">당신의 고민에 맞는</p>
                    <p className="second_row">책 추천 받기</p>
                </div>

                <img src={orange_banner} className="bannerPic"></img>
            </OrangeBanner>

            <BelowShortWritingList>
                {short.slice(6).map((item, index) => (
                <ShortWritingCard key={index}>
                    <div className="shortWriting">{item.short_comment}</div>
                    <div className="likePick">
                        <div className="nickName">{item.nickname}</div>
                        <div className="heart">
                            <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                            <div className="heartNum">{item.like_count}</div>
                        </div>
                        <div className="bookmark">
                            <FontAwesomeIcon icon={faBookmark} />
                        </div>
                    </div>
                    <div className="bookInfo">
                        <div className="bookTitle">{item.book_title}</div>
                        <div className="bookAuthor">{item.book_author}</div>
                    </div>
                    
                </ShortWritingCard>
                ))}
            </BelowShortWritingList>
            </>)}

            {activeTab==='detailed' &&(<>
                <LongWritingList>
                    {long.slice(0,4).map((item, index) => (
                    <LongWritingCard key={index}>
                        <div className="title">{item.review_title}</div>
                        <div className="longWriting">{item.long_text}</div>
                        <div className="likePick">
                            <div className="createDate">{item.created_at}</div>
                            <div className="nickName">{item.nickname}</div>
                            <div className="heart">
                                <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                                <div className="heartNum">{item.like_count}</div>
                            </div>
                            <div className="bookmark">
                                <FontAwesomeIcon icon={faBookmark} />
                            </div>
                            <span className="material-icons chatIcon">
                                chat
                            </span>
                        </div>
                        <div className="bookInfo">
                            <div className="bookTitle">{item.book_title}</div>
                            <div className="bookAuthor">{item.book_author}</div>
                        </div>
                        
                    </LongWritingCard>
                    ))}
                </LongWritingList>

                <OrangeBanner onClick={()=>handleItemClick("/afterlogin/recommendation")}>
                    <div className="text3">
                        <p className="first_row">당신의 고민에 맞는</p>
                        <p className="second_row">책 추천 받기</p>
                    </div>

                    <img src={orange_banner} className="bannerPic"></img>
                </OrangeBanner>

                <BelowLongWritingList>
                    {long.slice(4).map((item, index) => (
                   <LongWritingCard key={index}>
                        <div className="title">{item.review_title}</div>
                        <div className="longWriting">{item.long_text}</div>
                        <div className="likePick">
                            <div className="createDate">{item.created_at}</div>
                            <div className="nickName">{item.nickname}</div>
                            <div className="heart">
                                <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                                <div className="heartNum">{item.like_count}</div>
                            </div>
                            <div className="bookmark">
                                <FontAwesomeIcon icon={faBookmark} />
                            </div>
                            <span className="material-icons chatIcon">
                                chat
                            </span>
                        </div>
                        <div className="bookInfo">
                            <div className="bookTitle">{item.book_title}</div>
                            <div className="bookAuthor">{item.book_author}</div>
                        </div>
                        
                    </LongWritingCard>
                    ))}
                </BelowLongWritingList>
            </>)}
        </CommunityPage>
    );
}