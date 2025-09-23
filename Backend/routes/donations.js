import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post('/confirm',async (req,res)=>{
    const {wallet, amount,paymentId} = req.body;

    try{
        const isPaid = await verifyPayment(paymentId); // tu función que consulta la API

        if (!isPaid) {
        return res.status(400).json({ success: false, message: 'El pago no fue completado' });
        }

        const [rows] = await db.query('SELECT id FROM wallets WHERE wallet_address = ?',[wallet]);

        let walletId;
        if(rows.length === 0){
            const [result]  = await db.query('INSERT INTO wallets (wallet_address) VALUES (?)',[wallet]);
            walletId = result.insertId;  
        } else{
            walletId = rows[0].id;
        }
        
        await db.query('INSERT INTO transactions (wallet_id, amount) VALUES (?,?)',[walletId,amount]);
        res.json({success: true, walletId});
    }   catch(err){
            console.error('Error saving donation',err);
            res.status(500).json({ succes: false, message: 'Error saving donation' });
    }
});

// Endpoint total donado
router.get("/total", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM transactions
    `);
    res.json({ success: true, total: rows[0].total });
  } catch (err) {
    console.error("Error fetching total donations:", err);
    res.status(500).json({ success: false, message: "Error fetching total donations" });
  }
});

export default router;