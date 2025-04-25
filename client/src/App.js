import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RedirectBasedOnLogin from './components/header/Header/RedirectBasedOnLogin/RedirectBasedOnLogin';
import Main from './pages/Main/Main';
import LoginMain from './pages/LoginMain/LoginMain';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import MyPage from './pages/MyPage/MyPage';
import RegisterProduct from './pages/RegisterProduct/RegisterProduct';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import UserAlert from './pages/UserAlert/UserAlert';
import ProductAlert from './pages/ProductAlert/ProductAlert';
import OtherProfile from './pages/OtherProfile/OtherProfile';

function App() {
    return (
        <Router>
            <Routes>
                {/* 기본 경로는 Redirect 컴포넌트를 통해 리디렉션 */}
                <Route path='/' element={<RedirectBasedOnLogin />} />
                <Route path='/main' element={<Main />} />
                <Route path='/loginmain' element={<LoginMain />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/registerproduct' element={<RegisterProduct />} />
                <Route path='/productdetail/:id' element={<ProductDetail />} />
                <Route path='/useralert' element={<UserAlert />} />
                <Route path='/productalert/:id' element={<ProductAlert />} />
                <Route path='/otherprofile/:id' element={<OtherProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
