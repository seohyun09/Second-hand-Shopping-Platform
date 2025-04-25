import React, { useState } from 'react';
import Header from '../../components/header/Header/Header';
import './ProductAlertStyles.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ProductAlert() {
    const { id: productId } = useParams();
    const [alertTitle, setAlertTitle] = useState('');
    const [alertContent, setAlertContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
            const response = await axios.patch(
                `http://localhost:8080/products/${productId}/alert`,
                { alertTitle, alertContent },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log('신고 성공:', response.data);
            alert('신고를 성공 하였습니다');
            navigate('/loginmain');
        } catch (error) {
            console.error('신고 제출 실패:', error);
            alert('신고 실패 하였습니다');
        }
    };

    return (
        <div>
            <Header />
            <div className='alert-form-container'>
                <div className='alert-form-group'>
                    <p className='alert-label'>신고 제목</p>
                    <input
                        className='alert-input'
                        placeholder='신고 제목을 입력하세요'
                        value={alertTitle}
                        onChange={(e) => setAlertTitle(e.target.value)} // 제목 입력 시 상태 업데이트
                    />
                </div>
                <div className='alert-form-group'>
                    <p className='alert-label'>신고 이유</p>
                    <input
                        className='alert-input-content'
                        placeholder='신고 이유를 입력하세요'
                        value={alertContent}
                        onChange={(e) => setAlertContent(e.target.value)} // 이유 입력 시 상태 업데이트
                    />
                </div>
                <div className='alert-button-wrapper'>
                    <button onClick={handleSubmit}>신고서 제출하기</button>
                </div>
            </div>
        </div>
    );
}

export default ProductAlert;
