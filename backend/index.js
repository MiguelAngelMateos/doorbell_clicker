import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/doorbellclicker');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is up' });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
