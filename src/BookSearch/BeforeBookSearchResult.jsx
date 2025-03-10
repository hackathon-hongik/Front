import { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from "react";
import styled from "styled-components";
import findLogo from "../assets/findLogo.png";
import {bookAPI} from "../api";
import logo from "../assets/Logo.png";

const API_KEY=process.env.REACT_APP_KAKAO_BOOK_API_KEY;

const ResultPage=styled.div`
    width:1620px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:auto;
    background: linear-gradient(0deg, rgba(26, 54, 54, 0.04) 0%, rgba(26, 54, 54, 0.04) 100%), #FFF;

    .text1{
    color: var(--kakao-logo, #000);
    font-feature-settings: 'ss10' on;
    /* Title 3/Medium */
    font-family: "Pretendard JP";
    font-size: 24px;
    font-style: normal;
    font-weight: 550;
    line-height: 133.4%; /* 32.016px */
    letter-spacing: -0.552px;
    margin-right:0px;
    margin-top: 50px;
    /* background-color: red; */
    width:800px;
    height:0px;
    }

    .box{
        width:1200px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .text2{
        color: var(--kakao-logo, #000);
        font-feature-settings: 'ss10' on;
        /* Body 1/Normal - Medium */
        font-family: "Pretendard JP";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 24px */
        letter-spacing: 0.091px;
        margin-right:800px;
        margin-top: 20px;
        width:100px;
        height:30px;
    }

    .orange-text {
        color: #FF6E23;
        font-feature-settings: 'ss10' on;
        /* Body 1/Normal - Bold */
        font-family: "Pretendard JP";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 24px */
        letter-spacing: 0.091px;
}

`;

const Header=styled.div`
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

const FindBookContainer=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    .findBook{
    width:790px;
    height:60px;
    margin-top:56px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border:solid black;
    background-color: white;
    }
    .bookFind{
    width:766px;
    height:57px;
    border: none;
    outline: none;
    color: #808080;

    text-align: center;
    /* Headline 1/Medium */
    font-family: "Pretendard JP";
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 144.5%; /* 26.01px */
    letter-spacing: -0.004px;
    }

    .searchBtn {
        margin-top: 10px;
        margin-right: 0px;
        margin-left: 10px;
        width:40px;
        height:40px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
    
    }
`;

const BookList=styled.div`
    width:800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    /* background-color:red; */
    margin-top: 30px;
`;

const BookCard=styled.div`
    width: 176px;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    /* border: 1px solid #ddd; */
    border:none;
    border-radius: 8px;
    margin-right:15px;
    margin-left:10px;
    box-sizing: border-box;


   &:nth-child(4n) {
    margin-right: 0;
    }
    .cover {
    width: 176px;
    height: 264px;
    object-fit:cover;
    margin-top: 10px;
    }

    .title {
    font-family: "Pretendard JP";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: 0.091px;
    margin-top: 10px;
    width:176px;
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
    width: 176px;
    height: 24px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    .addPickBtn{
        width:160px;
        height:50px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .addBtn{
    display: flex;
    flex-direction: row;
    width: 120px;
    height: 20px;
    padding: 20px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 4px;
    background: var(--kakao-logo, #000);
    color: #FFF;
    margin-left:10px;

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

    .material-symbols-outlined{
        font-size: 32px;
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
export function BeforeBookSearchResult(){  //로그인 전 책 검색하면 나오는 페이지
    const navigate=useNavigate();
    const location = useLocation();
    const { results,searchWord } = location.state || { results: [],searchWord:'' };  // Use state to get results
    const [clickedBookIndex, setClickedBookIndex] = useState(null);
    const [isCheck,setCheck]=useState(false);
    const [newSearchWord,setNewSearchWord]=useState("");  //새로운 책을 입력받기 위한 장치
    const[printNewSearchWord,setPrintNewSearchWord]=useState(""); //책 제목을 입력하고 있을때 화면에 실시간으로 나타나게 하지 않기 위해 프린트용으로 배치
    const [bookResults, setBookResults] = useState([]);
    const [num,setNum]=useState(0);
    const token = location.state?.token || '';
    const refresh=location.state?.refresh||'';
   

    const searchData=async(query)=>{ 
        try{
            const response=await bookAPI.get(`/v3/search/book?query=${newSearchWord}`,{
                params:{
                    size:50,  //가져올 책 권 수 1-50
                    
                },
                headers:{
                    Authorization:`KakaoAK ${API_KEY}`
                }
            });

            const results = response.data.documents.map(doc => ({
                thumbnail: doc.thumbnail,
                authors: doc.authors,
                contents: doc.contents,
                title:doc.title,
                isbn:doc.isbn,
            }));   //documents는 배열이기 때문에 아래 방식이 아닌 이런 방식으로 처리해야 함

            setBookResults(results);
            //setNewSearchWord(query);  //이렇게 하면 입력하고 있는 와중에 화면에 따라서 출력이 됨
            setPrintNewSearchWord(query); //책 제목을 입력하고 있을때 화면에 실시간으로 나타나게 하지 않기 위해 프린트용으로 배치
            setNum(1);

            console.log(response.data);
        }
        catch(e){
            console.log(e);
        }
    }
    
    

    const showInfo = (index) => {
        setClickedBookIndex(index === clickedBookIndex ? null : index);
    };

    const closeModal = () => {
        setClickedBookIndex(null);
      };

    const handleAlert=(path)=>{
        alert("로그인 후 이용해 주세요.");
        navigate(path);
    }

    const handleItemClick=(path)=>{
        navigate(path);
    };
    
    const handleSearchWordChange=(e)=>{
        setNewSearchWord(e.target.value);
    };

    const handleSearch=()=>{
        //handleItemClick("/booksearchresult")
        searchData(newSearchWord);
    };

    const handleKeyDown = (e) => {       //책 검색 후 엔터버튼을 눌렀을때 책 검색이 이루어지도록 -> 돋보기 표시 클릭했을때와 같은 기능
        if (e.key === 'Enter') {
            handleSearch();
        }               
    };

    // const handleLogOut=async()=>{
    //     try{
    //         const newRefresh={
    //             refresh: refresh
    //         }
    //         const response=await axiosInstance.post('/auth/logout/',newRefresh,{
    //             headers:{
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         handleItemClick('/');
    //         console.log(response);
    //     }
    //     catch(e){
    //         console.log(e);
    //         alert("로그아웃 실패");
    //     }
    // }



    return (
        <>
        
        <ResultPage>
            <Header>
                    <img className="logo" src ={logo} onClick={()=>handleItemClick('/afterlogin',token)}/>

                <ul className="nav">
                    <li><a className="orangeText" onClick={()=>handleAlert('/login')}>내 서재</a></li>
                    <li><a onClick={()=>handleAlert('/login')}>커뮤니티</a></li>
                    <li>
                        <div className="buttonToggle">
                            <button className="mypageBtn" onClick={()=>{setCheck((e)=>!e)}}>마이페이지</button>
                            {isCheck &&(
                                <div className="toggleList">
                                <p onClick={()=>handleItemClick('/afterlogin/changenickname',token)}>닉네임 변경</p>
                                <p>로그아웃</p>
                                </div>
                            )}
                         </div>
                    </li>
                </ul>
            </Header>
            {num===0 ? (<div className="text1"> "{searchWord}"에 대한 검색결과</div>)
            :(<div className="text1"> "{printNewSearchWord}"에 대한 검색결과</div>)}

            <FindBookContainer>
                <div className="findBook">
                    <img src={findLogo} className="searchBtn" onClick={handleSearch}></img>
                    <input type="text" className="bookFind" placeholder="책 이름 검색하고 내 서재에 추가하기" value={newSearchWord} onChange={handleSearchWordChange} onKeyDown={handleKeyDown} ></input>
                </div>
            </FindBookContainer>

            {num===0 && (
             <div className="box">
             <div className="text2"> 전체 "<span className="orange-text">{results.length}</span>"권</div>
             <BookList>
                 {results.length > 0 ? (
                         results.map((book, index) => (
                             <BookCard key={index}  onClick={() => showInfo(index)}>
                                 <img className="cover" src={book.thumbnail} alt="Book Thumbnail" />
                                 <div className="title">{book.title}</div>
                                 <div className="author">{book.authors.join(', ')}</div>  {/* .join은 작가 여러명일때 콤마 붙이기 위한 용도 */}
                                 {clickedBookIndex === index && (
                                    <ModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <ModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                            <img className="modalCover" src={book.thumbnail} alt="Book Thumbnail"/>
                                            <p className="modalTitle">{book.title || "N/A"}</p>
                                            <p className="modalAuthor">{book.authors?.join(', ') || "N/A"}</p>
                                            <p className="modalPublisher">{book.publisher || "N/A"}</p>  {/* "N/A는 저 카테고리가 없는경우 처리" */}
                                            <button className="modalAddBtn" onClick={()=>handleAlert("/login")}>읽고 있는 책에 추가</button>
                                            <div className="line"></div>
                                            <p className="modalContents">{book.contents || "N/A"}</p>
                                        </ModalContent>
                                 </ModalOverlay>
                                 )}
                                 <div className="addPickBtn">
                                    <span className="material-symbols-outlined" onClick={() => handleAlert("/login")}>
                                        bookmark
                                    </span>
                                    <button className="addBtn" onClick={() => handleAlert("/login")}>읽고 있는 책</button>
                                 </div>
                                 
                             </BookCard>
                         ))
                     ) : (
                         <p>No results found</p>
                     )}
             </BookList>
             </div>
            )}

            {num===1 && (
             <div className="box">
             <div className="text2"> 전체 "<span className="orange-text">{bookResults.length}</span>"권</div>
             <BookList>
                 {bookResults.length > 0 ? (
                         bookResults.map((book, index) => (
                             <BookCard key={index} onClick={() => showInfo(index)}>
                                 <img className="cover" src={book.thumbnail} alt="Book Thumbnail" />
                                 <div className="title">{book.title}</div>
                                 <div className="author">{book.authors.join(', ')}</div>  {/* .join은 작가 여러명일때 콤마 붙이기 위한 용도 */}
                                 {clickedBookIndex === index && (
                                     <ModalOverlay onClick={closeModal}> {/*모달창 바깥을 눌렀을때 닫히도록*/}
                                        <ModalContent onClick={(e) => e.stopPropagation()}> {/*모달창을 눌렀을때는 꺼지지 않도록*/}
                                            <img className="modalCover" src={book.thumbnail} alt="Book Thumbnail"/>
                                            <p className="modalTitle">{book.title || "N/A"}</p>
                                            <p className="modalAuthor">{book.authors?.join(', ') || "N/A"}</p>
                                            <p className="modalPublisher">{book.publisher || "N/A"}</p>  {/* "N/A는 저 카테고리가 없는경우 처리" */}
                                            <button className="modalAddBtn" onClick={()=>handleAlert("/login")}>읽고 있는 책에 추가</button>
                                            <p className="modalContents">{book.contents || "N/A"}</p>
                                        </ModalContent>
                                  </ModalOverlay>
                                 )}
                                <div className="addPickBtn">
                                    <span className="material-symbols-outlined" onClick={() => handleAlert("/login")}>
                                        bookmark
                                    </span>
                                    <button className="addBtn" onClick={() => handleAlert("/login")}>읽고 있는 책</button>
                                 </div>
                             </BookCard>
                         ))
                     ) : (
                         <p>No results found</p>
                     )}
             </BookList>
             </div>
            )}
        </ResultPage>

        {/* <button className="x" onClick={()=>navigate("/")}>뒤로</button> */}
        </>
    );
}