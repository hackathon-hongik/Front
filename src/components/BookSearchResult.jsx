
import { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from "react";


export function BookSearchResult(){
    const location = useLocation();
    const { results } = location.state || { results: [] };  // Use state to get results
    const navigate=useNavigate();
    const [clickedBookIndex, setClickedBookIndex] = useState(null);
    const [navigating, setNavigating] = useState(false);


    // useEffect(() => {
    //     if (navigating) {
    //         // Reset the navigating state after a navigation event to avoid unnecessary re-renders
    //         setNavigating(false);
    //     }
    // }, [navigating]);

    const showInfo = (index) => {
        setClickedBookIndex(index === clickedBookIndex ? null : index);
    };

    // const gotoURL = (url) => {
    //     setNavigating(true); // Set navigating state to true before navigation
    //     window.location.href = url;
    // };

    return (
        <>
        
        <div className="resultPage">
            <h2>Search Results</h2>
            {results.length > 0 ? (
                results.map((book, index) => (
                    <div key={index} className="bookItem" onClick={()=>showInfo(index)}>
                        <img src={book.thumbnail} alt="Book Thumbnail" />
                        <p>Authors: {book.authors.join(', ')}</p>  {/*.join은 작가 여러명일때 콤마 붙이기 위한 용도*/}
                        {clickedBookIndex===index && (<div className="specificInfo">
                            <p>제목: {book.title  || "N/A"}</p>
                            <p>책 설명:{book.contents || "N/A"}</p>
                            <p>작가:{book.authors?.join(', ') || "N/A"}</p>
                            <p>출판사:{book.publisher  || "N/A"}</p>  {/*"N/A는 저 카테고리가 없는경우 처리"*/}
                            {/* <p className="bookUrl" onClick={() => gotoURL(book.url)}>URL: {book.url}</p> */}
                        </div>)}
                        <span class="material-symbols-outlined" onClick={()=>navigate("/afterlogin")}>
                            add_circle
                        </span>
                        <span class="material-symbols-outlined">
                            bookmark
                        </span>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>

        <button className="x" onClick={()=>navigate("/afterlogin")}>뒤로</button>
        </>
    );
}