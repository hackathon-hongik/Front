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
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const short = [
    {
        id: 1,
        short_comment: "1안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:"나를 위해 살지 않으면 남을 위해 살게 된다",
        book_author:"롤링",
        nickname:"닉네임",
        created_at:"2024-07-28T05:41:31.341060+09:00"

    },
    {
        id: 2,
        short_comment: "2안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:"해리포터",
        book_author:"롤링",
        nickname:"닉네임",
        created_at:"2024-07-28T05:41:31.341060+09:00"
    },
    {
        id: 3,
        short_comment: "3안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:"해리포터",
        book_author:"롤링",
        nickname:"닉네임",
        created_at:"2024-07-28T05:41:31.341060+09:00"
    },
    {
        id: 4,
        short_comment: "4안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        nickname:"닉네임",
        created_at:"2024-07-28T05:41:31.341060+09:00"
    },
    {
        id: 5,
        short_comment: "5안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        nickname:"닉네임",
        created_at:"2024-07-28T05:41:31.341060+09:00"
    },
    {
        id: 6,
        short_comment: "6안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        nickname:"닉네임",
        created_at:"2024-07-28T05:41:31.341060+09:00"
    },
    {
        id: 7,
        short_comment: "7안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"닉네임",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        nickname:"닉네임",
        created_at:"2024-07-28T05:41:31.341060+09:00"
    },
    {
        id: 8,
        short_comment: "8안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        nickname:"닉네임",
        created_at:"2024-07-28T05:41:31.341060+09:00"
    },
    {
        id: 9,
        short_comment: "9안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        nickname:"닉네임",
        created_at:"2024-07-28T05:41:31.341060+09:00"
    },
    {
        id: 10,
        short_comment: "10안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
        nickname:"롯데 우승은 언제쯤",
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        nickname:"닉네임",
        created_at:"2024-07-28T05:41:31.341060+09:00"
    },
    // 더 많은 샘플 데이터 추가
];

