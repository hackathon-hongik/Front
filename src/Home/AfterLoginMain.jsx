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
import { useLocation } from 'react-router-dom'
import logo from "../assets/Logo.png";
import lucky from "../assets/럭키북키.png";

const API_KEY=process.env.REACT_APP_KAKAO_BOOK_API_KEY;

export function AfterLoginMain(){
    const navigate=useNavigate();
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bookmarked, setBookmarked] = useState([]);
    const [isCheck,setCheck]=useState(false);
    const [searchWord,setSearchWord]=useState("");
    const [bookResults,setBookResults]=useState([]);
    const [oneLine,setLineResults]=useState([]);
    const [readingCount,setReadingCount]=useState(0);
    const location = useLocation();
    const token = location.state?.token || '';
    const refresh = location.state?.refresh || '';
    const [isbn,setIsbn]=useState([]);
    const [refreshShortHearts, setRefreshShortHearts] = useState(false);

   
    useEffect(() => {
        //console.log(token);
        //console.log(refresh)
        fetchBook();
        //fetchOneLine();
    }, []);

    useEffect(() => {
        fetchBook();
    }, [refreshShortHearts]);


    const fetchBook=async()=>{
        try{
            const response=await axiosInstance.get('/mainpage/',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const results = response.data.recent_reading_books.map(book => ({
                thumbnail: book.book.thumbnail,
                title: book.book.title,
                author: book.book.author,
              }));

              const oneLine=response.data.popular_reviews.map(line=>({
                id:line.id,
                writer:line.writer,
                bestLine:line.short_note.short_comment,
                title:line.book.title,
                author:line.book.author,
                like_count:line.like_count
              }))
          
              setBookResults(results);
              setLineResults(oneLine);
              setReadingCount(response.data.reading_count);
              const isbnList = response.data.recent_reading_books.map(item => item.book.isbn);
              setIsbn(isbnList); 
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


            navigate("/afterlogin/booksearchresult", { state: { results, searchWord, token, refresh } });  //search한 데이터를 다른 페이지로 넘기기 

            console.log(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    const handleItemClick=(path,token,refresh,isbn)=>{
        navigate(path,{state:{token,refresh,isbn}});
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
        if (currentIndex < oneLine.length - 3) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const getVisibleItems = () => {
        return oneLine.slice(currentIndex, currentIndex + 3);
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

    const clickHeartShort=async(id)=>{
        try{
            const response=await axiosInstance.post(`/community/short-reviews/${id}/like/`,{},{
                headers:{
                    Authorization: `Bearer ${token}`
                } 
            })
            console.log(response);
            setRefreshShortHearts(prev => !prev);
        }
        catch(e){
            if(e.response && e.response.data===400){
                alert('이미 좋아요를 누르신 리뷰입니다!');
            }
            console.log(e);
        }
    }
    return( 
        <div className="mainPage2">
            <div className="header">
                <img className="logo" src ={logo} onClick={()=>handleItemClick('/afterlogin',token,refresh)}/>


                <ul className="nav">
                    <li><a onClick={()=>handleItemClick('/afterlogin/mylibrary',token,refresh)}>내 서재</a></li>
                    <li><a onClick={()=>handleItemClick("/afterlogin/community",token,refresh)}>커뮤니티</a></li>
                    <li>
                        <div className="buttonToggle">
                            <button className="mypageBtn" onClick={()=>{setCheck((e)=>!e)}}>마이페이지</button>
                            {isCheck &&(
                                <div className="toggleList">
                                    <p onClick={()=>handleItemClick('/afterlogin/changenickname',token,refresh)}>닉네임 변경</p>
                                    <p onClick={handleLogOut}>로그아웃</p>     
                            </div>
                            )}
                        </div>
                    </li>
                </ul>
            </div>

            <div className="text1">
                <p>독서로 웰니스에 도달할 수 있다고?</p>
                <img className="Lucky" src ={lucky}/>
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
                        {bookResults.length>0 && bookResults.map((book, index) => (<div className="twoBook"> 
                            <div className="bookInfo">
                                <div className="bookPic">
                                    <img src={book.thumbnail} alt="bookPic"></img>
                                </div>
                                <div className="bookExplain">
                                    <div className="title">
                                        <p className="bookTitle">{book.title}</p>
                                    </div>
                                    <div className="writer">
                                        <p className="bookAuthor">{book.author.replace(/[\[\]']+/g, '')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="toMyShelf" onClick={()=>handleItemClick('/afterlogin/thisbook',token,refresh,isbn[index])}>내 서재 가기</button>
                                <button className="record" onClick={()=>handleItemClick('/afterlogin/note',token,refresh,isbn[index])}>바로 기록하기</button>
                            </div>
                        </div>))}
                    </div>

                    <div className="gotoMyShelfBox">
                        {/* <button className="gotoMyShelfBtn" onClick={()=>handleItemClick('/afterlogin/mylibrary')}>{">"}</button> */}
                        <span className="material-icons right-arrow-icon2" onClick={()=>handleItemClick('/afterlogin/mylibrary',token,refresh)}>
                            arrow_circle_right
                        </span>
                        <div className="text5">
                            <p>내 서재로 이동</p>
                        </div>
                    </div>
                </div>
            </div>
            

            <div className="banner" onClick={()=>handleItemClick("/afterlogin/recommendation",token,refresh)}>
                <div className="text3">
                    <p className="first_row">당신의 고민에 맞는</p>
                    <p className="second_row">책 추천 받기</p>
                </div>

                <img src={orange_banner} className="bannerPic"></img>
            </div>

            <div className="bestLineBox">
                <div className="text4">
                    <p>실시간 인기 '책 속 한 줄'</p>
                </div>

                <div className="bestList">
                    {/* <button className="arrow leftArrow" onClick={prevSlide}>{"<"}</button> */}
                    <span className="material-icons left-arrow-icon" onClick={prevSlide} style={{ color: currentIndex === 0 ? '#989BA2' : '#FF6E23' }}>
                        arrow_circle_left
                    </span>
                    {getVisibleItems().map((item) => (
                        <div key={item.id} className="carouselItem">
                            <div className="contents">
                                <div className="oneLineWriter">{item.writer}</div>
                                <div className="bestLine">{item.bestLine}</div>
                                <div className="bookOneLineInfo">
                                    <div className="bookOneLineTitle">{item.title}</div>
                                    <div className="bookOneLineAuthor">{item.author.replace(/[\[\]']+/g, '')}</div>
                                </div>
                            </div>

                            <div className="status">
                                <div className="heart">
                                    <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} onClick={()=>clickHeartShort(item.id)} />
                                    <div className="heartNum">
                                        {item.like_count}
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    ))}
                    <span className="material-icons right-arrow-icon" onClick={nextSlide} style={{ color: currentIndex >= oneLine.length - 3 ? '#989BA2' : '#FF6E23' }}>
                        arrow_circle_right
                    </span>
    
                </div>
            </div>
        </div>
        
    );
}