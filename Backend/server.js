//import express to create a server
import express from "express";
//import cors to enable comunication Backend-Frontend
import cors from "cors";
import donationsRoutes from "./routes/donations.js";
import payments from './routes/payments.js';
import db from './config/db.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/api/donations", donationsRoutes);
//server



app.use(cors());
app.use(express.json());




app.use('/api/openPayments', payments); 

app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});