import React from "react";
import DonationsChart from "../components/DonationsChart.jsx";
import '../styles/home.css';



export default function Home() { 
    return (
        <div className="HomePage">
            
            <div className="Welcome">
            <h1>Bienvenido a SarpkFund</h1>
            <p>Mucho gusto, esta es la pagina oficial de la organizacion SparkFund </p>
            </div>

            <div className="Graphics">
            <h1>Total de Donaciones por Wallet</h1>
                <DonationsChart />
            </div>
        </div>
    );
}
