//import express to create a server
import express from "express";
//import cors to enable comunication Backend-Frontend
import cors from "cors";

//
import dotenv from "dotenv";

//server
const app = express();


app.use(cors());
app.use(express.json());


dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});