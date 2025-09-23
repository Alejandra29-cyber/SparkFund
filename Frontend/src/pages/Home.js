import React from "react";
import DonationsChart from "../components/DonationsChart.jsx";
import '../styles/home.css';
import { Link } from "react-router-dom";
import logo from "../assets/logo_SparkFund.jpeg";


export default function HomePage() {
    return (
        <div className="HomePage">
            <div className="transparent-container">
                <div className="content-wrapper">
                    {/* Contenedor izquierdo - Logo y frase */}
                    <div className="left-content">
                        <div className="logo-container">
                            <img src={logo} alt="Logo" />
                        </div>
                        <h1 className="welcome-title">
                            The spark of change starts with a seed of goodness.
                        </h1>
                    </div>
                    
                    {/* Contenedor derecho - Texto y botón */}
                    <div className="right-content">
                        <p className="description-text">
                            We empower individuals through secure, fee-free micropayments, 
                            ensuring every contribution makes a maximum impact
                        </p>
                        
                        <Link className="donate-button" to = "/Donation" >Donate now</Link>
                    </div>
                </div>
                <div className="Graphics">
            <h1>Donations by Wallet</h1>
                <DonationsChart />
            </div>
            </div>
        </div>
    );
}
