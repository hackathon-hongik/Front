import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { axiosInstance } from "../api";
import styled from "styled-components";
import readlogo from "../assets/bookreadlogo.png";
import readinglogo from "../assets/bookreadinglogo.png";
import picklogo from "../assets/bookpicklogo.png";

const sampleBooks = [
    {
        id: 1,
        title: "나를 읽어줘",
        author: "홍길동",
        category: "지금 읽고 있는 책",
        cover: "sample_cover1.png",
    },
    {
        id: 2,
        title: "책 제목 2",
        author: "이몽룡",
        category: "지금까지 읽은 책",
        cover: "sample_cover2.png",
    },
    {
        id: 3,
        title: "책 제목 3",
        author: "성춘향",
        category: "찜해둔 책",
        cover: "sample_cover3.png",
    },
    {
        id: 4,
        title: "책 제목 3",
        author: "성춘향",
        category: "찜해둔 책",
        cover: "sample_cover3.png",
    },
    {
        id: 5,
        title: "책 제목 3",
        author: "성춘향rerereeeeeeeeeeeeeeeereeeee",
        category: "찜해둔 책",
        cover: "sample_cover3.png",
    },
    {
        id: 6,
        title: "책 제목 안녕안녕 안녕안녕안녕안녕안녕안녕안녕안녕 안녕안녕안녕안녕안녕안녕안녕안녕 안녕안녕안녕안녕안녕안녕",
        author: "성춘향",
        category: "찜해둔 책",
        cover: "sample_cover3.png",
    },
    {
        id: 7,
        title: "책 제목 안녕안녕 안녕안녕안녕안녕안녕안녕",
        author: "성춘향",
        category: "찜해둔 책",
        cover: "sample_cover3.png",
    },
    {
        id: 8,
        title: "책 제목 안녕안녕 안녕안녕안녕안녕안녕안녕",
        author: "성춘향",
        category: "찜해둔 책",
        cover: "sample_cover3.png",
    },
    {
        id: 9,
        title: "책 제목 안녕안녕 안녕안녕안녕안녕안녕안녕",
        author: "성춘향",
        category: "찜해둔 책",
        cover: "sample_cover3.png",
    },
    // 더 많은 샘플 데이터 추가
];

const categoryColors = {
    "지금 읽고 있는 책": "#2EEA7E",
    "지금까지 읽은 책": "#9DB8FF",
    "찜해둔 책":"#ff6e23",
  };



const LibraryPage=styled.div`
    font-family: "Pretendard JP";
    width:1620px;
    height:1840px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:auto;
    background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;
`;

 const Header=styled.div`
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

const Stats=styled.div`
  width:1400px;
  height:200px;
  display:flex;
  flex-direction: column ;
  align-items: center;
  /*background-color: red;*/

  .text1{
    color: var(--kakao-logo, #000);
    font-feature-settings: 'ss10' on;
    /* Title 2/Bold */
    font-family: "Pretendard JP";
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 135.8%; /* 38.024px */
    letter-spacing: -0.661px;
    margin-right: 800px;
    margin-top: 30px;
  }

  .text3{
    color: var(--kakao-logo, #000);
    text-align: center;
    /* Display 2/Bold */
    font-family: "Pretendard JP";
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 52px */
    letter-spacing: -1.128px;
    margin-right: 100px;
  }
`;

const ShowStats=styled.div`
    width:1400px;
    height:350px;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /*background-color: blue;*/
    margin-top:0px;
    .reading{
        width:305px;
        height:160px;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        background: #2EEA7E;
    }

    .read{
        width:305px;
        height:160px;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        background: #9DB8FF;
        margin-left: 50px;
    }

    .picked{
        width:305px;
        height:160px;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        background: #FFF22F;
        margin-left: 50px;
    }

    .numBox{
        width:305px;
        height:50px;
        display: flex;
        flex-direction:row;
        align-items: center;
        /*background-color: bisque;*/
        margin-top:40px;
    }

    .material-symbols-outlined{
        margin-left: 7px;
        margin-right: 190px;
        font-size: 36px;
    }

    .text2{
        margin-left: 10px;
        color: var(--kakao-logo, #000);
        /* Headline 1/Medium */
        font-family: "Pretendard JP";
        font-size: 18px;
        font-style: normal;
        font-weight: 550;
        line-height: 144.5%; /* 26.01px */
        letter-spacing: -0.004px;
    }

    p{
        color: var(--kakao-logo, #000);
        /* Headline 1/Medium */
        font-family: "Pretendard JP";
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        
    }
`;
const BookList = styled.div`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 300px;
  margin-left:100px;
`;

const BookCard = styled.div`
  width: 220px;
  height: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right:15px;
  box-sizing: border-box;

  &:nth-child(5n) {
    margin-right: 0;
  }
  .cover {
    width: 156px;
    height: 234px;
    margin-top: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }
  .title {
    font-family: "Pretendard JP";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: 0.091px;
    margin-top: 10px;
    width:144px;
    height:48px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .author {
    font-family: "Pretendard JP";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;
    color: gray;
    width: 144px;
    height: 24px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .category {
    font-family: "Pretendard JP";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;
    color: #ff6e23;
    margin-top: 10px;
  }
`;

export function MyLibrary(){
    const navigate=useNavigate();
    const handleItemClick=(path)=>{
        navigate(path);
    };
    const [isCheck,setCheck]=useState(false);

    return(
        <LibraryPage>
           <Header>
                <div className="logo">
                    <p>로고</p>
                </div>

                <ul className="nav">
                    <li><a className="orangeText" onClick={()=>handleItemClick('/afterlogin/mylibrary')}>내 서재</a></li>
                    <li><a onClick={()=>handleItemClick()}>커뮤니티</a></li>
                    <li>
                        <div className="buttonToggle">
                            <button className="mypageBtn" onClick={()=>{setCheck((e)=>!e)}}>마이페이지</button>
                            {isCheck &&(
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

            <Stats>
                <p className="text3">내 서재</p>
                <p className="text1">내 서재 모아보기</p>
                <ShowStats>
                    <div className="reading">
                        <p className="text2">지금 읽고 있는 책</p>
                        <div className="numBox">
                        <span className="material-symbols-outlined">
                            menu_book
                        </span>
                        <p>권</p>
                        </div>
                    </div>
                    <div className="read">
                        <p className="text2">지금까지 읽은 책</p>
                        <div className="numBox">
                        <span className="material-symbols-outlined">
                        book
                        </span>
                        <p>권 돌파</p>
                        </div>
                    </div>
                    <div className="picked">
                        <p className="text2">찜해둔 책</p>
                        <div className="numBox">
                        <span className="material-symbols-outlined">
                            bookmark_star
                        </span>
                        <p>권</p>
                        </div>
                    </div>
                </ShowStats>
            </Stats>
            <BookList>
                {sampleBooks.map((book) => (
                <BookCard key={book.id} onClick={()=>handleItemClick("/afterlogin/thisbook")}>
                    <div className="cover">
                        <p>이미지</p>
                    </div>
                    <div className="title">{book.title}</div>
                    <div className="author">{book.author}</div>
                    <div className="category" style={{ color: categoryColors[book.category] }}>{book.category}</div>
                </BookCard>))}
            </BookList>
        </LibraryPage>
    );
}