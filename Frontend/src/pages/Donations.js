import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { procesarValor } from '../utils/processValue';

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
        <div>
            <div>
                <h1>Pagina de donativos</h1>
                <p>M</p>
            </div>
            <div>
                <form className="">
                    <p>What is your wallet address?</p>
                    <input type="text" id="walletAddressSender" value={walletAddressSender}
                    onChange={(e) => setWalletAddressSender(e.target.value)}
                    placeholder="URL">
                    </input>
             
                    <button id="enviarBtn" onClick={handleEnviar}>Use this wallet</button>   
                </form>
            </div>
        </div>
    );
    

}