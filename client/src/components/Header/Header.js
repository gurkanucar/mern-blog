import React from 'react'
import "../../App.css";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to="/" className="logo">Logo</Link>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    )
}

export default Header