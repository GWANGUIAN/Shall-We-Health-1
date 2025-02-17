import React from 'react';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginModal } from '../actions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faThList, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';
import axios from "axios"

export default function NavigationBar() {
  const dispatch = useDispatch();
  const { isModal } = useSelector((state) => state.loginModalReducer);
  const { isLogin, isAdmin } = useSelector((state) => state.loginReducer);

  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_SERVER_API}/user/logout`, "", { withCredentials: true })
      .then(window.location.replace("/"))
      .catch(err => console.log(err))
  }

  const handleModal = () => {
    dispatch(loginModal(!isModal))
  }


  return (
    <div className='navBar-container'>
      <div className='bar'>
        <img alt='logo' src='img/logo.svg' className='home-logo web' onError={(e) => { e.target.onerror = null; e.target.src = '../img/logo.svg' }} onClick={() => { window.location.replace('/') }} />
        <img alt='logo' src='img/symbol.svg' className='home-logo mobile' onError={(e) => { e.target.onerror = null; e.target.src = '../img/symbol.svg' }} onClick={() => { window.location.replace('/') }} />
        <div className='btn-board'>
          <Link
            to='/board'
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          >
            <span className='web'>매칭 게시판</span>
            <FontAwesomeIcon className='board mobile' icon={faThList} />
          </Link>
        </div>
        <div className='btn-search'>
          <Link
            to='/find-partner'
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          >
            <span className='web'>메이트 모집</span>
            <FontAwesomeIcon className='find-partner mobile' icon={faSearch} />
          </Link>
        </div>
        {isLogin ? (
          <>
            <div className='btn-mypage'>
              <Link
                to='/mypage'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <span className='web'>마이페이지</span>
                <FontAwesomeIcon className='mypage mobile' icon={faUser} />
              </Link>
            </div>
            <div className='btn-logout'>
              <span onClick={handleLogout}>로그아웃</span>
            </div>
          </>
        ) : (
          <>
            <div className='btn-login-nav'>
              <span onClick={handleModal}>로그인</span>
            </div>
            <div className='btn-signup'>
              <Link
                to='/signup'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <span>회원가입</span>
              </Link>
            </div>
          </>
        )}
        {isAdmin && isLogin ? (
          <div className='btn-admin'>
            <Link
              to='/admin'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              <FontAwesomeIcon icon={faCog} />
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
      {isModal ? <Login /> : ''}
    </div>
  );
}