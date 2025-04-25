import React, { useState } from 'react';
import axios from 'axios';
import './LoginStyles.css';
import Header from '../../components/header/Header/Header';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/users/sign-in',
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            const token = response.headers['authorization'];

            if (token) {
                localStorage.setItem('token', token); // ✅ 토큰 로컬스토리지 저장
                alert('로그인 성공!');
                navigate('/loginmain'); // ✅ 로그인 성공 후 이동할 경로
            } else {
                alert('로그인 실패: 토큰이 없습니다.');
            }
        } catch (error) {
            console.error(error);
            alert('로그인 실패');
        }
    };

    return (
        <div>
            <Header />
            <div className='sign-up-container'>
                <div className='sign-up-box'>
                    <h2 className='sign-up-title'>로그인</h2>

                    <div className='input-container'>
                        <label className='input-label'>아이디</label>
                        <input
                            type='text'
                            placeholder='아이디 입력'
                            className='input-field'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='input-container'>
                        <label className='input-label'>비밀번호</label>
                        <input
                            type='password'
                            placeholder='비밀번호 입력'
                            className='input-field'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className='sign-up-button' onClick={handleLogin}>
                        로그인하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
