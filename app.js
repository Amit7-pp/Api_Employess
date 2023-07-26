import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectLoginRegisterDB, connectRegisterDB } from './config/connectdb.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Cors Policy
app.use(cors());

// Database Connection
connectLoginRegisterDB(DATABASE_URL);
connectRegisterDB(DATABASE_URL);

app.use(express.json());

// Load Routes
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server listening at the port ${port}`);
});
