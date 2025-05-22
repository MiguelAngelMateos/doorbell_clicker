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
console.log("MONGO_URL cargado desde .env:", process.env.MONGO_URL);
const mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017/doorbellclicker';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(`🟢 Conectado a MongoDB en: ${mongoURI}`);
  startServer();
})
.catch((err) => {
  console.error("🔴 Error al conectar a MongoDB:", err.message);
  process.exit(1);
});

function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // si estás usando cookies o auth headers
  }));

  const PORT = process.env.PORT || 3000;

  app.get("/", (_, res) => res.send("API funcionando"));

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/leaderboards", leaderboardRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
  });
}
