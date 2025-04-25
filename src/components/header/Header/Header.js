import React from 'react';
import './HeaderStyles.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const goMain = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/loginmain');
        }
    };

    return (
        <div onClick={goMain}>
            <h1>서현마켓고</h1>
        </div>
    );
}

export default Header;
