import React from 'react';
import Header from '../../components/header/Header/Header';
import './Main.css';
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();

    return (
        <div className='main-container'>
            <Header />
            <div className='center-box'>
                <button onClick={() => navigate('/signup')}>회원가입</button>
                <button onClick={() => navigate('/login')}>로그인</button>
            </div>
        </div>
    );
}

export default Main;
