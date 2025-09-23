import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { procesarValor } from '../utils/processValue';
import "../styles/donation.css";

export default function Donation() {

    
    // Estado para guardar el valor del input
    const [walletAddressSender, setWalletAddressSender] = useState("");
    const navigate = useNavigate();

    // Función que se ejecuta al presionar el botón
    const handleEnviar = (e) => {
        e.preventDefault();

    // Llamar a una función externa de tu archivo JS
    procesarValor(walletAddressSender);
    navigate("/OpenPayments", { state: { walletAddressSender } });
    };


    return (
        <div className="background">
            <div className="transparent-container2">
                <h1 className="title">Donative Page</h1>
                
            
                <form className="simple-form">
                    <p>What is your wallet address?</p>
                    <input type="text" className="walletAddressSender" value={walletAddressSender}
                    onChange={(e) => setWalletAddressSender(e.target.value)}
                    placeholder="URL">
                    </input>
             
                    <button id="enviarBtn" onClick={handleEnviar}>Use this wallet</button>   
                </form>
            </div>
        </div>
    );
    

}