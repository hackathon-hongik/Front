import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { axiosInstance } from "../api";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';



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
    "reading": "#2EEA7E",
    "read": "#9DB8FF",
    "wish":"#ff6e23",
  };

const categoryKorean={
    "reading":"읽고 있는 책",
    "read":"읽은 책",
    "wish":"찜해둔 책",
}



const LibraryPage=styled.div`
    font-family: "Pretendard JP";
    width:1620px;
    //height:1840px;
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

    .showNum{
        width:80px;
        height:30px;
        display: flex;
        flex-direction: row;
        //align-items: center;
        //background-color: rebeccapurple;
        .number{
            font-size: 23px;
            font-weight: 600;
        }

        .gwon{
            margin-top: 7px;
        }
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
  height: 400px;
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

  .bookInfo{
    width:156px;
    height:40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 4px 4px;
    background-color: gray;
    color: var(--Materials-Chrome, rgba(255, 255, 255, 0.75));
    text-align: center;
    font-feature-settings: 'ss10' on;
    /* Label 1/Reading - Bold */
    font-family: "Pretendard JP";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 157.14%; /* 22px */
    letter-spacing: 0.203px;
    cursor: pointer;
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

export function MyLibrary(){  //내 서재 페이지
    const [clickedBookIndex, setClickedBookIndex] = useState(null);
    const [readingStatus,setReadingStatus]=useState(0);
    const [readStatus,setReadStatus]=useState(0);
    const [pickStatus,setPickStatus]=useState(0);
    const [bookResults, setBookResults] = useState([]);
    const [isCheck,setCheck]=useState(false);
    const [isbn,setIsbn]=useState([]);
    const location = useLocation();
    const token = location.state?.token || '';
    
    const navigate=useNavigate();
    
    
    const handleItemClick=(path,token,isbn)=>{
        navigate(path,{state:{token,isbn}});
    };

    useEffect(() => {
        showAll();
      }, []);

    const showAll=async()=>{
        try{
            const response=await axiosInstance.get("/desk/books/",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });    
            setReadingStatus(response.data.reading_count);
            setReadStatus(response.data.read_count);
            setPickStatus(response.data.wish_count);
            setBookResults(response.data.mybooks);
            const isbnList = response.data.mybooks.map(item => item.book.isbn);
            setIsbn(isbnList);
        

            console.log(response.data);
            console.log(isbnList);

        }
        catch(e){
            console.log(e)
        }
    }

    const showReading=async()=>{
        try{
            const response=await axiosInstance.get("/desk/books/group/reading/",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
        });
            setReadingStatus(response.data.reading_count);
            setReadStatus(response.data.read_count);
            setPickStatus(response.data.wish_count);
            setBookResults(response.data.mybooks);    
            const isbnList = response.data.mybooks.map(item => item.book.isbn);
            setIsbn(isbnList);
            console.log(response.data);
        }
        catch(e){
            console.log(e)
        }
    };

    const showRead=async()=>{
        try{
            const response=await axiosInstance.get("/desk/books/group/read/",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
        });
            setReadingStatus(response.data.reading_count);
            setReadStatus(response.data.read_count);
            setPickStatus(response.data.wish_count);
            setBookResults(response.data.mybooks);   
            const isbnList = response.data.mybooks.map(item => item.book.isbn);
            setIsbn(isbnList);
            console.log(response.data);
        }
        catch(e){
            console.log(e)
        }
    };

    const showPicked=async()=>{
        try{
            const response=await axiosInstance.get("/desk/books/group/wish/",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setReadingStatus(response.data.reading_count);
            setReadStatus(response.data.read_count);
            setPickStatus(response.data.wish_count);
            setBookResults(response.data.mybooks);
            const isbnList = response.data.mybooks.map(item => item.book.isbn);
            setIsbn(isbnList); 
            console.log(response.data);
        }
        catch(e){
            console.log(e)
        }
    };

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

    const showInfo = (index) => {
        setClickedBookIndex(index === clickedBookIndex ? null : index);
    };

    const closeModal = () => {
        setClickedBookIndex(null);
      };

    const handleAddClick=(isbn,title,author,thumbnail,content,publisher,date)=>{   //읽고 있는 책으로 추가 처리
       
        addBook(isbn,title,author,thumbnail,content,publisher,date);
        
    };

    return(
        <LibraryPage>
           <Header>
                <div className="logo">
                    <p onClick={()=>handleItemClick('/afterlogin',token)}>로고</p>
                </div>

                <ul className="nav">
                    <li><a className="orangeText" onClick={()=>handleItemClick('/afterlogin/mylibrary',token)}>내 서재</a></li>
                    <li><a onClick={()=>handleItemClick("/afterlogin/community",token)}>커뮤니티</a></li>
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
                    <div className="reading" onClick={showReading}>
                        <p className="text2">지금 읽고 있는 책</p>
                        <div className="numBox">
                        <span className="material-symbols-outlined">
                            menu_book
                        </span>
                        <div className="showNum"><span className="number">{readingStatus}</span><span className="gwon">권</span></div>
                        </div>
                    </div>
                    <div className="read" onClick={showRead}>
                        <p className="text2">지금까지 읽은 책</p>
                        <div className="numBox">
                        <span className="material-symbols-outlined">
                        book
                        </span>
                        <div className="showNum"><span className="number">{readStatus}</span><span className="gwon">권 돌파</span></div>
                        </div>
                    </div>
                    <div className="picked" onClick={showPicked}>
                        <p className="text2">찜해둔 책</p>
                        <div className="numBox">
                        <span className="material-symbols-outlined">
                            bookmark_star
                        </span>
                        <div className="showNum"><span className="number">{pickStatus}</span><span className="gwon">권</span></div>
                        </div>
                    </div>
                </ShowStats>
            </Stats>
            <BookList>
                {bookResults.map((result,index) => (
                <BookCard key={result.id}>
                    <div className="cover">
                        <img src={result.book.thumbnail} onClick={()=>handleItemClick("/afterlogin/thisbook",token,isbn[index])}></img>
                    </div>
                    <div className="bookInfo" onClick={() => showInfo(index)}>책 정보보기</div>
                    <div className="title">{result.book.title}</div>
                    <div className="author"> 
                    {result.book.author.replace(/[\[\]']+/g, '')} 
                    </div>
                    <div className="category" style={{ color: categoryColors[result.status] }}>{categoryKorean[result.status]}</div>
                    {clickedBookIndex === index && (
                                     <ModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <ModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                         <img className="modalCover" src={result.book.thumbnail} alt="Book Thumbnail"/>
                                         <p className="modalTitle">{result.book.title || "N/A"}</p>
                                         <p className="modalAuthor">{result.book.author.replace(/[\[\]']+/g, '') || "N/A"}</p>
                                         <p className="modalPublisher">{result.book.publisher || "N/A"}</p>  {/* "N/A는 저 카테고리가 없는경우 처리" */}
                                         <button className="modalAddBtn" onClick={()=>handleAddClick(result.book.isbn,result.book.title,result.book.author,result.book.thumbnail,result.book.contents,result.book.publisher,result.book.date)}>읽고 있는 책에 추가</button>
                                         <div className="line"></div>
                                         <p className="modalContents">{result.book.content || "N/A"}</p>
                                         </ModalContent>
                                     </ModalOverlay>
                                 )}
                </BookCard>))}

            </BookList>
        </LibraryPage>
    );
}