const long=[
    {
        id:1,
        review_title:'으아아아 힘들어',
        long_text:'1이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만',
        created_at:"2024-07-28T05:41:31.341060+09:00",
        nickname:'닉네임',
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        comment_count : 0,

		comment_list : [
					{
                        comment_id : 1, 
                        comment_nickname : "닉1",
                        comment_created_at : "2024-07-28T05:41:31.341060+09:00",
                        comment_text : '댓글1'
					},
					{
					    comment_id : 2, 
						comment_nickname : "닉2",
						comment_created_at : "2024-07-28T05:41:31.341060+09:00",
						comment_text : '댓글2'
					},
			
				]
    },
    {
        id:2,
        review_title:'으아아아 힘들어',
        long_text:'2이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만',
        created_at:"2024-07-28T05:41:31.341060+09:00",
        nickname:'닉네임',
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        comment_count : 2,

		comment_list : [
					{
                        comment_id : 1, 
                        comment_nickname : "닉1",
                        comment_created_at : "2024-07-28T05:41:31.341060+09:00",
                        comment_text : '댓글1'
					},
					{
					    comment_id : 2, 
						comment_nickname : "닉2",
						comment_created_at : "2024-07-28T05:41:31.341060+09:00",
						comment_text : '댓글2'
					},
			
				]
    },
    {
        id:3,
        review_title:'으아아아 힘들어',
        long_text:'3이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만',
        created_at:"2024-07-28T05:41:31.341060+09:00",
        nickname:'닉네임',
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        comment_count : 4,

		comment_list : [
					{
                        comment_id : 1, 
                        comment_nickname : "닉1",
                        comment_created_at : "2024-07-28T05:41:31.341060+09:00",
                        comment_text : '댓글1'
					},
					{
					    comment_id : 2, 
						comment_nickname : "닉2",
						comment_created_at : "2024-07-28T05:41:31.341060+09:00",
						comment_text : '댓글2'
					},
                    {
					    comment_id : 3, 
						comment_nickname : "닉3",
						comment_created_at : "2024-07-28T05:41:31.341060+09:00",
						comment_text : '댓글3'
					},
                    {
					    comment_id : 4, 
						comment_nickname : "닉4",
						comment_created_at : "2024-07-28T05:41:31.341060+09:00",
						comment_text : '댓글4'
					},
                ]
    },
    {
        id:4,
        review_title:'으아아아 힘들어',
        long_text:'4나를 위해 살지 않으면 남을 위해 살게 된다 책을 읽고 난 후, 나의 웰빙에 대한 새로운 관점을 얻게 되었다. 우리는 종종 타인의 기대에 부응하려고 하며, 그 과정에서 자신을 잃어버리기 쉽다. 이 책은 자신을 위한 삶의 중요성을 강조하며, 스스로의 행복과 만족을 우선시하는 것이 왜 중요한지에 대해 다시 한 번 생각해 보게 한다. 나의 웰빙은 단순히 신체적 건강을 넘어선다. 정신적, 감정적 건강 또한 중요한 부분이다. 이 책을 통해 나는 나 자신에게 더 많은 시간을 투자하고, 내가 진정으로 원하는 것을 추구하는 것이 얼마나 중요한지 깨달았다. 타인의 기대에 얽매이지 않고, 나만의 목표와 꿈을 향해 나아갈 때 비로소 진정한 웰빙을 실현할 수 있다. 또한, 자기 자신을 돌보는 것이 이기적인 것이 아님을 깨달았다. 내가 행복하고 건강할 때, 주변 사람들에게도 긍정적인 영향을 미칠 수 있다. 따라서 나의 웰빙을 위해 나를 위한 시간을 갖고, 나의 가치를 존중하며 살아가는 것이 중요하다. 이 책은 나에게 새로운 동기부여가 되었고, 앞으로의 삶에서 나를 위해 더 많이 살 것을 다짐하게 만들었다.',
        created_at:"2024-07-28T05:41:31.341060+09:00",
        nickname:'닉네임',
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        comment_count : 2,

		comment_list : [
					{
                        comment_id : 1, 
                        comment_nickname : "닉1",
                        comment_created_at : "2024-07-28T05:41:31.341060+09:00",
                        comment_text : '댓글1'
					},
					{
					    comment_id : 2, 
						comment_nickname : "닉2",
						comment_created_at : "2024-07-28T05:41:31.341060+09:00",
						comment_text : '댓글2'
					},
			
				]
    },
    {
        id:5,
        review_title:'으아아아 힘들어',
        long_text:'5이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제그만이제',
        created_at:"2024-07-28T05:41:31.341060+09:00",
        nickname:'닉네임',
        like_count:200,
        book_title:'해리포터',
        book_author:'롤링',
        comment_count : 2,

		comment_list : [
					{
                        comment_id : 1, 
                        comment_nickname : "닉1",
                        comment_created_at : "2024-07-28T05:41:31.341060+09:00",
                        comment_text : '댓글1'
					},
					{
					    comment_id : 2, 
						comment_nickname : "닉2",
						comment_created_at : "2024-07-28T05:41:31.341060+09:00",
						comment_text : '댓글2'
					},
			
				]
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
        margin-top: 10px; 
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
  
  .left-arrow-icon{
    //color: #000000;
    font-size: 25px;
  }

  .left-arrow-icon:hover{
            color:#FF6E23;
    }

  .right-arrow-icon{
    //color: #000000;
    font-size: 25px;
  }

  .right-arrow-icon:hover{
            color:#FF6E23;
    }
  
  .textAndClose{
    width:600px;
    height:34px;
    display: flex;
    flex-direction: row;
    //background-color: red;
    overflow: hidden;
    color: #989BA2;
    .modalText{
        width:150px;
        height:20px;
        background-color: blue;
        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;
        /* Label 2/Regular */
        font-family: "Pretendard JP";
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        margin-left: 40px;
    }
    .close{
        font-size: 33px;
        margin-left: 320px;
        }
  }

  .line1{
        width:500px;
        height:1px;
        margin-left: 50px;
        margin-top:20px;
        background-color: rgba(112, 115, 124, 0.22);
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
        width:100px;
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: beige;
        font-family: "Pretendard JP";
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 138.5%; /* 18.005px */
        letter-spacing: 0.252px;
        color: #989BA2;
    }

    .modalNickname{
        width:70px;
        height:20px;
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
       //background-color: beige;
    }

     .heart{
        margin-left: 280px;
    }
  }

  .modalShortWritingBox{
    width:600px;
    height:300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color:aqua;
    margin-top: 20px;

    .modalShortWriting{
        width:500px;
        height:300px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: beige;
    }
  }

  .modalBookBox{
    width: 500px;
    height: 70px;
    border-radius: 4px;
    background: #F2F2F7;
    margin-left: 50px;
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
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const LongModalContent = styled.div`
  /* width:960px;
  height:700px; */
  //padding: 20px;
  border-radius: 8px 8px 8px 8px;
  text-align: center;
  border-radius: 20px;
  background: #FFF;
  //padding: 40px 48px 28px 48px;
  margin-top:30px;
  overflow: auto;
  //position: relative;
   
    /* .scrollableContent{
    width:50px;
    height:800px;
    background-color: blue;
    overflow: auto; 
    padding-right: 10px; 
    }   */
   

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

    /* .heart{
        margin-left: 140px;
    } */
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
        margin-left: 10px;
        background-color: beige;
    }

    /* .prevBtn, .nextBtn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    } */

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

   /* .modalLongWritingBox .prevBtn {
    position: fixed;
    left: 350px; 
    } */

    /* .modalLongWritingBox .nextBtn {
    position: fixed;
    right: 360px; 
    } */

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

const CommentInputBox=styled.div`
    width: 850px;
    height:150px;
    margin-top: 30px;
    margin-left: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
    border: 1px rgba(112, 115, 124, 0.22);
    background: #FFF;
    //background-color: aqua;

    .inputLine{
        display: flex;
        width: 720px;
        height:50px;
        padding: 16px 2px;
        flex-direction: column;
        justify-content: center;
        //align-items: center;
        gap: 10px;
        border-radius: 4px;
        border: 1px solid rgba(112, 115, 124, 0.22);
        background: #FFF;

        .commentMyNickName{
            width:50px;
            height:20px;
            margin-left: 20px;
            background-color: rebeccapurple;
        }

        .commentInput{
            width:690px;
            border: none;
            margin-left: 20px;
        }
    }

    .submitBtn{
        display: flex;
        width: 79px;
        height: 79px;
        padding: 12px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 8px;
        background: #F2F2F7;
        color: #989BA2;
        margin-left: 40px;
        border: 1px solid rgba(112, 115, 124, 0.22);

        text-align: center;
        font-feature-settings: 'ss10' on;
        text-overflow: ellipsis;
        /* Body 2/Normal - Medium */
        font-family: "Pretendard JP";
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: 146.7%; /* 22.005px */
        letter-spacing: 0.144px;
    }
`;

const PeopleCommentBox=styled.div`
    width:850px;
    //height:400px;
    margin-left: 50px;
    background-color: rebeccapurple;

    .commentNum{
        width:70px;
        height:30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: beige;
    }

    .numComment{
            margin-left: 9px;
        }
`;

const CommentList=styled.div`
    width:850px;
    //height:40px;
    margin-top: 30px;
    //background-color: purple;
`;

const CommentCard=styled.div`
    width:850px;
    height:100px;
    margin-top: 20px;
    background-color: red;
`;

export function Community(){
    const navigate=useNavigate();
    const [isCheck, setCheck] = useState(false);
    const [activeTab, setActiveTab] = useState('simple');
    const [clickedWritingIndex, setClickedWritingIndex] = useState(null);
    const [shortWritings,setShortWritings]=useState([]);
    const [longWritings,setLongWritings]=useState([]);
    const location = useLocation();
    const token = location.state?.token || '';

    const handleItemClick=(path,token,isbn)=>{
        navigate(path,{state:{token,isbn}});
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

    
    const showInfo = (index) => {
         setClickedWritingIndex(index === clickedWritingIndex ? null : index);
    };
    

    const closeModal = () => {
        setClickedWritingIndex(null);
      };
    
    const shortGoToPrevious = () => {
        setClickedWritingIndex(prevIndex =>
            prevIndex === 0 ? short.length - 1 : prevIndex - 1
        );
    };

    const shortGoToNext = () => {
        setClickedWritingIndex(prevIndex =>
            prevIndex === short.length - 1 ? 0 : prevIndex + 1
        );
    };
    const longGoToPrevious = () => {
        setClickedWritingIndex(prevIndex =>
            prevIndex === 0 ? long.length - 1 : prevIndex - 1
        );
    };

    const longGoToNext = () => {
        setClickedWritingIndex(prevIndex =>
            prevIndex === long.length - 1 ? 0 : prevIndex + 1
        );
    };
    return(
        <CommunityPage>
            <Header>
                <div className="logo">
                    <p onClick={()=>handleItemClick('/afterlogin',token)}>로고</p>
                </div>
        
                <ul className="nav">
                    <li>
                    <a onClick={() => handleItemClick('/afterlogin/mylibrary',token)}>내 서재</a>
                    </li>
                    <li>
                    <a className="orangeText" onClick={() => handleItemClick("/afterlogin/community",token)}>커뮤니티</a>
                    </li>
                    <li>
                    <div className="buttonToggle">
                        <button className="mypageBtn" onClick={() => { setCheck((e) => !e) }}>마이페이지</button>
                        {isCheck && (
                        <div className="toggleList">
                            <p onClick={()=>handleItemClick('/afterlogin/changenickname',token)}>닉네임 변경</p>
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
                <div className="meWrite" onClick={()=>handleItemClick('/afterlogin/community/communitywrite',token)}>
                    <p className="meWriteText">내가 쓴 글</p>
                    <span class="material-symbols-outlined">
                        arrow_right
                    </span>
                </div>
                <div className="meScrap" onClick={()=>handleItemClick('/afterlogin/community/communityscrap',token)}>
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
                <ShortWritingCard key={index} onClick={()=>showInfo(index)}>
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
                    {clickedWritingIndex === index && (
                                     <ShortModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <ShortModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                            <div className="textAndClose">
                                                <div className="modalText">책 속 한 줄 상세보기</div>
                                                <span className="material-icons close" onClick={closeModal}>
                                                    close
                                                </span>
                                            </div>
                                            <div className="line1"></div>
                                            <div className="top1"></div>
                                            <div className="top2">
                                                <div className="modalCreateDate">{new Date(item.created_at).toLocaleDateString()}</div>
                                                <div className="modalNickname">{item.nickname}</div>
                                                <div className="heart">
                                                    <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                                                    <div className="heartNum">{item.like_count}</div>
                                                </div>
                                                <div className="bookmark">
                                                    <FontAwesomeIcon icon={faBookmark} />
                                                </div>
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
                                                <div className="modalShortWriting">{item.short_comment}</div>
                                                <div className="nextBtn" onClick={shortGoToNext} style={{
                                                    color: index === short.length - 1 ? '#989BA2 ' : '#000000',
                                                    pointerEvents: index === short.length - 1 ? 'none' : 'auto',
                                                }}>
                                                    <span className="material-icons right-arrow-icon">
                                                        arrow_circle_right
                                                    </span>
                                                </div>
                                              </div>   
                                              <div className="modalBookBox">
                                               <div className="modalInerBox">
                                                <div className="modalCover"></div>
                                                <div className="modalBookInfo">
                                                    <div className="modalBookTitle">{item.book_title}</div>
                                                    <div className="modalBookAuthor">{item.book_author}</div>
                                                </div>
                                                </div>
                                            </div>
                                        </ShortModalContent>
                                     </ShortModalOverlay>
                                 )}
                </ShortWritingCard>
                ))}
            </ShortWritingList>
            
            <OrangeBanner onClick={()=>handleItemClick("/afterlogin/recommendation",token)}>
                <div className="text3">
                    <p className="first_row">당신의 고민에 맞는</p>
                    <p className="second_row">책 추천 받기</p>
                </div>

                <img src={orange_banner} className="bannerPic"></img>
            </OrangeBanner>

            <BelowShortWritingList>
                {short.slice(6).map((item, index) => (
                <ShortWritingCard key={index+6} onClick={()=>showInfo(index+6)}>
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
                    {clickedWritingIndex === index+6 && (
                                     <ShortModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                     <ShortModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                         <div className="textAndClose">
                                             <div className="modalText">책 속 한 줄 상세보기</div>
                                             <span className="material-icons close" onClick={closeModal}>
                                                 close
                                             </span>
                                         </div>
                                         <div className="line1"></div>
                                         <div className="top1"></div>
                                         <div className="top2">
                                             <div className="modalCreateDate">{new Date(item.created_at).toLocaleDateString()}</div>
                                             <div className="modalNickname">{item.nickname}</div>
                                             <div className="heart">
                                                <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                                                <div className="heartNum">{item.like_count}</div>
                                            </div>
                                            <div className="bookmark">
                                                <FontAwesomeIcon icon={faBookmark} />
                                            </div>

                                         </div>

                                         <div className="modalShortWritingBox">  
                                             <div className="prevBtn" onClick={shortGoToPrevious} style={{
                                             color: '#000000 ',
                                             //pointerEvents: index === 0 ? 'none' : 'auto',
                                             }}>
                                                 <span className="material-icons left-arrow-icon">
                                                     arrow_circle_left
                                                 </span>
                                             </div>
                                             <div className="modalShortWriting">{item.short_comment}</div>
                                             <div className="nextBtn" onClick={shortGoToNext} style={{
                                                 color: index+6 === short.length - 1 ? '#989BA2 ' : '#000000',
                                                 pointerEvents: index+6 === short.length - 1 ? 'none' : 'auto',
                                             }}>
                                                 <span className="material-icons right-arrow-icon">
                                                     arrow_circle_right
                                                 </span>
                                             </div>
                                           </div>   
                                           <div className="modalBookBox">
                                               <div className="modalInerBox">
                                                <div className="modalCover"></div>
                                                <div className="modalBookInfo">
                                                    <div className="modalBookTitle">{item.book_title}</div>
                                                    <div className="modalBookAuthor">{item.book_author}</div>
                                                </div>
                                                </div>
                                            </div>
                                     </ShortModalContent>
                                  </ShortModalOverlay>
                                 )}
                    
                </ShortWritingCard>
                ))}
            </BelowShortWritingList>
            </>)}

            {activeTab==='detailed' &&(<>
                <LongWritingList>
                    {long.slice(0,4).map((item, index) => (
                    <LongWritingCard key={index} onClick={()=>showInfo(index)}>
                        <div className="title">{item.review_title}</div>
                        <div className="longWriting">{item.long_text}</div>
                        <div className="likePick">
                            <div className="createDate">{new Date(item.created_at).toLocaleDateString()}</div>
                            <div className="nickName">{item.nickname}</div>
                            <div className="heart" onClick={(e)=>e.stopPropagation()}>
                                <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                                <div className="heartNum">{item.like_count}</div>
                            </div>
                            <div className="bookmark" onClick={(e)=>e.stopPropagation()}>
                                <FontAwesomeIcon icon={faBookmark} />
                            </div>
                            <span className="material-icons chatIcon" onClick={(e)=>e.stopPropagation()}>
                                chat
                            </span>
                        </div>
                        <div className="bookInfo">
                            <div className="bookTitle">{item.book_title}</div>
                            <div className="bookAuthor">{item.book_author}</div>
                        </div>
                        {clickedWritingIndex === index && (
                                    
                                     <LongModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <LongModalWrapper onClick={(e) => e.stopPropagation()}>
                                        <LongModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                            
                                            <span className="material-icons close" onClick={closeModal}>
                                                close
                                            </span>
                                            <div className="line1"></div>
                                            <div className="top1">
                                                <div className="modalTitle">{item.review_title}</div>
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
                                            <div className="top2">
                                                <div className="modalCreateDate">{new Date(item.created_at).toLocaleDateString()}</div>
                                                <div className="modalNickname">{item.nickname}</div>
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
                                                <div className="modalLongWriting">{item.long_text}</div>
                                                <div className="nextBtn" onClick={longGoToNext} style={{
                                                    color: index === long.length - 1 ? '#989BA2 ' : '#000000',
                                                    pointerEvents: index === long.length - 1 ? 'none' : 'auto',
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
                                                    <div className="modalBookTitle">{item.book_title}</div>
                                                    <div className="modalBookAuthor">{item.book_author}</div>
                                                </div>
                                            </div>

                                            <div className="line1"></div>

                                            <CommentInputBox>
                                                <div className="inputLine">
                                                    <div className="commentMyNickName">{item.nickname}</div>
                                                    <input type="text" className="commentInput" placeholder="댓글입력"></input>
                                                </div>
                                                <button className="submitBtn">등록</button>
                                            </CommentInputBox>

                                            <PeopleCommentBox>
                                                <div className="commentNum">
                                                    <p>댓글<span className='numComment'style={{color:item.comment_count===0?'#989BA2':'#FF6E23'}}>{item.comment_count}</span></p>
                                                </div>
                                                <CommentList>
                                                    {item.comment_list.map((comment) => (
                                                    <CommentCard key={comment.comment_id}>
                                                        <div className="commentNickName">{comment.comment_nickname}</div>
                                                        <div className="commentCreatedAt">{new Date(comment.comment_created_at).toLocaleDateString()}</div>
                                                        <div className="commentText">{comment.comment_text}</div>
                                                    </CommentCard>
                                                    ))}
                                                </CommentList>
                                            </PeopleCommentBox>
                                            
                                        </LongModalContent>
                                        </LongModalWrapper>
                                     </LongModalOverlay>
                                         
                                 )}
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
                   <LongWritingCard key={index+4} onClick={()=>showInfo(index+4)}>
                        <div className="title">{item.review_title}</div>
                        <div className="longWriting">{item.long_text}</div>
                        <div className="likePick">
                            <div className="createDate">{new Date(item.created_at).toLocaleDateString()}</div>
                            <div className="nickName">{item.nickname}</div>
                            <div className="heart" onClick={(e)=>e.stopPropagation()}>
                                <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                                <div className="heartNum">{item.like_count}</div>
                            </div>
                            <div className="bookmark" onClick={(e)=>e.stopPropagation()}>
                                <FontAwesomeIcon icon={faBookmark} />
                            </div>
                            <span className="material-icons chatIcon" onClick={(e)=>e.stopPropagation()}>
                                chat
                            </span>
                        </div>
                        <div className="bookInfo">
                            <div className="bookTitle">{item.book_title}</div>
                            <div className="bookAuthor">{item.book_author}</div>
                        </div>
                        {clickedWritingIndex === index+4 && (
                                     <LongModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <LongModalWrapper onClick={(e) => e.stopPropagation()}>
                                        <LongModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                            
                                            <span className="material-icons close" onClick={closeModal}>
                                                close
                                            </span>
                                            <div className="line1"></div>
                                            <div className="top1">
                                                <div className="modalTitle">{item.review_title}</div>
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
                                            <div className="top2">
                                                <div className="modalCreateDate">{new Date(item.created_at).toLocaleDateString()}</div>
                                                <div className="modalNickname">{item.nickname}</div>
                                            </div>
                                            <div className="modalLongWritingBox">
                                                <div className="prevBtn" onClick={longGoToPrevious} style={{
                                                color:'#000000 ',
                                                //pointerEvents: index === 0 ? 'none' : 'auto',
                                                }}>
                                                    <span className="material-icons left-arrow-icon">
                                                        arrow_circle_left
                                                    </span>
                                                </div>
                                                <div className="modalLongWriting">{item.long_text}</div>
                                                <div className="nextBtn" onClick={longGoToNext} style={{
                                                    color: index+4 === long.length - 1 ? '#989BA2 ' : '#000000 ',
                                                    pointerEvents: index+4 === long.length - 1 ? 'none' : 'auto',
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
                                                    <div className="modalBookTitle">{item.book_title}</div>
                                                    <div className="modalBookAuthor">{item.book_author}</div>
                                                </div>
                                            </div>

                                            <div className="line1"></div>

                                            <CommentInputBox>
                                                <div className="inputLine">
                                                    <div className="commentMyNickName">{item.nickname}</div>
                                                    <input type="text" className="commentInput" placeholder="댓글입력"></input>
                                                </div>
                                                <button className="submitBtn">등록</button>
                                            </CommentInputBox>

                                            <PeopleCommentBox>
                                                <div className="commentNum">
                                                    <p>댓글<span>{item.comment_count}</span></p>
                                                </div>
                                                <CommentList>
                                                    {item.comment_list.map((comment) => (
                                                    <CommentCard key={comment.comment_id}>
                                                        <div className="commentNickName">{comment.comment_nickname}</div>
                                                        <div className="commentCreatedAt">{new Date(comment.comment_created_at).toLocaleDateString()}</div>
                                                        <div className="commentText">{comment.comment_text}</div>
                                                    </CommentCard>
                                                    ))}
                                                </CommentList>
                                            </PeopleCommentBox>
                                            
                                        </LongModalContent>
                                        </LongModalWrapper>
                                     </LongModalOverlay>
                                 )}
                    </LongWritingCard>
                    ))}
                </BelowLongWritingList>
            </>)}
        </CommunityPage>
    );
}