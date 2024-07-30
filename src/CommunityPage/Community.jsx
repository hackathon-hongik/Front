import { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from "react";
import styled from "styled-components";
import findLogo from "../assets/findLogo.png";
import {bookAPI} from "../api";
import { axiosInstance } from '../api';


export function Community(){

    return(
        <p>커뮤니티창</p>
    );
}