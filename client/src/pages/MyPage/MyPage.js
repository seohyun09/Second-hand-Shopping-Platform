import React, { useEffect, useState } from 'react';
import './MyPageStyles.css';
import Header from '../../components/header/Header/Header';
import axios from 'axios';

function MyPage() {
    const [userData, setUserData] = useState({ id: '', email: '', intro: '' });
    const [products, setProducts] = useState([]);

    // 모달 상태
    const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const [newIntro, setNewIntro] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!newIntro) {
                    console.log('널값이에용');
                }
                console.log(userData);
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/users', {
                    headers: { Authorization: token },
                });
                setUserData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('유저 정보 불러오기 실패:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (!userData.id) return;

        const fetchUserProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/products/users/${userData.id}`, {
                    headers: { Authorization: token },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('상품 정보 불러오기 실패:', error);
            }
        };

        fetchUserProducts();
    }, [userData.id]);

    const handleIntroSubmit = async () => {
        try {
            if (!newIntro) {
                console.log('널값이에용');
            }
            console.log(newIntro);
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                'http://localhost:8080/users/intro',
                { newIntro },
                { headers: { Authorization: token } }
            );

            console.log(userData.intro);
            console.log(userData);
            setIsIntroModalOpen(false);
        } catch (error) {
            console.error('소개글 수정 실패:', error);
        }
    };

    const handlePasswordSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                'http://localhost:8080/users/password',
                { password },
                { headers: { Authorization: token } }
            );
            setIsPasswordModalOpen(false);
            alert('비밀번호 수정이 완료되었습니다');
        } catch (error) {
            console.error('비밀번호 수정 실패:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className='profile-wrapper'>
                <div className='profile-container'>
                    <div className='profile-header'>
                        <div>
                            <p className='profile-id'>아이디 | {userData.email}</p>
                            <p className='profile-desc'>소개글 | {userData.intro}</p>
                        </div>
                        <div>
                            <button className='password-btn' onClick={() => setIsIntroModalOpen(true)}>
                                소개글 수정하기
                            </button>
                            <button className='password-btn' onClick={() => setIsPasswordModalOpen(true)}>
                                비밀번호 수정하기
                            </button>
                        </div>
                    </div>
                    <div className='product-list'>
                        <p className='product-title'>등록된 상품 리스트</p>
                        {products.length === 0 ? (
                            <p className='no-products'>등록된 상품이 없습니다.</p>
                        ) : (
                            products.map((product) => (
                                <div key={product.productId} className='product-card'>
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

            {/* 소개글 수정 모달 */}
            {isIntroModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>소개글 수정</h2>
                        <input
                            value={newIntro}
                            onChange={(e) => setNewIntro(e.target.value)}
                            placeholder='새로운 소개글을 입력하세요'
                        />
                        <button onClick={handleIntroSubmit}>수정하기</button>
                        <button onClick={() => setIsIntroModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}

            {/* 비밀번호 수정 모달 */}
            {isPasswordModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>비밀번호 수정</h2>
                        <input
                            type='text'
                            placeholder='새로운 비밀번호를 입력하세요'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handlePasswordSubmit}>수정하기</button>
                        <button onClick={() => setIsPasswordModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyPage;
