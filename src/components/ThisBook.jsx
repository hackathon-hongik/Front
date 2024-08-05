import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../api";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import info from '../assets/info.png';
import noteImage from '../assets/note.png';
import contract from '../assets/contract.png';
import bookCover from '../assets/book.png';
import logo from "../assets/Logo.png";

const AppContainer = styled.div`
    width:1620px;
    height:900px;
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
    height:900px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin-top: 20px;
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



const BookInfoBox = styled.div`
  width:600px;
  height:700px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border-radius: 20px;
  background: #FFF;
  padding: 40px 48px 28px 48px;
  margin-top:20px;

  .Cover{
    width:160px;
    height:240px;
    border-radius: 4px;
  }

  .Title{
    color: var(--kakao-logo, #000);
    text-align: center;

    /* Heading 1/Bold */
    font-family: "Pretendard JP";
    font-size: 19px;
    font-style: normal;
    font-weight: 600;
    line-height: 136.4%; /* 30.008px */
    letter-spacing: -0.427px;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .Author{
    color: var(--kakao-logo, #000);
    text-align: center;
    font-feature-settings: 'ss10' on;

    /* Label 1/Normal - Bold */
    font-family: "Pretendard JP";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;
    margin-bottom: 0px;
  }

  .Publisher{
    color: rgba(60, 60, 67, 0.60);
    font-feature-settings: 'ss10' on;

    /* Label 1/Normal - Regular */
    font-family: "Pretendard JP";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;
    margin-top: 5px;

  }

  .AddBtn{
    display: flex;
    width: 160px;
    height: 56px;
    padding: 14px 14px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border:none;
    border-radius: 4px;
    background: #2EEA7E;
    margin-left:220px;
    margin-top:10px;

    color: var(--kakao-logo, #000);
    text-align: center;
    font-feature-settings: 'ss10' on;

    /* Body 2/Normal - Bold */
    font-family: "Pretendard JP";
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 146.7%; /* 22.005px */
    letter-spacing: 0.144px;
  }

  .line{
    width:600px;
    height:1px;
    margin-top: 15px;
    background-color: rgba(112, 115, 124, 0.22);
  }

  .Contents{
    display: flex;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    align-self: stretch;
    overflow: hidden;
    color: var(--kakao-logo, #000);
    font-feature-settings: 'ss10' on;
    /* Label 1/Reading - Regular */
    font-family: "Pretendard JP";
    text-overflow: ellipsis;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 157.1%;
    letter-spacing: 0.203px;
    margin-top: 20px;
  }
`;


export function ThisBook(){
const [isCheck, setCheck] = useState(false);
const [activeSubNav, setActiveSubNav] = useState('bookinfo');
const navigate=useNavigate();
const location = useLocation();
const token = location.state?.token || '';
const isbn = location.state?.isbn || '';
const [bookData, setBookData] = useState([]);

const fetchBookData = async () => {
  try {
    const response = await axiosInstance.get(`/desk/books/${isbn}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setBookData(response.data);
    console.log(response);

  } catch (error) {
    console.log('Failed to fetch book data:', error);
    //console.log(token);
  }
};

useEffect(() => {
  //console.log(token);
  fetchBookData();
  
}, []);


// const [thisBook, setThisBook] = useState([
//   { deskdate: "2024-07-28T05:41:31.341060+09:00",
//     book:{
//     isbn: "9791188331793",
//     title: "나를 위해 살지 않으면 남을 위해 살게 된다",
//     author: "에픽테토스",
//     date: "2024-07-28T05:41:31.341060+09:00",
//     publisher: "페이지2북스",
//     thumbnail: bookCover,
//     content: "바꿀 수 없는 것을 걱정하지 마라.\n스토아 철학자 에픽테토스가 전하는 \'내 삶의 주도권을 되찾는 법\'\n \"인생은 고통이다.\" 부처와 쇼펜하우어는 말했다. 이 말처럼 인생에는 수많은 고통이 있고, 우리는 누구나 고통을 겪으며 살아간다. 그런데 고통은 어디서 오는 것일까? 바로 우리가 세상일을 맘대..."
//     },
//     status: "새 책"
//   }
// ])


const addBook=async(isbn,title,author,thumbnail,content,publisher,date)=>{
  try{
      const newBook={
          book:{
              isbn:isbn,
              title:title,
              author:author,
              date:date,
              publisher:publisher,
              thumbnail:thumbnail,
              content:content
          }
      }

      const response=await axiosInstance.post("/desk/books/reading/",newBook,{
          
          headers:{
              Authorization: `Bearer ${token}`
          }

          });
      alert("읽고 있는 책에 성공적으로 추가되었습니다!")
      console.log(response);
  }
  catch(e){
      if(e.response && e.response.status===409){
          alert("이미 읽고 있는 책에 추가하신 책입니다");
          console.log(e);
      }
  }
}

const handleItemClick=(path,token,isbn)=>{
  navigate(path,{state:{token,isbn}});
};

      
const handleAddClick=(isbn,title,author,thumbnail,content,publisher,date,token)=>{   //읽고 있는 책으로 추가 처리
       
  addBook(isbn,title,author,thumbnail,content,publisher,date,token);
  
};

    return(
        <AppContainer>
            <NoteContainer>
                  <Header>
                  <Logo src ={logo} onClick={()=>handleItemClick('/afterlogin',token)}/>
                    <Nav>
                    <li><a onClick={() => handleItemClick("/afterlogin/mylibrary",token)}>내 서재</a></li>
                    <li><a onClick={() => handleItemClick("/afterlogin/community",token)}>커뮤니티</a></li>
                      <li>
                         <ButtonToggle>
                           <MypageBtn onClick={() => { setCheck((e) => !e) }}>마이페이지</MypageBtn>
                             {isCheck && (
                                <ToggleList>
                                  <p onClick={()=>handleItemClick('/afterlogin/changenickname',token)}>닉네임 변경</p>
                                  <p>로그아웃</p>
                                </ToggleList>
                              )}
                         </ButtonToggle>
                        </li>
                    </Nav>
                  </Header>


                  
                  <SubNav>
                        <SubNavItem active={activeSubNav === 'bookinfo'} onClick={() => { handleItemClick("/afterlogin/thisbook",token,isbn); setActiveSubNav('bookinfo'); }}>
                        {activeSubNav === 'bookinfo' && <img src={info} alt="active" />}
                        책 정보보기</SubNavItem>
                        <SubNavItem active={activeSubNav === 'record'} onClick={() => { handleItemClick("/afterlogin/note",token,isbn); setActiveSubNav('record'); }}>
                        {activeSubNav === 'record' && <img src={noteImage} alt="active" />}
                        기록하기</SubNavItem>
                        <SubNavItem active={activeSubNav === 'myrecords'} onClick={() => { handleItemClick("/afterlogin/looknote",token,isbn); setActiveSubNav('myrecords'); }}>
                        {activeSubNav === 'myrecords' && <img src={contract} alt="active" />}
                        내 기록보기</SubNavItem>
                  </SubNav>  
                  
              
                  
                  
                  {bookData && bookData.book ? (
                  <BookInfoBox onClick={(e) => e.stopPropagation()}>
                    <img className="Cover" src={bookData.book.thumbnail} alt="Book Thumbnail" />
                    <p className="Title">{bookData.book.title || "N/A"}</p>
                    <p className="Author">{bookData.book.author.replace(/[\[\]']+/g, '') || "N/A"}</p>
                    <p className="Publisher">{bookData.book.publisher || "N/A"} · {new Date(bookData.book.date).toLocaleDateString() || "N/A"}</p>
                    <button className="AddBtn" onClick={() => handleAddClick(bookData.book.isbn, bookData.book.title, bookData.book.author, bookData.book.thumbnail, bookData.book.content, bookData.book.publisher, bookData.book.date)}>읽고 있는 책에 추가</button>
                    <div className="line"></div>
                    <p className="Contents">{bookData.book.content || "N/A"}</p>
                  </BookInfoBox>
                    ) : (
                      <p>책 정보를 불러오는 중입니다...</p>
                    )}
                  

                  

            </NoteContainer>
        </AppContainer>



//       Note.jsx로 넘어가기 위한 버튼
//      <button onClick={() => navigateToNote('123', '456')}>Go to Note</button>

    );
}