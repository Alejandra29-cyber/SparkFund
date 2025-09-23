import React,{useState} from "react";
import {  useLocation } from 'react-router-dom';
import { makeOpenPayment } from "../services/api";
import "../styles/openPayments.css";

function OpenPayments() {
  const location = useLocation();
  const { walletAddressSender} = location.state || {}; 
  const receiverWallet = "https://ilp.interledger-test.dev/receivingsparkfund" // receptor estático
  
  const [amount, setAmount] = useState(""); 
  const [currency, setCurrency] = useState("USD");
  const [outgoingPaymentGrant, setOutgoingPaymentGrant] = useState(null);
  const [quote, setQuote] = useState(null);
  const [senderWallet,setSenderWAllet] = useState(null);

  const handlePayment = async () => {

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
        alert("Por favor, ingrese una cantidad válida mayor que 0.");
        return;
    }
    try{
        const result = await makeOpenPayment({
            senderWallet: walletAddressSender,
            amount: Number(amount),
            currency: currency,      
        });
        setOutgoingPaymentGrant(result.outgoingPaymentGrant);
        setQuote(result.quote);
        setSenderWAllet(result.senderWalletUrl);
        
        console.log("El outgoing es:",result.outgoingPaymentGrant);
        console.log("El quote es",result.quote.id);
        
        if (result.redirectUrl) {
            window.open(result.redirectUrl, "_blank"); 
        }else {
            alert(`Payment Result: ${JSON.stringify(result)}`);
        }
    }catch (err) {
        console.error(err); 
        alert("Error procesando el pago");
    }
}
const handleContinuePayment = async () => { 
    if (!quote || !outgoingPaymentGrant) {
        alert("No hay datos de pago para continuar. Por favor inicia el pago primero.");
        return;
    }
    try {
    const res = await fetch("http://localhost:5000/api/openPayments/continue-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId:quote.id, outgoingPaymentGrant,senderWallet}),
    });

    const data = await res.json();
    
    if (res.ok) {
        alert("Pago finalizado correctamente ");
    }else {
        alert("Error al continuar con el pago: " + data.error);
    }

    } catch (err) {
        console.error(err);
        alert("Error continuando el pago");
    }
};
    return (
        <div className="background1">
        <div className="transparent-container3">
        <h1>Here you can donate</h1>
        <p>You are using this wallet: {walletAddressSender}</p>
        <p>You will send to this wallet: {receiverWallet}</p>

        
        <label>
            Amount:
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Impress the amount"
            />
        </label>


        <label className="custom-label">
            Currency:
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="MXN">MXN</option>
            
            </select>
        </label>
            <button class="custom-button" onClick={handlePayment}>Donate</button>
            <button class="custom-button" onClick={handleContinuePayment} >
            I donate already, continue
        </button>
       
    </div>
    </div>
  );
}
export default OpenPayments;