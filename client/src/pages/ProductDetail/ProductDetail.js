import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header/Header';
import './ProductDetailStyles.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
    const { id: productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/products/${productId}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setProduct(response.data);
                console.log(response.data);
            } catch (err) {
                setError('상품 정보를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header />
            {product && (
                <div className='product-detail-container'>
                    <h3 className='product-title'>{product.productname}</h3>
                    <p className='product-desc'>{product.content}</p>

                    <div className='product-price'>
                        <p>
                            판매가격 : <span>{product.price.toLocaleString()}원</span>
                        </p>
                    </div>

                    <div className='seller-section'>
                        <div className='button-group'>
                            <p>
                                판매자 : <span>{product.username}</span>
                            </p>
                            <div className='product-button-group'>
                                <button
                                    className='product-button chat-btn'
                                    onClick={() => navigate(`/otherprofile/${product.userId}`)}
                                >
                                    판매자 프로필보기
                                </button>
                                <button
                                    className='product-button report-btn'
                                    onClick={() => navigate(`/productalert/${productId}`)}
                                >
                                    상품 신고하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
