import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header/Header';
import './RegisterProductStyles.css';
import { useNavigate } from 'react-router-dom';

function RegisterProduct() {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8080/products',
                { name, content, price },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            alert('상품이 성공적으로 등록되었습니다!');
            console.log(response.data);
            navigate('/loginmain');
        } catch (error) {
            console.error(error);
            alert('상품 등록에 실패했습니다.');
        }
    };

    return (
        <div>
            <Header />
            <div className='product-form-container'>
                <input
                    className='product-input'
                    placeholder='상품 이름을 입력하세요'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className='product-input'
                    placeholder='등록하실 상품에 대해서 설명해주세요'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className='product-price-container'>
                    <p>판매가격:</p>
                    <input className='price-input' value={price} onChange={(e) => setPrice(e.target.value)} />
                    <p>원</p>
                </div>
                <div>
                    <button className='register-button' onClick={handleRegister}>
                        상품 등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterProduct;
