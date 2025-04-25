import React, { useEffect, useState } from 'react';
import './MyPageStyles.css';
import Header from '../../components/header/Header/Header';
import axios from 'axios';

function MyPage() {
    const [userData, setUserData] = useState({ id: '', email: '', intro: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/users', {
                    headers: {
                        Authorization: token,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('유저 정보 불러오기 실패:', error);
            }
        };

        fetchUserData();
    }, []);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/products/users/${userData.id}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                const { userId, username, products } = response.data;
                setUserData({ userId, username });
                setProducts(products);
            } catch (error) {
                console.error('유저 정보 불러오기 실패:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <Header />
            <div className='profile-wrapper'>
                <div className='profile-container'>
                    <div className='profile-header'>
                        <div>
                            <p className='profile-id'>아이디 | {userData.id}</p>
                            <p className='profile-desc'>소개글 | {userData.intro}</p>
                        </div>
                        <div>
                            <button className='password-btn'>소개글 수정하기</button>
                            <button className='password-btn'>비밀번호 수정하기</button>
                        </div>
                    </div>
                    <div className='product-list'>
                        <p className='product-title'>등록된 상품 리스트</p>
                        {products.length === 0 ? (
                            <p className='no-products'>등록된 상품이 없습니다.</p>
                        ) : (
                            products.map((product) => (
                                <div key={product.productId} className='product-card'>
                                    <img
                                        src='https://via.placeholder.com/240x160'
                                        alt='상품 이미지'
                                        className='product-img'
                                    />
                                    <p className='product-desc'>
                                        <strong>{product.productname}</strong>
                                        <br />
                                        {product.content}
                                        <br />
                                        가격: {product.price.toLocaleString()}원
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;
