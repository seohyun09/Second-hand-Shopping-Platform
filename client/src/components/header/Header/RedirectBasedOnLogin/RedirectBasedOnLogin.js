import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectBasedOnLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // 로그인 상태일 경우 /loginmain으로 리디렉션
            navigate('/loginmain');
        } else {
            // 로그인하지 않은 상태일 경우 /main으로 리디렉션
            navigate('/main');
        }
    }, [navigate]);

    return null; // 화면에 렌더링할 내용은 없음
}

export default RedirectBasedOnLogin;
