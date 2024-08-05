import { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from "react";
import styled from "styled-components";
import { axiosInstance } from '../api';
import logo from "../assets/Logo.png";


const RecommendResultPage=styled.div`
    width:1620px;
    height:930px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:auto;
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

const BookList=styled.div`
     width: 1200px;
     height:800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 80px;
    margin-left:100px;
    //background-color: beige;
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
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  /* border: 1px solid #ddd; */
  border:none;
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

  .pickBtn{
        width:120px;
        height:40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        background-color: white;

        .material-symbols-outlined{
        width:19px;
        height:19px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 32px;
        }

        p{
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
            margin-left: 10px;
        }
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
    margin-left:480px;
    border: none;
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

  .modalPickBtn{
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
    background: #FFF22F;
    color: black;
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

export function RecommendResult(){
    const location = useLocation();
    const navigate = useNavigate();
    //const {results,category}=location.state || { results: [], category:""};
    const category=location.state.category;
    const {results}=location.state || { results: []};
    const [isCheck, setCheck] = useState(false);
    const [clickedBookIndex, setClickedBookIndex] = useState(null);
    const [bookmarked, setBookmarked] = useState([]);
    const [fetchedBookmarked,setFetchedBookmarked]=useState([]);
    const token = location.state?.token || '';
    const refresh = location.state?.refresh || '';
    // const { results: resultsString, category, token } = queryString.parse(location.search);
    // const results = JSON.parse(resultsString || '[]');
   

    useEffect(()=>{
        console.log("Received token:", token); // token 값이 올바르게 출력되는지 확인합니다.
        
            fetchWishBooks();
        
    },[]);

    useEffect(() => {
        if (fetchedBookmarked && fetchedBookmarked.mybooks) {
            const wishBooks = fetchedBookmarked.mybooks.map(book => book.book.isbn);
            setBookmarked(wishBooks);
        }
    }, [fetchedBookmarked]);

    const fetchWishBooks=async()=>{
        try{
            const response=await axiosInstance.get('/desk/books/group/wish/',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setFetchedBookmarked(response.data);
            console.log(fetchedBookmarked);
        }
        catch(e){
            alert("위시 불러오기 실패")
            console.log(e);
        }
    }
    
    const pickBook=async(isbn,title,author,thumbnail,content,publisher,date)=>{
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

            const response=await axiosInstance.post("/desk/books/wish/",newBook,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            alert("찜한 책에 성공적으로 추가되었습니다!");
        }
        catch(e){
            alert("이미 찜하신 책입니다");
            console.log(e);
        }
    };

   
    const handleItemClick=(path,token,refresh,isbn)=>{
        navigate(path,{state:{token,refresh,isbn}});
    };

    const handlePickClick=(isbn,title,author,thumbnail,content,publisher,date)=>{  //찜 처리

        pickBook(isbn,title,author,thumbnail,content,publisher,date);
        toggleBookmark(isbn); //책 고유값인 isbn값을 넘겨주어서 
    }

    const showInfo = (index) => {
        setClickedBookIndex(index === clickedBookIndex ? null : index);
    };

    const closeModal = () => {
        setClickedBookIndex(null);
      };

    const toggleBookmark = (id) => {//즐겨찾기 부분
        // setBookmarked((prev) => 
        //     prev.includes(id) ? prev.filter(index => index !== id) : [...prev, id]
        // ); //이렇게 하면 북마크 취소가능 -> 그저 화면상에 보여지는 모습만

        if (!bookmarked.includes(id)) {
            setBookmarked((prev) => [...prev, id]);
        }  //이렇게 하면 북마크가 취소 불가
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
        <RecommendResultPage>
            <Header>
            <img className="logo" src ={logo} onClick={()=>handleItemClick('/afterlogin',token)}/>
        
                <ul className="nav">
                    <li>
                    <a className="orangeText" onClick={() => handleItemClick('/afterlogin/mylibrary',token)}>내 서재</a>
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
                                 <div className="author">{book.author}</div>  {/* .join은 작가 여러명일때 콤마 붙이기 위한 용도 */}
                                 {clickedBookIndex === index && (
                                    <ModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <ModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                            <img className="modalCover" src={book.thumbnail} alt="Book Thumbnail"/>
                                            <p className="modalTitle">{book.title || "N/A"}</p>
                                            <p className="modalAuthor">{book.authors?.join(', ') || "N/A"}</p>
                                            <p className="modalPublisher">{book.publisher || "N/A"}</p>  {/* "N/A는 저 카테고리가 없는경우 처리" */}
                                            <button className="modalPickBtn" onClick={()=>handlePickClick(book.isbn,book.title,book.authors,book.thumbnail,book.contents,book.publisher,book.date)}>찜하기</button>
                                            <p className="modalContents">{book.contents || "N/A"}</p>
                                        </ModalContent>
                                 </ModalOverlay>
                                 )}
                                 <div className="pickBtn" onClick={() => handlePickClick(book.isbn,book.title,book.author,book.thumbnail,book.contents,book.publisher,book.date,index)}>
                                    <span className="material-symbols-outlined" style={{ backgroundColor: bookmarked.includes(book.isbn) ? "#FF6E23" : "transparent" }}>
                                        bookmark
                                    </span>
                                    <p style={{ color: bookmarked.includes(book.isbn) ? "black" : "#989BA2" }}>찜하기</p>
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