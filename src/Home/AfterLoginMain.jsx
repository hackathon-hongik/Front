import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect,useState } from "react";
import "../css/AfterLoginMain.css";
import findLogo from "../assets/findLogo.png";
import greenpic from "../assets/greenpic.png";
import pluspic from "../assets/pluspic.png";
import orange_banner from "../assets/orange_banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import {bookAPI} from "../api";
import { axiosInstance } from "../api";

const API_KEY=process.env.REACT_APP_KAKAO_BOOK_API_KEY;

export function AfterLoginMain(){
    const navigate=useNavigate();
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bookmarked, setBookmarked] = useState([]);
    const [isCheck,setCheck]=useState(false);
    const [searchWord,setSearchWord]=useState("");
    const [bookResults,setBookResults]=useState([]);
    const [readingCount,setReadingCount]=useState(0);

    const mockData = [
        { id: 1, title: "책 1", content: "사람은 미래에 대한 기대가 있어야만 세상을 살아갈 수 있다.", hearts: 620 },
        { id: 2, title: "책 2", content: "결국 직장에서 성공 원리는 아주 간단하다. 자기 일처럼 상상하며 알아가 보도록 하라." ,hearts: 720},
        { id: 3, title: "책 3", content: "결정의 순간에 할 수 있는 최선은 좋은 일을 하는 것이며, 차선은 옳은 일을 하는 것이다." ,hearts: 420},
        { id: 4, title: "책 4", content: "결정의 순간에 할 수 있는 최선은 좋은 일을 하는 것이며, 차선은 옳은 일을 하는 것이다." ,hearts: 120},
        { id: 5, title: "책 5", content: "결정의 순간에 할 수 있는 최선은 좋은 일을 하는 것이며, 차선은 옳은 일을 하는 것이다." ,hearts: 150},
        // Add more mock data here
    ];

   
    useEffect(() => {
        fetchBook();
        fetchOneLine();
    }, []);


    const fetchOneLine = async () => {
        setData(mockData);
    };

    const fetchBook=async()=>{
        try{
            const response=await axiosInstance.get('/1/');
            setBookResults(response.data.recent_reading_books)
            setReadingCount(response.data.reading_count);
            console.log(response);
        }
        catch(e){
            console.log(e);
        }
    }

    const searchData=async()=>{ 
        try{
            const response=await bookAPI.get(`/v3/search/book?query=${searchWord}`,{
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
                publisher:doc.publisher,
                date:doc.datetime
            }));   //documents는 배열이기 때문에 아래 방식이 아닌 이런 방식으로 처리해야 함

            // const results = {
            //     thumbnail: response.data.documents[0].thumbnail,
            //     authors: response.data.documents[0].authors
            // };  근데 이렇게 했을때 검색결과가 왜 하나도 안뜨는지는 모르겠음
            

            navigate("/afterlogin/booksearchresult", { state: { results, searchWord } });  //search한 데이터를 다른 페이지로 넘기기 

            console.log(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    const handleItemClick=(path)=>{
        navigate(path);
    };

    const handleTitleChange=(e)=>{
        setSearchWord(e.target.value);
    };

    const handleSearch=()=>{
        searchData();
    };

    const handleKeyDown = (e) => {       //책 검색 후 엔터버튼을 눌렀을때 책 검색이 이루어지도록 -> 돋보기 표시 클릭했을때와 같은 기능
        if (e.key === 'Enter') {
            handleSearch();
        }               
    };

    

    const toggleBookmark = (id) => {
        setBookmarked((prev) => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    }; //즐겨찾기 부분

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % data.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 3 + data.length) % data.length);
    };

    const getVisibleItems = () => {
        if (data.length <= 3) {
            return data;
        }

        const visibleItems = [];
        for (let i = 0; i < 3; i++) {
            visibleItems.push(data[(currentIndex + i) % data.length]);
        }
        return visibleItems;
    };

    return( 
        <div className="mainPage2">
            <div className="header">
                <div className="logo">
                    <p>로고</p>
                </div>

                <ul className="nav">
                    <li><a onClick={()=>handleItemClick('/afterlogin/mylibrary')}>내 서재</a></li>
                    <li><a onClick={()=>handleItemClick("/afterlogin/community")}>커뮤니티</a></li>
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
            </div>

            <div className="text1">
                <p>Refresh your mind with fresh books</p>
            </div>

            <div className="findBookContainer">
                <div className="findBook">
                    <img src={findLogo} className="searchBtn" onClick={handleSearch}></img>
                    <input type="text" className="bookFind" value={searchWord} onChange={handleTitleChange}  onKeyDown={handleKeyDown} placeholder="책 이름 검색하고 내 서재에 추가하기"></input>
                </div>
            </div>

            <div className="myBookShelf">
                <div className="text2">
                    <p>내 서재</p>
                </div>

                <div className="centerBar">
                    <div className="plusBtns">
                        <img src={greenpic} className="greenPic"></img>
                        <div className="howMany">
                            <div className="showHowMany">
                                <p className="readingCount">{readingCount}권</p>
                            </div>
                            {/*<img src={pluspic} className="plusPicBtn" onClick={()=>handleItemClick()}></img>*/}
                        </div>
                    </div>
        

                    <div className="myBooks">
                        {bookResults.length>0 && (<div className="twoBook"> 
                            <div className="bookInfo">
                                <div className="bookPic">
                                    <img src={bookResults[0].book.thumbnail} alt="bookPic"></img>
                                </div>
                                <div className="bookExplain">
                                    <div className="title">
                                        <p className="bookTitle">{bookResults[0].book.title}</p>
                                    </div>
                                    <div className="writer">
                                        <p className="bookAuthor">{bookResults[0].book.author.replace(/[\[\]']+/g, '')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="toMyShelf" onClick={()=>handleItemClick('/afterlogin/thisbook')}>내 서재 가기</button>
                                <button className="record">바로 기록하기</button>
                            </div>
                        </div>)}

                        {bookResults.length>0 && (<div className="twoBook">
                            <div className="bookInfo">
                                <div className="bookPic">
                                    <img src={bookResults[1].book.thumbnail} alt="bookPic"></img>
                                </div>
                                <div className="bookExplain">
                                    <div className="title">
                                        <p className="bookTitle">{bookResults[1].book.title}</p>
                                    </div>
                                    <div className="writer">
                                        <p className="bookAuthor">{bookResults[1].book.author.replace(/[\[\]']+/g, '')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="toMyShelf" onClick={()=>handleItemClick('/afterlogin/thisbook')}>내 서재 가기</button>
                                <button className="record">바로 기록하기</button>
                            </div>
                        </div>)}
                    </div>

                    <div className="gotoMyShelfBox">
                        {/* <button className="gotoMyShelfBtn" onClick={()=>handleItemClick('/afterlogin/mylibrary')}>{">"}</button> */}
                        <span className="material-icons right-arrow-icon2" onClick={()=>handleItemClick('/afterlogin/mylibrary')}>
                            arrow_circle_right
                        </span>
                        <div className="text5">
                            <p>내 서재로 이동</p>
                        </div>
                    </div>
                </div>
            </div>
            

            <div className="banner" onClick={()=>handleItemClick("/afterlogin/recommendation")}>
                <div className="text3">
                    <p className="first_row">당신의 고민에 맞는</p>
                    <p className="second_row">책 추천 받기</p>
                </div>

                <img src={orange_banner} className="bannerPic"></img>
            </div>

            <div className="bestLineBox">
                <div className="text4">
                    <p>실시간 인기 '책 한 줄'</p>
                </div>

                <div className="bestList">
                    {/* <button className="arrow leftArrow" onClick={prevSlide}>{"<"}</button> */}
                    <span className="material-icons left-arrow-icon" onClick={prevSlide}>
                        arrow_circle_left
                    </span>
                    {getVisibleItems().map((item) => (
                        <div key={item.id} className="carouselItem">
                            <div className="contents">
                                <h3>{item.title}</h3>
                                <p>{item.content}</p>
                            </div>

                            <div className="status">
                                <div className="heart">
                                    <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                                    <div className="heartNum">
                                        {item.hearts}
                                    </div>
                                </div>
                                <div className="bookmark" onClick={() => toggleBookmark(item.id)} style={{ color: bookmarked.includes(item.id) ? "black" : "grey" }}>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <span className="material-icons right-arrow-icon" onClick={nextSlide}>
                        arrow_circle_right
                    </span>
                    {/* <button className="arrow rightArrow" onClick={nextSlide}>{">"}</button> */}
                </div>
            </div>
        </div>
        
    );
}