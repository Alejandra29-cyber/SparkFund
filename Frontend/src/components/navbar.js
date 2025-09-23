import React from 'react'
import { Link } from "react-router-dom";
import "../styles/navbar.css"
import logo from "../assets/logo_SparkFund.jpeg"

export default function Navbar(){

    return(
        <nav className='navbar'>
            
            <img className="logo" src={logo} alt="Logo" />
            <h5 className='LogoTitle'>SparkFund</h5>
            <ul className='navbar-ul' >
                <li>
                    <Link className="navbar-ul-li" to = "/" >Home</Link>
                </li>
                
            </ul>
        </nav>
    );
}