export const makeOpenPayment = async (paymentData) => {
    try {
        const res = await fetch("http://localhost:5000/api/openPayments/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
    });

    if (!res.ok) {
        throw new Error("Error al realizar el pago");
    }

        const data = await res.json();
        
        return {
            grantId: data.grantId,
            senderWalletUrl: data.senderWallet,
            redirectUrl: data.redirectUrl,
            message: data.message,
            quote: data.quote,
            outgoingPaymentGrant: data.outgoingPaymentGrant,
        } 
    } catch (error) {
        console.error("makeOpenPayment error:", error);
        return { error: error.message };
  }
};

