import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import leaderboardRoutes from "./routes/leaderboard.js";
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("🟢 Conexión a MongoDB exitosa");
  startServer(); // Solo arrancar servidor si hay conexión
})
.catch((err) => {
  console.error("🔴 Error al conectar a MongoDB:", err.message);
  process.exit(1); // Terminar proceso si no hay DB
});

function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const PORT = process.env.PORT || 3000;

  app.get("/", (_, res) => res.send("API funcionando"));

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/leaderboards", leaderboardRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
  });
}
