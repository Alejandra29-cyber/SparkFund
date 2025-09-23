// backend/controllers/openPaymentsController.js
import db from '../config/db.js';
import { createAuthenticatedClient, isFinalizedGrant } from "@interledger/open-payments";
import fs from "fs";

//Primero iniciamos el pago y todo lo necesario
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

//Aqui continuamos con el proceso despues de haber redirigido al usuario
export const continuePayment = async (req, res) => {
    try {
        const { outgoingPaymentGrant, senderWallet,quoteId} = req.body;
        const privateKey = fs.readFileSync("private.key", "UTF8");
        const client = await createAuthenticatedClient({
            walletAddressUrl: "https://ilp.interledger-test.dev/sparkfund_client",
            privateKey: privateKey,
            keyId: "7d0faecc-71c1-4dbe-acfe-a75b0f426823",
        });

        const sendingWalletAddress = await client.walletAddress.get({
            url: senderWallet
        });



        

//Paso 8. Finalizar la concesion de pago saliente
        const finalizenOutgoingPaymentGrant = await client.grant.continue({
            url:outgoingPaymentGrant.continue.uri,
            accessToken:outgoingPaymentGrant.continue.access_token.value,
        }

    );

    if(!isFinalizedGrant(finalizenOutgoingPaymentGrant)){
        throw new Error("Se espera finalice la concesion");
    }
//Paso 9. Continuar la cotizacion del pago saliente 
    const outgoingPayment = await client.outgoingPayment.create(
        {
            url: sendingWalletAddress.resourceServer,
            accessToken: finalizenOutgoingPaymentGrant.access_token.value,
        },
        {
            walletAddress: sendingWalletAddress.id,
            quoteId: quoteId,
        }
    );
        const amount = outgoingPayment.receiveAmount?.value || 0; 
        const normalizedAmount = Number(amount) / 100;
        const assetCode = outgoingPayment.receiveAmount?.assetCode || "USD";
 // Buscar o crear la wallet en DB
    const [rows] = await db.query(
      "SELECT id FROM wallets WHERE wallet_address = ?",
      [senderWallet]
    );

    let walletId;
    if (rows.length === 0) {
      const [result] = await db.query(
        "INSERT INTO wallets (wallet_address) VALUES (?)",
        [senderWallet]
      );
      walletId = result.insertId;
    } else {
      walletId = rows[0].id;
    }

    // Guardar transacción
    await db.query(
      "INSERT INTO transactions (wallet_id, amount) VALUES (?, ?)",
      [walletId, normalizedAmount]
    );

    res.json({
      success: true,
      message: "Pago realizado y guardado con éxito",
      outgoingPayment,
    });
    

} catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};