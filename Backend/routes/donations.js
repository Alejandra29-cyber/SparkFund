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
router.get("/summary", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT w.wallet_address, COALESCE(SUM(t.amount), 0) AS total
      FROM wallets w
      LEFT JOIN transactions t ON t.wallet_id = w.id
      GROUP BY w.id
    `);
const totalGlobal = rows.reduce((acc, curr) => acc + Number(curr.total), 0);
let topWallet = null;
    if (rows.length > 0) {
      topWallet = rows.reduce((max, curr) => curr.total > max.total ? curr : max, rows[0]);
    }

    res.json({
        summary: rows,
        totalGlobal,
        topWallet
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching donation summary" });
  }
});

export default router;