import React from 'react'
import { Link } from "react-router-dom";
import "../styles/navbar.css"

export default function Navbar(){

    return(
        <nav className='navbar'>
            <ul className='navbar-ul' >
                <li>
                    <Link className="navbar-ul-li" to = "/" >Home</Link>
                </li>
                <li>
                    <Link className="navbar-ul-li" to = "/Donation" >Donation</Link>
                </li>
            </ul>
        </nav>
    );
}