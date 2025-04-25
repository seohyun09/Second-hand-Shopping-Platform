import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header/Header';
import './LoginMainStyles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginMain() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/products?keyword=${searchTerm}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('상품 목록 불러오기 실패:', error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.productname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const moveProductDetail = (id) => {
        navigate(`/productdetail/${id}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('로그아웃 되었습니다.');
        navigate('/login');
    };

    const goToMyPage = () => {
        navigate('/mypage');
    };

    return (
        <div>
            <Header />
            <div className='main-container'>
                <div className='search-bar-container'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='상품을 검색하세요'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='top-buttons'>
                    <button className='mypage-button' onClick={goToMyPage}>
                        마이페이지
                    </button>
                    <button className='logout-button' onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>

                <div className='product-list'>
                    {filteredProducts.map((product) => (
                        <div
                            className='product-card'
                            key={product.productId}
                            onClick={() => moveProductDetail(product.productId)}
                        >
                            <img
                                src='https://via.placeholder.com/240x160'
                                alt='상품 이미지'
                                className='product-image'
                            />
                            <p className='product-description'>
                                <strong>{product.productname}</strong>
                                <br />
                                {product.content}
                                <br />
                                가격: {product.price.toLocaleString()}원
                            </p>
                        </div>
                    ))}
                </div>

                <div className='register-button-fixed'>
                    <button className='register-button' onClick={() => navigate('/registerproduct')}>
                        상품 등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginMain;
