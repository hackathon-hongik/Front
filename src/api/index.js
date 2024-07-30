import axios from "axios";

const API_KEY=process.env.REACT_APP_KAKAO_BOOK_API_KEY;

export const axiosInstance=axios.create({
    baseURL: "",
});



export const bookAPI=axios.create({
    baseURL:"https://dapi.kakao.com",
    // headers:{
    //     Authorization:`KakaoAK ${API_KEY}`
    // }
});