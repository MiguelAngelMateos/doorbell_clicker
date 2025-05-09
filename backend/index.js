import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import leaderboardRoutes from "./routes/leaderboard.js";
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb'

// Cargar las variables de entorno
dotenv.config();

// CONECTARSE A MONGO ATLAS
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

// CONECTARSE A MONGO LOCAL
//mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/doorbellclicker');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is up' });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaderboards", leaderboardRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
