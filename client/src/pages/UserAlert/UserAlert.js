import React from 'react';
import Header from '../../components/header/Header/Header';
import './UserAlertStyles.css';

function UserAlert() {
    return (
        <div>
            <Header />
            <div className='alert-form-container'>
                <div className='alert-form-group'>
                    <p className='alert-label'>신고 제목</p>
                    <input className='alert-input' placeholder='신고 제목을 입력하세요' />
                </div>
                <div className='alert-form-group'>
                    <p className='alert-label'>신고 이유</p>
                    <input className='alert-input-content' placeholder='신고 이유를 입력하세요' />
                </div>
                <div className='alert-button-wrapper'>
                    <button>신고서 제출하기</button>
                </div>
            </div>
        </div>
    );
}

export default UserAlert;
