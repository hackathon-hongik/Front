import axios from "axios";

const API_KEY=process.env.REACT_APP_KAKAO_BOOK_API_KEY;

export const axiosInstance=axios.create({
    //baseURL: "http://ec2-54-180-180-204.ap-northeast-2.compute.amazonaws.com",
    baseURL:"http://52.79.246.25"
});



export const bookAPI=axios.create({
    baseURL:"https://dapi.kakao.com",
    // headers:{
    //     Authorization:`KakaoAK ${API_KEY}`
    // }
});