import express from 'express';
import { handlePayment } from '../controllers/OpenPaymentsController.js';

const router = express.Router();

router.post('/pay', handlePayment);

export default router;