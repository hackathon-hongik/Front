import { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from "react";
import styled from "styled-components";
import { axiosInstance } from '../api';

const RecommendResultPage=styled.div`
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
        margin-top: 80px;
        width:700px;
        height:50px;
        }

    .highlight{
        color: #FF6E23;
    }

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

const BookList=styled.div`
     width: 1200px;
     height:800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 80px;
    margin-left:100px;
    background-color: beige;
`;

const IndexCircle=styled.div`
    display: flex;
    width: 32px;
    height: 24px;
    padding: 2px 11px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 16px;
    background: #FF6E23;

    color: #FFF;
    text-align: center;
    font-feature-settings: 'ss10' on;
    /* Body 1/Normal - Bold */
    font-family: "Pretendard JP";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: 0.091px;
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
  margin-left: 0px;
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
`;

const GoHomeBtn=styled.button`
    display: flex;
    width: 194px;
    height: 56px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #FF6E23;
    color: #FFF;

    text-align: center;
    font-feature-settings: 'ss10' on;
    /* Body 1/Normal - Bold */
    font-family: "Pretendard JP";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: 0.091px;
`;


export function RecommendResult(){
    const location = useLocation();
    const navigate = useNavigate();
    const {results,category}=location.state || { results: [], category:""};
    //const category=location.state.category;
    const [isCheck, setCheck] = useState(false);
    const [clickedBookIndex, setClickedBookIndex] = useState(null);
    const [bookmarked, setBookmarked] = useState(
        JSON.parse(localStorage.getItem('bookmarkedBooks')) || []        //새로고침해도 찜 결과가 남아있게 하고 싶었지만 이 결과가 다른 책 목록에도 그대로 적용된다는
      );                                                                 //문제발생  -> 인자를 index가 아닌 book.isbn(isbn)(책 고유값)을 넘겨줘서 해결
    
      useEffect(() => {
        localStorage.setItem('bookmarkedBooks', JSON.stringify(bookmarked));
      }, [bookmarked]);
    
    const pickBook=async(isbn,title,author,thumbnail,content)=>{
        try{
            const newBook={
                book:{
                    isbn:isbn,
                    title:title,
                    author:author,
                    thumbnail:thumbnail,
                    content:content
                }
            }

            const response=await axiosInstance.post("/books/1/wish/",newBook);
            console.log(response);
        }
        catch(e){
            alert("이미 찜하신 책입니다");
            console.log(e);
        }
    };

    const handleItemClick = (path) => {
        navigate(path);
      };

    const handlePickClick=(isbn,title,author,thumbnail,content)=>{  //찜 처리

        pickBook(isbn,title,author,thumbnail,content);
        toggleBookmark(isbn); //책 고유값인 isbn값을 넘겨주어서 
    }

    const showInfo = (index) => {
        setClickedBookIndex(index === clickedBookIndex ? null : index);
    };

    const toggleBookmark = (id) => {//즐겨찾기 부분
        // setBookmarked((prev) => 
        //     prev.includes(id) ? prev.filter(index => index !== id) : [...prev, id]
        // ); //이렇게 하면 북마크 취소가능 -> 그저 화면상에 보여지는 모습만

        if (!bookmarked.includes(id)) {
            setBookmarked((prev) => [...prev, id]);
        }  //이렇게 하면 북마크가 취소 불가
    }; 
  
    return(
        <RecommendResultPage>
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
            {category==="건강" ? 
            (<div className="text1">
                <span className="highlight">'{category}'</span>이 고민인 당신에게 추천드려요
            </div>): (
            <div className="text1">
                <span className="highlight">'{category}'</span>가 고민인 당신에게 추천드려요
            </div>)}

           
            <BookList>
            {results.length > 0 ? (
                         results.map((book, index) => (
                             <BookCard key={index}>
                                 <IndexCircle>{index+1}</IndexCircle>
                                 <img className="cover" src={book.thumbnail} alt="Book Thumbnail" onClick={() => showInfo(index)}/>
                                 <div className="title">{book.title}</div>
                                 <div className="author">{book.authors.join(', ')}</div>  {/* .join은 작가 여러명일때 콤마 붙이기 위한 용도 */}
                                 {clickedBookIndex === index && (
                                     <div className="specificInfo">
                                         <p>제목: {book.title || "N/A"}</p>
                                         <p>책 설명: {book.contents || "N/A"}</p>
                                         <p>작가: {book.authors?.join(', ') || "N/A"}</p>
                                         <p>출판사: {book.publisher || "N/A"}</p>  {/* "N/A는 저 카테고리가 없는경우 처리" */}
                                     </div>
                                 )}
                                 <div className="addPickBtn">
                                    <span className="material-symbols-outlined" onClick={() => handlePickClick(book.isbn,book.title,book.authors,book.thumbnail,book.contents,index)} style={{ backgroundColor: bookmarked.includes(book.isbn) ? "#FF6E23" : "transparent" }}>
                                        bookmark
                                    </span>
                                 </div>
                                 
                             </BookCard>
                         ))
                     ) : (
                         <p>No results found</p>
                     )}
                     <GoHomeBtn onClick={()=>navigate('/afterlogin')}>홈으로 돌아가기</GoHomeBtn>
            </BookList>    
            
        </RecommendResultPage>
    );
}