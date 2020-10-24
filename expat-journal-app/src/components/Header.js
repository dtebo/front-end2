import React from 'react'
import logo from '../assets/expatLogLogo.svg';
import HeaderPostButton from '../components/HeaderPostButton';
import { Link } from 'react-router-dom'
import '../App';

function Header() {
    const returnToHomePage = () => {
        window.location.pathname = '/posts';
    };

    return (
        <div className={`header-container ${(window.location.pathname === '/' || window.location.pathname === '/register') ? 'hide' : ''}`}>
            <header className='header'>
                <Link onClick={returnToHomePage} to='/posts'><img src={logo}/></Link>
                <h2>Expat Journal</h2>
                <HeaderPostButton editing='false' />
            </header>
        </div>
    )
}

export default Header
