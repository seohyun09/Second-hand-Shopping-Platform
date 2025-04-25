import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header/Header';
import './OtherProfileStyles.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OtherProfile() {
    const { id: userID } = useParams();
    const [userData, setUserData] = useState({
        id: '',
        email: '',
        intro: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${userID}`);
                setUserData(response.data);
            } catch (error) {
                console.error('유저 정보 불러오기 실패:', error);
            }
        };

        fetchUser();
    }, [userID]);

    return (
        <div>
            <Header />
            <div className='profile-container'>
                <div className='profile-section'>
                    <p className='profile-label'>아이디 :</p>
                    <p className='profile-value'>{userData.email}</p>
                </div>
                <div className='profile-section'>
                    <p className='profile-label'>사용자 소개 :</p>
                    <p className='profile-value'>{userData.intro}</p>
                </div>
            </div>
        </div>
    );
}

export default OtherProfile;
