import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect,useState } from "react";
import "../css/BeforeLoginMain.css";
import findLogo from "../assets/findLogo.png";
import greenpic from "../assets/greenpic.png";
import pluspic from "../assets/pluspic.png";
import blurpic from "../assets/blurpic.png";
import orange_banner from "../assets/orange_banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import {bookAPI} from "../api";

const API_KEY=process.env.REACT_APP_KAKAO_BOOK_API_KEY;

export function BeforeLoginMain(){
    const navigate=useNavigate();
    const [searchWord,setSearchWord]=useState("");
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bookmarked, setBookmarked] = useState([]);
    

    useEffect(() => {
        // Simulate fetching data from server
        const fetchData = async () => {
            const mockData = [
                { id: 1, title: "책 1", content: "사람은 미래에 대한 기대가 있어야만 세상을 살아갈 수 있다.", hearts: 620 },
                { id: 2, title: "책 2", content: "결국 직장에서 성공 원리는 아주 간단하다. 자기 일처럼 상상하며 알아가 보도록 하라." ,hearts: 720},
                { id: 3, title: "책 3", content: "결정의 순간에 할 수 있는 최선은 좋은 일을 하는 것이며, 차선은 옳은 일을 하는 것이다." ,hearts: 420},
                { id: 4, title: "책 4", content: "결정의 순간에 할 수 있는 최선은 좋은 일을 하는 것이며, 차선은 옳은 일을 하는 것이다." ,hearts: 120},
                { id: 5, title: "책 5", content: "결정의 순간에 할 수 있는 최선은 좋은 일을 하는 것이며, 차선은 옳은 일을 하는 것이다." ,hearts: 150},
                // Add more mock data here
            ];
            setData(mockData);
        };
        fetchData();
    }, []);

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
        
            }));   //documents는 배열이기 때문에 아래 방식이 아닌 이런 방식으로 처리해야 함

            // const results = {
            //     thumbnail: response.data.documents[0].thumbnail,
            //     authors: response.data.documents[0].authors
            // };  근데 이렇게 했을때 검색결과가 왜 하나도 안뜨는지는 모르겠음
            

            navigate("/booksearchresult", { state: { results ,searchWord } });  //search한 데이터를 다른 페이지로 넘기기 

            console.log(response.data);
        }
        catch(e){
            console.log(e);
        }
    }
    
    const handleItemClick=(path)=>{
        navigate(path);
    };

    const handleSearchWordChange=(e)=>{
        setSearchWord(e.target.value);
    };

    const handleSearch=()=>{
        //handleItemClick("/booksearchresult")
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

    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 3) % data.length);
    // };

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex - 3 + data.length) % data.length);
    // };

    const nextSlide = () => {
        if (currentIndex < data.length - 3) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const getVisibleItems = () => {
        return data.slice(currentIndex, currentIndex + 3);
    };
    
    // const getVisibleItems = () => {
    //     if (data.length <= 3) {
    //         return data;
    //     }

    //     const visibleItems = [];
    //     for (let i = 0; i < 3; i++) {
    //         visibleItems.push(data[(currentIndex + i) % data.length]);
    //     }
    //     return visibleItems;
    // };

    return( 
        <div className="mainPage1">
            <div className="header">
                <div className="logo">
                    <p>로고</p>
                </div>

                <ul className="nav">
                    <li><a onClick={()=>handleItemClick("/login")}>내 서재</a></li>
                    <li><a onClick={()=>handleItemClick("/login")}>커뮤니티</a></li>
                    <li><a onClick={()=>handleItemClick("/join")}>회원가입</a></li>
                    <li><button className="loginBtn" onClick={()=>handleItemClick("/login")}>로그인</button></li>
                </ul>
            </div>

            <div className="text1">
                <p>Refresh your mind with fresh books</p>
            </div>

            <div className="findBookContainer">
                <div className="findBook">
                    <img src={findLogo} className="searchBtn" onClick={handleSearch}></img>
                    <input type="text" className="bookFind" placeholder="책 이름 검색하고 내 서재에 추가하기" value={searchWord} onChange={handleSearchWordChange} onKeyDown={handleKeyDown} ></input>
                </div>
            </div>

            <div className="myBookShelf">
                <div className="text2">
                    <p>내 서재</p>
                </div>

                <div className="pictureBtns">
                    <div className="plusBtns">
                        <img src={greenpic} className="greenPic"></img>
                        {/*<img src={pluspic} className="plusPicBtn" onClick={()=>handleItemClick("/login")}></img>*/}
                    </div>

                    <div className="blurBtn">
                        <img src={blurpic} className="blurPic" onClick={()=>handleItemClick("/login")}></img>
                    </div>
                </div>
            </div>

            <div className="banner" onClick={()=>handleItemClick("/login")}>
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
                    
                    <span className="material-icons left-arrow-icon" onClick={prevSlide} style={{ color: currentIndex === 0 ? '#989BA2' : '#FF6E23' }}>
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
                    <span className="material-icons right-arrow-icon" onClick={nextSlide} style={{ color: currentIndex >= data.length - 3 ? '#989BA2' : '#FF6E23' }}>
                        arrow_circle_right
                    </span>
                    
                </div>
            </div>
        </div>
        
    );
}