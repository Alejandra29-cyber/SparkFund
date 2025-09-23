// backend/controllers/openPaymentsController.js
import db from '../config/db.js';
import { createAuthenticatedClient, isFinalizedGrant } from "@interledger/open-payments";
import fs from "fs";

export const handlePayment = async (req, res) => {
  try {
    const { senderWallet, amount, currency } = req.body;
    const receiverWallet = "https://ilp.interledger-test.dev/receivingsparkfund";

//0.-  Crear cliente autenticado
    const privateKey = fs.readFileSync("private.key", "UTF8");
    const client = await createAuthenticatedClient({
      walletAddressUrl: "https://ilp.interledger-test.dev/sparkfund_client",
      privateKey: privateKey,
      keyId: "7d0faecc-71c1-4dbe-acfe-a75b0f426823",
    });

    
// 2. Obtener las direcciones de billetera del remitente y del receptor
    const sendingWalletAddress = await client.walletAddress.get({
        url: senderWallet 
    });
    const receivingWalletAddress = await client.walletAddress.get({
        url: receiverWallet
    });

// 3. Crear una concesión para un pago entrante
    const incomingPaymentGrant = await client.grant.request(
    {
        url: receivingWalletAddress.authServer,
    },
    {
        access_token:{
            access:[
                {
                type:"incoming-payment",
                actions:["create"],
                }
            ]
        }
    }
);
    if(!isFinalizedGrant(incomingPaymentGrant)){
    throw new Error("Se espera finalice la consesion");
    }


//4.- Crear un pago entrante
const value = (Number(amount) * 10 ** receivingWalletAddress.assetScale).toString();
const incomingPayment = await client.incomingPayment.create(
    {
    url: receivingWalletAddress.resourceServer,
    accessToken: incomingPaymentGrant.access_token.value
    },
    {
        walletAddress: receivingWalletAddress.id,
        incomingAmount: {
            assetCode: currency, // por ejemplo, "USD"
            assetScale: receivingWalletAddress.assetScale, // por ejemplo, 2 para centavos
            value: value, // 10 unidades del activo (por ejemplo, 10 USD si el activo es USD)
        },
    }
);
// 5. Crear un concesión para una cotización
    const quoteGrant = await client.grant.request(
    {
        url: sendingWalletAddress.authServer,
    },
    {
        access_token:{
            access:[  
                {
                    type:"quote",
                    actions:["create"]
                }
            ]
        }
    }
);
if(!isFinalizedGrant(quoteGrant)){
        throw new Error("Se espera finalice la concesion");
}
console.log({quoteGrant});
// 6. Obtener una cotización para el remitente
const quote = await client.quote.create(
    {
        url: receivingWalletAddress.resourceServer,
        accessToken: quoteGrant.access_token.value,
    },
    {
        walletAddress: sendingWalletAddress.id,
        receiver: incomingPayment.id,
        method: "ilp",
    }
);

// 6. Obtener una concesiÃ³n para un pago saliente
const outgoingPaymentGrant = await client.grant.request(
        {
            url: sendingWalletAddress.authServer,
        },
        {
            access_token:{
                access: [
                    {
                        type: "outgoing-payment",
                        actions: ["create"],
                        limits: {
                            debitAmount: quote.debitAmount
                        },
                        identifier: sendingWalletAddress.id
                    }
                ]
            },
            interact:{
                start:["redirect"],
            },
        }
        
);
if(!isFinalizedGrant(quoteGrant)){
     throw new Error("Se espera finalice la concesion"); }
res.json({
    outgoingPaymentGrant : outgoingPaymentGrant,
    quote: quote,
    message: "Grant pendiente de autorización",
    redirectUrl: outgoingPaymentGrant.interact.redirect, 
    senderWallet:senderWallet
    
});


 } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};