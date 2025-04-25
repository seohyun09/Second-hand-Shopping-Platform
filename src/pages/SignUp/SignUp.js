import React, { useState } from 'react';
import axios from 'axios';
import './SignUpStyles.css';
import Header from '../../components/header/Header/Header';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // ✅ 추가

    const handleSubmit = async () => {
        const formData = { name, email, password };
        try {
            const response = await axios.post('http://localhost:8080/users', formData);
            if (response.status === 200 || response.status === 201) {
                alert('회원가입 성공!');
                navigate('/login'); // ✅ 이동
            }
        } catch (error) {
            console.error(error);
            alert('회원가입에 실패했습니다.');
        }
    };

    return (
        <div>
            <Header />
            <div className='sign-up-container'>
                <div className='sign-up-box'>
                    <h2 className='sign-up-title'>회원가입</h2>

                    <div className='input-container'>
                        <label className='input-label'>이름</label>
                        <input
                            type='text'
                            placeholder='이름 입력'
                            className='input-field'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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

                    <button className='sign-up-button' onClick={handleSubmit}>
                        가입하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
