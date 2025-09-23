import express from 'express';
import { handlePayment, continuePayment} from '../controllers/OpenPaymentsController.js';

const router = express.Router();

router.post('/pay', handlePayment);
router.post('/continue-payment', continuePayment )

export default router;