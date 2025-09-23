import React,{useState} from "react";
import {  useLocation } from 'react-router-dom';
import { makeOpenPayment } from "../services/api";

function OpenPayments() {
  const location = useLocation();
  const { walletAddressSender} = location.state || {}; 
  const receiverWallet = "https://interledger-test.dev/receivingsparkfund" // receptor estático
  
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
        console.log("El quote es",result.quote);
        
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

    return (
        <div>
        <h1>Aqui puede realizar su donacion</h1>
        <p>Wallet que esta usando es: {walletAddressSender}</p>
        <p>La billetera a la que desea donar es : {receiverWallet} </p>
        <label>
            Monto a enviar:
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Ingresa el monto"
            />
        </label>


        <label>
            Moneda:
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="MXN">MXN</option>
            
            </select>
        </label>
            <button onClick={handlePayment}>Realizar Pago</button>
            <button /*onClick={handleContinuePayment} */ >
            Ya acepté el pago, continuar
        </button>
    </div>
  );
}
export default OpenPayments;